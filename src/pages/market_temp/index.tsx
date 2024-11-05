import { useEffect, useState, useCallback, useRef, useLayoutEffect } from "react";
import { AxiosError } from "axios";
import { IProducts } from "../../interfaces/product";
import { useNavigate } from "react-router-dom";
import {
    MarketContainer,
    ProductGrid,
    ProductCard,
    ProductImageContainer,
    ProductImage,
    ProductDetails,
    ProductCompany,
    ProductName,
    ProductPrice,
    OriginalPrice,
    DiscountRate,
    DiscountedPrice,
    SoldoutBox,
} from "../../components/Product_temp/ProductContainer";
import ChannelTalk from "../../components/Home/channelTalk";
import { ProductQueryParams, productAPI } from "../../api/resourses/products";
// import HiddenImage from "../../components/Home/randomPoint";

export default function Market() {
    console.log("Market 컴포넌트 렌더링됨");

    const [products, setProducts] = useState<IProducts[]>([]);
    const [error, setError] = useState<AxiosError | null>(null);
    const [cursor, setCursor] = useState<string | null>(null);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false); // 데이터 로드 상태 추가
    const navigate = useNavigate();

    // MarketContainer에 대한 참조 생성
    const containerRef = useRef<HTMLDivElement | null>(null);

    // 페이지가 처음 로드되거나 뒤로 갔을 때 저장된 스크롤 위치를 복원
    useLayoutEffect(() => {
        console.log("useLayoutEffect 실행");

        if (!containerRef.current) {
            console.log("containerRef.current가 없습니다.");
            return;
        }

        const savedScrollPosition = sessionStorage.getItem("scrollPosition");
        console.log("저장된 스크롤 위치 (sessionStorage):", savedScrollPosition);

        if (savedScrollPosition) {
            const scrollPosition = parseFloat(savedScrollPosition);
            console.log("복원할 스크롤 위치 (숫자 변환):", scrollPosition);

            // 스크롤 위치 설정
            requestAnimationFrame(() => {
                containerRef.current!.scrollTop = scrollPosition;
                console.log("스크롤 위치 설정 완료");
            });
        } else {
            console.log("저장된 스크롤 위치가 없습니다.");
        }
    }, []);

    // API 요청 함수
    const fetchProducts = (cursor: string | undefined = undefined) => {
        if (isFetching || !hasMore) return; // 중복 요청 방지 및 데이터 끝 체크
        setIsFetching(true); // 데이터 요청 상태 설정

        const params: ProductQueryParams = {};
        if (cursor) {
            params.cursor = decodeURIComponent(cursor);
        }

        productAPI
            .getProducts(params)
            .then(response => {
                const { results, next } = response.data;
                console.log("API 응답 - results:", results);

                setProducts(prevProducts => [...prevProducts, ...results]);
                setIsDataLoaded(true); // 데이터 로드 완료 설정

                const nextCursor = next ? new URL(next).searchParams.get("cursor") : null;
                setCursor(nextCursor);
                console.log("다음 cursor 설정:", nextCursor);

                setHasMore(Boolean(next));
                setIsFetching(false);
            })
            .catch((error: AxiosError) => {
                setError(error);
                setIsFetching(false);
                console.error("API 요청 실패:", error);
            });
    };

    // 데이터가 로드된 후 스크롤 위치 복원
    useEffect(() => {
        if (isDataLoaded && containerRef.current) {
            const savedScrollPosition = sessionStorage.getItem("scrollPosition");
            if (savedScrollPosition) {
                const scrollPosition = parseFloat(savedScrollPosition);
                containerRef.current.scrollTop = scrollPosition;
                console.log("데이터 로드 후 스크롤 위치 복원 완료:", scrollPosition);
            }
        }
    }, [isDataLoaded]);

    // 스크롤 이벤트 처리 함수
    const handleScroll = useCallback(() => {
        if (isFetching || !hasMore || !containerRef.current) return;

        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        console.log("현재 스크롤 위치:", scrollTop);

        if (scrollTop + clientHeight >= scrollHeight - 10) {
            console.log("스크롤이 하단에 도달했습니다.");
            if (cursor) {
                fetchProducts(cursor);
            }
        }
    }, [isFetching, hasMore, cursor]);

    useEffect(() => {
        const container = containerRef.current;
        console.log("useEffect 실행 - container 존재 여부:", !!container);

        if (container) {
            container.addEventListener("scroll", handleScroll);
            console.log("스크롤 이벤트 추가 완료");

            return () => {
                container.removeEventListener("scroll", handleScroll);
                console.log("스크롤 이벤트 제거 완료");
            };
        }
    }, [handleScroll]);

    useEffect(() => {
        if (!isFetching && products.length === 0) {
            console.log("초기 API 요청 시작");
            fetchProducts();
        }
    }, [isFetching, products.length]);

    // 클릭 이벤트에서 스크롤 위치 저장
    const handleClick = (productId: string) => {
        if (containerRef.current) {
            const currentScrollPosition = containerRef.current.scrollTop;
            console.log("현재 스크롤 위치 저장:", currentScrollPosition);
            sessionStorage.setItem("scrollPosition", currentScrollPosition.toString());
        }
        navigate(`/market/${productId}`);
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <MarketContainer ref={containerRef} style={{ height: "80vh", overflowY: "auto" }}>
            <ChannelTalk />
            {/* <HiddenImage /> */}
            <ProductGrid>
                {products.map(product => (
                    <ProductCard key={product.product_id} onClick={() => handleClick(product.product_id.toString())}>
                        <ProductImageContainer>
                            <ProductImage src={product.thumbnail_url} alt={product.name} />
                            {product.remain_count === 0 && (
                                <SoldoutBox width="100%" height="100%">
                                    SOLD OUT
                                </SoldoutBox>
                            )}
                        </ProductImageContainer>
                        <ProductDetails>
                            <ProductCompany>{product.company}</ProductCompany>
                            <ProductName>{product.name}</ProductName>
                            <ProductPrice>
                                {product.discount_rate !== "0.00" ? (
                                    <>
                                        <OriginalPrice>{Math.round(product.price).toLocaleString()}원</OriginalPrice>
                                        <br />
                                        <DiscountRate>{Math.round(Number(product.discount_rate))}%</DiscountRate>
                                        <DiscountedPrice>
                                            {Math.round(product.discounted_price).toLocaleString()}원
                                        </DiscountedPrice>
                                    </>
                                ) : (
                                    <DiscountedPrice>{Math.round(product.price).toLocaleString()}원</DiscountedPrice>
                                )}
                            </ProductPrice>
                        </ProductDetails>
                    </ProductCard>
                ))}
            </ProductGrid>
            {isFetching && <div>Loading more products...</div>}
            {!hasMore && <div>모든 상품이 로드되었습니다.</div>}
        </MarketContainer>
    );
}
