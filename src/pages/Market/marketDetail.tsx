import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { Block, Button, Img, Text } from "../../style/ui";
import { IProduct } from "../../interfaces/product";
import styled from "styled-components";

import { BASE_URL } from "../../api/constants";
import ForcatModal from "../../components/Modal/ForcatModal";
import { Minus, Plus } from "../../assets/svg";

export default function MarketDetail() {
    const { productId } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productDetail, setProductDetail] = useState<IProduct | null>(null);
    const [error, setError] = useState<AxiosError | null>(null);

    const navigate = useNavigate();

    const isSoldOut = productDetail?.remain_count === 0;
    const handleCartButtonClick = () => {
        // if (!isSoldOut) navigate("/cart");
        console.log("장바구니에 담기");
        setIsModalOpen(true);
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
            <ForcatModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} width="599px" height="320px" title="">
                <Block.FlexBox
                    width="560px"
                    height="240px"
                    direction="column"
                    alignItems="center"
                    justifyContent="space-between"
                    margin="20px 0 0 0"
                >
                    <Block.FlexBox
                        width="100%"
                        height="80px"
                        borderRadius="16px"
                        bgColor="#F8F8F8"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Block.FlexBox
                            width="100%"
                            height="100%"
                            padding="20px"
                            direction="column"
                            justifyContent="space-between"
                        >
                            <Text.Discount>애니몬다 봄파인스텐 마일드 주식캔 습식사료 5종 100g</Text.Discount>
                            <Text.Discount>15,000원</Text.Discount>
                        </Block.FlexBox>

                        <Block.FlexBox width="180px" justifyContent="space-evenly" alignItems="center">
                            <Minus width={28} height={28} fill="#e8e8e8" />
                            <Text.TitleMenu300>1</Text.TitleMenu300>
                            <Plus width={28} height={28} fill="#e8e8e8" />
                        </Block.FlexBox>
                    </Block.FlexBox>

                    <Block.FlexBox justifyContent="space-between">
                        <Text.Discount>총 상품 금액</Text.Discount>

                        <Text.Discount>15,000원</Text.Discount>
                    </Block.FlexBox>

                    <Button.CartConfirm>
                        <Text.TitleMenu200 color="Yellow">장바구니에 담기</Text.TitleMenu200>
                    </Button.CartConfirm>
                </Block.FlexBox>
            </ForcatModal>
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
