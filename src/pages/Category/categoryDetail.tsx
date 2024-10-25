import { useEffect, useState, useCallback } from "react";
import axios, { AxiosError } from "axios";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { IProducts } from "../../interfaces/product";

export default function CategoryDetail() {
    const { category_id } = useParams<{ category_id: string }>();

    const navigate = useNavigate();

    const [products, setProducts] = useState<IProducts[]>([]);
    const [cursor, setCursor] = useState<string | null>(null);
    const [error, setError] = useState<AxiosError | null>(null);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const handleScroll = useCallback(() => {
        if (isFetching || !hasMore) return;
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 5) {
            setIsFetching(true);
        }
    }, [isFetching, hasMore]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    const fetchProducts = (cursor: string | null = null) => {
        if (isFetching || !hasMore) return;
        setIsFetching(true);
        axios
            .get("http://125.189.109.17/api/products", {
                params: {
                    categories: category_id,
                    cursor: cursor ? decodeURIComponent(cursor) : null,
                },
            })
            .then(response => {
                const { results, next } = response.data;
                setProducts(prevProducts => [...prevProducts, ...results]);
                const nextCursor = next
                    ? new URL(next).search
                          .slice(1)
                          .split("&")
                          .find(param => param.startsWith("cursor="))
                    : null;
                const originalCursor = nextCursor ? nextCursor.split("=")[1] : null;
                setCursor(originalCursor);
                setHasMore(Boolean(next));
                setIsFetching(false);
            })
            .catch((error: AxiosError) => {
                setError(error);
                setIsFetching(false);
            });
    };

    useEffect(() => {
        if (category_id) {
            fetchProducts();
        }
    }, [category_id]);

    useEffect(() => {
        if (cursor && !isFetching) {
            fetchProducts(cursor);
        }
    }, [cursor]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <Container>
            {products.length > 0 ? (
                <ProductGrid>
                    {products.map(product => (
                        <ProductCard key={product.product_id} onClick={() => navigate(`/market/${product.product_id}`)}>
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
                                                {Math.round(product.price).toLocaleString()}원{" "}
                                            </OriginalPrice>
                                            <br />
                                            <DiscountRate>
                                                {Math.round(Number(product.discount_rate)).toLocaleString()}%
                                            </DiscountRate>
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
            ) : (
                <NoProductsMessage>해당 카테고리에 등록된 상품이 없습니다.</NoProductsMessage>
            )}
            {isFetching && <div>Loading more products...</div>}
        </Container>
    );
}

// Styled components
const Container = styled.div`
    flex: 1;
    margin-top: 103px;
    margin-bottom: 93px;
    overflow-y: scroll;
    padding: 20px;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const ProductGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
`;

const ProductCard = styled.div`
    cursor: pointer;
    padding: 10px;
    border-radius: 10px;
    overflow: hidden; /* 이미지 확대 시 카드 밖으로 넘치지 않도록 설정 */
    transition: box-shadow 0.3s, transform 0.3s; /* 부드러운 전환 효과 추가 */
    &:hover {
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* hover 시 그림자 강화 */
        transform: scale(1.05); /* hover 시 카드 확대 */
    }
`;

const ProductImageContainer = styled.div`
    position: relative;
    width: 100%;
    height: auto;
    overflow: hidden; /* 이미지가 확대될 때 잘림 방지 */
`;

const ProductImage = styled.img`
    width: 100%;
    height: auto;
    border-radius: 10px;
    transition: transform 0.3s; /* 부드러운 전환 효과 추가 */
    ${ProductCard}:hover & {
        transform: scale(1.1); /* hover 시 이미지 확대 */
    }
`;

const ProductDetails = styled.div`
    text-align: left;
    margin-top: 10px;
`;

const ProductCompany = styled.div`
    color: #999;
    font-size: 12px;
    margin-top: 5px;
    font-weight: bold;
`;

const ProductName = styled.div`
    margin: 10px 0;
    font-size: 12px;
`;

const ProductPrice = styled.div`
    font-size: 14px;
    color: #333;
`;

const OriginalPrice = styled.span`
    text-decoration: line-through;
    color: #999;
    margin-right: 10px;
`;

const DiscountRate = styled.span`
    color: #fa7586;
    margin-right: 10px;
    font-weight: bold;
`;

const DiscountedPrice = styled.span`
    color: #333;
    font-weight: bold;
`;

const SoldoutBox = styled.div<{ width?: string; height?: string }>`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    font-size: 18px;
    font-weight: bold;
    width: ${props => props.width || "100%"};
    height: ${props => props.height || "100%"};
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
`;

const NoProductsMessage = styled.div`
    color: #999;
    text-align: center;
    font-size: 16px;
    margin-top: 20px;
`;
