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
} from "../../components/Product/ProductContainer";
import ChannelTalk from "../../components/Home/ChannelTalk";
import { ProductQueryParams, productAPI } from "../../api/resourses/products";
import { Block } from "../../styles/ui";
import HiddenImage from "../../components/Home/RandomPoint";

export default function Market() {
    const [products, setProducts] = useState<IProducts[]>([]);
    const [error, setError] = useState<AxiosError | null>(null);
    const [cursor, setCursor] = useState<string | null>(null);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [, setIsDataLoaded] = useState<boolean>(false);
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement | null>(null);

    const cursorListKey = "cursorList";
    const scrollPositionKey = "scrollPosition";

    // useLayoutEffect to load data based on saved cursors and scroll position
    useLayoutEffect(() => {
        console.log("useLayoutEffect 실행");
        // sessionStorage.clear();

        const savedScrollPosition = sessionStorage.getItem(scrollPositionKey);
        const savedCursors = JSON.parse(sessionStorage.getItem(cursorListKey) || "[]");

        if (savedCursors.length > 0 && savedScrollPosition && containerRef.current) {
            const loadAllData = async () => {
                setIsFetching(true); // Ensure fetching flag is set to prevent duplicate calls
                for (const savedCursor of savedCursors) {
                    await fetchProducts(savedCursor); // All cursor data loaded sequentially
                }
                setIsFetching(false);

                const scrollPosition = parseFloat(savedScrollPosition);
                if (containerRef.current) {
                    containerRef.current.scrollTop = scrollPosition;
                    console.log("스크롤 위치 복원 완료:", scrollPosition);
                }
            };
            loadAllData();
        }
    }, []);

    const handleClick = (productId: string) => {
        if (containerRef.current) {
            const currentScrollPosition = containerRef.current.scrollTop;
            sessionStorage.setItem(scrollPositionKey, currentScrollPosition.toString());
        }
        navigate(`/market/${productId}`);
    };

    const fetchProducts = async (cursor: string | undefined = undefined) => {
        if (isFetching || !hasMore) return;
        setIsFetching(true);

        const params: ProductQueryParams = {};
        if (cursor) {
            params.cursor = decodeURIComponent(cursor);
        }

        try {
            const response = await productAPI.getProducts(params);
            const { results, next } = response.data;
            setProducts(prevProducts => [...prevProducts, ...results]);
            setIsDataLoaded(true);

            const nextCursor = next ? new URL(next).searchParams.get("cursor") : null;
            if (nextCursor) {
                setCursor(nextCursor);

                const savedCursors = JSON.parse(sessionStorage.getItem(cursorListKey) || "[]");
                if (!savedCursors.includes(nextCursor)) {
                    savedCursors.push(nextCursor);
                    sessionStorage.setItem(cursorListKey, JSON.stringify(savedCursors));
                }
            }

            setHasMore(Boolean(next));
        } catch (error) {
            setError(error as AxiosError);
        } finally {
            setIsFetching(false);
        }
    };

    // Initial load if there are no products
    useEffect(() => {
        if (!isFetching && products.length === 0) {
            fetchProducts();
        }
    }, [isFetching, products.length]);

    // Throttled scroll handler to control API calls during scrolling
    const handleScroll = useCallback(() => {
        if (isFetching || !hasMore || !containerRef.current) return;

        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 10) {
            if (cursor) {
                fetchProducts(cursor);
            }
        }
    }, [isFetching, hasMore, cursor]);

    // Attach scroll event listener
    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.addEventListener("scroll", handleScroll);
            return () => {
                container.removeEventListener("scroll", handleScroll);
            };
        }
    }, [handleScroll]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <MarketContainer ref={containerRef} style={{ height: "100vh", overflowY: "auto" }}>
            <HiddenImage />
            <ChannelTalk />
            <Block.FlexBox padding="80px 0 60px 0">
                <ProductGrid>
                    {products.map((product, index) => (
                        <ProductCard
                            key={`${product.product_id}-${index}`} // Unique key
                            onClick={() => handleClick(product.product_id.toString())}
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
                                            <OriginalPrice>
                                                {Math.round(product.price).toLocaleString()}원
                                            </OriginalPrice>
                                            <br />
                                            <DiscountRate>{Math.round(Number(product.discount_rate))}%</DiscountRate>
                                            <DiscountedPrice>
                                                {Math.round(product.discounted_price).toLocaleString()}원
                                            </DiscountedPrice>
                                        </>
                                    ) : (
                                        <DiscountedPrice>
                                            {Math.round(product.price).toLocaleString()}원
                                        </DiscountedPrice>
                                    )}
                                </ProductPrice>
                            </ProductDetails>
                        </ProductCard>
                    ))}
                </ProductGrid>
            </Block.FlexBox>
            {isFetching && <div>Loading more products...</div>}
            {!hasMore && <div>모든 상품이 로드되었습니다.</div>}
        </MarketContainer>
    );
}
