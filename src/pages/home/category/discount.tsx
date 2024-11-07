import { useEffect, useState, useCallback } from "react";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { IProducts } from "../../../interfaces/product";
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
    LoadingMessage,
} from "../../../components/Product/ProductContainer"; // 공통 Styled Components 가져오기
import { ProductQueryParams, productAPI } from "../../../api/resourses/products";
import { Block } from "../../../styles/ui";

export default function Discount() {
    const [products, setProducts] = useState<IProducts[]>([]);
    const [error, setError] = useState<AxiosError | null>(null);
    const [cursor, setCursor] = useState<string | null>(null); // cursor 상태 관리
    const [isFetching, setIsFetching] = useState<boolean>(false); // 데이터 요청 상태
    const [hasMore, setHasMore] = useState<boolean>(true); // 더 많은 데이터 여부 확인
    const navigate = useNavigate();

    // 스크롤 이벤트 처리 함수
    const handleScroll = useCallback(() => {
        if (isFetching || !hasMore) return;
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 5) {
            // 페이지 하단에 도달하면 추가 데이터를 요청
            setIsFetching(true);
        }
    }, [isFetching, hasMore]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    // 제품 목록 불러오는 API 호출
    const fetchProducts = (cursor: string | null = null) => {
        if (isFetching || !hasMore) return;

        setIsFetching(true); // 데이터 요청 상태 설정

        const params: ProductQueryParams = {
            ordering: "-discount_rate", // 구매 횟수 기준으로 정렬
        };
        if (cursor) {
            params.cursor = decodeURIComponent(cursor);
        }
        productAPI
            .getProducts(params)
            .then(response => {
                const { results, next } = response.data;
                setProducts(prevProducts => [...prevProducts, ...results]); // 기존 제품에 새로운 제품 추가
                const nextCursor = next
                    ? new URL(next).search
                          .slice(1)
                          .split("&")
                          .find(param => param.startsWith("cursor="))
                    : null;
                const originalCursor = nextCursor ? nextCursor.split("=")[1] : null;
                setCursor(originalCursor); // 다음 API 요청을 위한 cursor 저장
                setHasMore(Boolean(next)); // 더 이상 데이터가 없으면 false로 설정
                setIsFetching(false); // 데이터 요청 완료
            })
            .catch((error: AxiosError) => {
                setError(error);
                setIsFetching(false);
            });
    };

    // 첫 로딩 시 제품 목록 호출
    useEffect(() => {
        fetchProducts(); // 첫 데이터 호출
    }, []);

    // cursor 값이 변경될 때마다 추가 데이터 요청
    useEffect(() => {
        if (cursor && !isFetching) {
            fetchProducts(cursor); // 저장된 cursor 값으로 추가 API 호출
        }
    }, [cursor]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <Block.FlexBox padding="120px 0 0 0">
        <MarketContainer>
            <ProductGrid>
                {products.map(product => (
                    <ProductCard
                        key={product.product_id}
                        onClick={() => navigate(`/market/${product.product_id}`)} // 상품 클릭 시 상세 페이지로 이동
                    >
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
                                        <DiscountRate>
                                            {Math.round(Number(product.discount_rate)).toLocaleString()}%
                                        </DiscountRate>
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
            {isFetching && <LoadingMessage>Loading more products...</LoadingMessage>}
        </MarketContainer>
        </Block.FlexBox>
    );
}
