import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import styled from "styled-components";
import { Block, Text } from "../../style/ui";
import { IProducts } from "../../interfaces/product";

interface CategoryBlockProps {
    categoryId: number | null;
    categoryName: string;
    morePagePath: string;
    ordering?: string; // ordering 옵션을 추가
}

export default function CategoryBox({ categoryId, categoryName, morePagePath, ordering }: CategoryBlockProps) {
    const [products, setProducts] = useState<IProducts[]>([]);
    const [error, setError] = useState<AxiosError | null>(null);
    const navigate = useNavigate();

    // 카테고리 상품 상위 3개 불러오기
    useEffect(() => {
        const params: any = {
            categories: categoryId,
            limit: 3, // 상위 3개만 가져오기
        };

        // 베스트셀러 상품일 때 ordering 옵션 추가
        if (ordering) {
            params.ordering = ordering;
        }

        axios
            .get("http://125.189.109.17/api/products", { params })
            .then(response => {
                setProducts(response.data.results.slice(0, 3)); // 상위 3개만 표시
            })
            .catch((error: AxiosError) => {
                setError(error); // 오류가 발생하면 상태에 오류를 설정
            });
    }, [categoryId, ordering]);

    // 오류가 발생하면 오류 메시지를 표시
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <Block.FlexBox direction="column" width="100%" padding="0 15px">
            <Block.FlexBox justifyContent="space-between" alignItems="center">
                <Text.TitleMenu200>{categoryName}</Text.TitleMenu200>
                <MoreButton onClick={() => navigate(morePagePath)}>더보기</MoreButton>
            </Block.FlexBox>
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
        </Block.FlexBox>
    );
}

// 스타일 컴포넌트 정의
const ProductGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-top: 20px;
`;

const ProductCard = styled.div`
    text-align: center;
    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s;
    &:hover {
        transform: scale(1.05); /* hover 시 약간 확대 */
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* hover 시 그림자 */
    }
`;

const ProductImageContainer = styled.div`
    position: relative;
    width: 100%;
    height: auto;
`;

const ProductImage = styled.img`
    width: 100%;
    height: auto;
    border-radius: 8px;
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

const MoreButton = styled.button`
    background-color: transparent;
    border: none;
    color: #939292;
    cursor: pointer;
    font-size: 14px;
`;
