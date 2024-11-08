import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import styled from "styled-components";
import { Block, Text } from "../../styles/ui";
import { IProducts } from "../../interfaces/product";
import { ProductQueryParams, productAPI } from "../../api/resourses/products";
import {
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
} from "../Product/ProductContainer";

type CategoryBlockProps = {
    categoryId: number | null;
    categoryName: string;
    morePagePath: string;
    ordering?: string;
};

export default function CategoryBox({ categoryId, categoryName, morePagePath, ordering }: CategoryBlockProps) {
    const [products, setProducts] = useState<IProducts[]>([]);
    const [error, setError] = useState<AxiosError | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const params: ProductQueryParams = {
            ordering: ordering,
        };

        if (categoryId) {
            params.categories = categoryId;
        }

        productAPI
            .getProducts(params)
            .then(response => {
                setProducts(response.data.results.slice(0, 3));
            })
            .catch((error: AxiosError) => {
                setError(error);
            });
    }, [categoryId, ordering]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <Block.FlexBox direction="column" width="100%" height="360px">
            <Block.FlexBox justifyContent="space-between" alignItems="center" padding="20px">
                <Text.TitleMenu300>{categoryName}</Text.TitleMenu300>
                <MoreButton onClick={() => navigate(morePagePath)}>더보기</MoreButton>
            </Block.FlexBox>
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
        </Block.FlexBox>
    );
}

const MoreButton = styled.button`
    background-color: transparent;
    border: none;
    color: #939292;
    cursor: pointer;
    font-size: 12px;
`;
