import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Layout/Header";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { Block, Button, Img, Text } from "../../style/ui";
import { IProduct } from "../../interfaces/product";
import styled from "styled-components";

import { BASE_URL } from "../../api/constants";

export default function MarketDetail() {
    const { productId } = useParams();

    const [productDetail, setProductDetail] = useState<IProduct | null>(null);
    const [error, setError] = useState<AxiosError | null>(null);

    const navigate = useNavigate();

    const isSoldOut = productDetail?.remain_count === 0;
    const handleCartButtonClick = () => {
        if (!isSoldOut) navigate("/cart");
    };

    const handleBuyButtonClick = () => {
        if (!isSoldOut) {
            // 바로 상품 담고 구매하기 페이지로 연결
        }
    };

    useEffect(() => {
        axios
            .get(`${BASE_URL}/products/${productId}`)
            .then(response => {
                setProductDetail(response.data);
                console.log("받은 데이터:", response.data);
            })
            .catch((error: AxiosError) => {
                setError(error);
                console.error("통신 실패:", error.message);
            });
    }, [productId]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <Header pageType="marketDetail" />

            <Block.FlexBox margin="89px 0" direction="column" style={{ overflow: "auto", scrollbarWidth: "none" }}>
                {productDetail ? (
                    <Block.FlexBox direction="column" alignItems="center" padding="30px 21px" gap="20px">
                        <ProductImageContainer>
                            <Img.AngledIcon width="599px" src={productDetail.thumbnail_url} alt={productDetail.name} />
                            {productDetail.remain_count === 0 && (
                                <SoldoutBox width="100%" height="100%">
                                    SOLD OUT
                                </SoldoutBox>
                            )}
                        </ProductImageContainer>

                        <Block.FlexBox direction="column" gap="9px">
                            <Text.Notice200 color="Gray"> {productDetail.company}</Text.Notice200>
                            <Text.TitleMenu100>{productDetail.name}</Text.TitleMenu100>

                            <Block.FlexBox direction="column">
                                <Block.FlexBox width="100%" direction="column" gap="7px">
                                    {Number(productDetail.discount_rate) > 0 ? (
                                        <>
                                            <Text.OriginalPrice>
                                                {Math.floor(productDetail.price).toLocaleString()}원
                                            </Text.OriginalPrice>
                                            <Block.FlexBox gap="10px">
                                                <Text.Discount color="Warning">
                                                    {Math.floor(Number(productDetail.discount_rate)).toLocaleString()}%
                                                </Text.Discount>
                                                <Text.Discount color="Black">
                                                    {Math.floor(
                                                        Number(productDetail.discounted_price)
                                                    ).toLocaleString()}
                                                    원
                                                </Text.Discount>
                                            </Block.FlexBox>
                                        </>
                                    ) : (
                                        <Text.Discount color="Black">
                                            {Math.floor(productDetail.price).toLocaleString()}원
                                        </Text.Discount>
                                    )}
                                </Block.FlexBox>
                            </Block.FlexBox>
                        </Block.FlexBox>

                        <Block.FlexBox
                            direction="column"
                            gap="20px"
                            padding="43px 0"
                            style={{ borderTop: "1px solid #E8E8E8" }}
                        >
                            <Text.TitleMenu200> 상품 상세 정보 </Text.TitleMenu200>
                            <Img.AngledIcon
                                width="100%"
                                height="100%"
                                src={productDetail.description_image_url}
                                alt={productDetail.name}
                            />
                        </Block.FlexBox>
                    </Block.FlexBox>
                ) : (
                    "로딩중"
                )}

                <Block.AbsoluteBox bottom="0" left="0" zIndex="3">
                    <Block.FlexBox width="100%" height="93px" justifyContent="center" alignItems="center" gap="12px">
                        <Button.CartButton onClick={handleCartButtonClick} isSoldOut={isSoldOut}>
                            장바구니
                        </Button.CartButton>
                        <Button.BuyButton onClick={handleBuyButtonClick} isSoldOut={isSoldOut}>
                            구매하기
                        </Button.BuyButton>
                    </Block.FlexBox>
                </Block.AbsoluteBox>
            </Block.FlexBox>
        </>
    );
}

const ProductImageContainer = styled.div`
    position: relative;
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
