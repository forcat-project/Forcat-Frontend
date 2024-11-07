import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { Block, Button, Img, Text } from "../../styles/ui";
import { IProduct } from "../../interfaces/product";
import styled from "styled-components";
import ForcatModal from "../../components/Modal/ForcatModal";
import { Minus, Plus } from "../../assets/svg";
import { useUserId } from "../../hooks/useUserId";
import ConfirmChoiceModal from "../../components/Modal/ConfirmChoiceModal";
import { productAPI } from "../../api/resourses/products";
import { cartProductAPI } from "../../api/resourses/cartProducts";

export default function MarketDetail() {
    const { productId } = useParams();
    const [isCartModalOpen, setIsCartModalOpen] = useState(false);
    const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
    const [isChoiceModalOpen, setIsChoiceModalOpen] = useState(false);
    const [productDetail, setProductDetail] = useState<IProduct | null>(null);
    const [error, setError] = useState<AxiosError | null>(null);
    const [cartCount, setCartCount] = useState(1);
    const [buyCount, setBuyCount] = useState(1);

    const userId = useUserId();
    const navigate = useNavigate();
    const isSoldOut = productDetail?.remain_count === 0;

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const response = await productAPI.getProduct(productId as string);
                setProductDetail(response.data);
                console.log("받은 데이터:", response.data);
            } catch (error: any) {
                setError(error);
                console.error("통신 실패:", error.message);
            }
        };

        fetchProductDetail();
    }, [productId]);

    const handleCartModalOpen = () => {
        if (!isSoldOut) {
            setCartCount(1);
            setIsCartModalOpen(true);
        }
    };

    const handleBuyModalOpen = () => {
        if (!isSoldOut) {
            setBuyCount(1);
            setIsBuyModalOpen(true);
        }
    };

    const handleCartConfirmButtonClick = async () => {
        if (userId !== null) {
            try {
 
              const productData = {
                product_id: Number(productId),
                quantity: cartCount,
              };
                await cartProductAPI.addCartProduct(
                userId,
                productData
              );
              setIsCartModalOpen(false);
              setIsChoiceModalOpen(true);
 
            } catch (error) {
                alert("장바구니에 담기지 않았어요, 다시 시도해 주세요.");
            }
        } else {
            alert("로그인이 필요합니다.");
            navigate("/login");
        }
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const handleMinusCartClick = () => {
        if (productDetail?.remain_count > 1 && cartCount > 1) {
            setCartCount(prev => prev - 1);
        }
    };

    const handlePlusCartClick = () => {
        if (productDetail?.remain_count >= cartCount) {
            setCartCount(prev => prev + 1);
        } else {
            alert("재고 수량이 부족합니다.");
        }
    };

    const handleBuyConfirmButtonClick = () => {
        if (userId !== null) {
            setIsBuyModalOpen(false);
            navigate("/buy", {
                state: {
                    products :[
                        {
                            product: productDetail,
                            count: buyCount,
                        }
                    ]}
                ,
            });
        } else{
            alert("로그인이 필요합니다.");
            navigate("/login");
        }
    };

    const handlePlusBuyClick = () => {
        if (productDetail?.remain_count >= buyCount) {
            setBuyCount(prev => prev + 1);
        } else {
            alert("재고 수량이 부족합니다.");
        }
    };

    const handleMinusBuyClick = () => {
        if (buyCount > 1) {
            setBuyCount(prev => prev - 1);
        }
    };

    const handleContinueShopping = () => {
        setIsCartModalOpen(false);
        setIsChoiceModalOpen(false);
    };

    const handleGoToCart = () => {
        navigate("/cart");
    };

    return (
        <>
            <ForcatModal isOpen={isCartModalOpen} setIsOpen={setIsCartModalOpen} width="100%" height="300px" title="">
                <Block.FlexBox
                    width="100%"
                    height="240px"
                    direction="column"
                    justifyContent="space-between"
                    padding="20px 20px 0 20px"
                >
                    <Block.FlexBox
                        width="100%"
                        height="95px"
                        borderRadius="16px"
                        bgColor="#F8F8F8"
                        justifyContent="space-between"
                        alignItems="center"
                        padding="20px"
                    >
                        <Block.FlexBox width="70%" height="100%" direction="column" justifyContent="space-between">
                            <Text.Menu>{productDetail?.name}</Text.Menu>
                            <Text.Menu color="Gray">
                                {Number(productDetail?.discount_rate) > 0 ? (
                                    <>{Math.floor(Number(productDetail?.discounted_price)).toLocaleString()} 원</>
                                ) : (
                                    <> {productDetail && Math.floor(productDetail?.price).toLocaleString()} 원</>
                                )}
                            </Text.Menu>
                        </Block.FlexBox>

                        <Block.FlexBox width="100px" justifyContent="space-between" alignItems="center">
                            <Minus
                                width={28}
                                height={28}
                                cursor="pointer"
                                fill="#e8e8e8"
                                onClick={handleMinusCartClick}
                            />
                            <Text.TitleMenu300>{cartCount}</Text.TitleMenu300>
                            <Plus
                                width={28}
                                height={28}
                                cursor="pointer"
                                fill="#e8e8e8"
                                onClick={handlePlusCartClick}
                            />
                        </Block.FlexBox>
                    </Block.FlexBox>

                    <Block.FlexBox justifyContent="space-between" padding="0 20px">
                        <Text.TitleMenu200>총 상품 금액</Text.TitleMenu200>

                        <Text.Discount color="Black">
                            {Number(productDetail?.discount_rate) > 0 ? (
                                <>
                                    {(Math.floor(Number(productDetail?.discounted_price)) * cartCount).toLocaleString()}{" "}
                                    원
                                </>
                            ) : (
                                <>
                                    {" "}
                                    {productDetail && (Math.floor(productDetail?.price) * cartCount).toLocaleString()}원
                                </>
                            )}
                        </Text.Discount>
                    </Block.FlexBox>

                    <Button.CartConfirm cursor="pointer" onClick={handleCartConfirmButtonClick}>
                        <Text.TitleMenu200 color="Yellow">장바구니에 담기</Text.TitleMenu200>
                    </Button.CartConfirm>
                </Block.FlexBox>
            </ForcatModal>
            <ForcatModal isOpen={isBuyModalOpen} setIsOpen={setIsBuyModalOpen} width="100%" height="300px" title="">
                <Block.FlexBox
                    width="100%"
                    height="240px"
                    direction="column"
                    justifyContent="space-between"
                    padding="20px 20px 0 20px"
                >
                    <Block.FlexBox
                        width="100%"
                        height="95px"
                        borderRadius="16px"
                        bgColor="#F8F8F8"
                        justifyContent="space-between"
                        alignItems="center"
                        padding="20px"
                    >
                        <Block.FlexBox width="70%" height="100%" direction="column" justifyContent="space-between">
                            <Text.Menu>{productDetail?.name}</Text.Menu>
                            <Text.Menu color="Gray">
                                {Number(productDetail?.discount_rate) > 0 ? (
                                    <>{Math.floor(Number(productDetail?.discounted_price)).toLocaleString()} 원</>
                                ) : (
                                    <> {productDetail && Math.floor(productDetail?.price).toLocaleString()} 원</>
                                )}
                            </Text.Menu>
                        </Block.FlexBox>

                        <Block.FlexBox width="100px" justifyContent="space-between" alignItems="center">
                            <Minus
                                width={28}
                                height={28}
                                cursor="pointer"
                                fill="#e8e8e8"
                                onClick={handleMinusBuyClick}
                            />
                            <Text.TitleMenu300>{buyCount}</Text.TitleMenu300>
                            <Plus width={28} height={28} cursor="pointer" fill="#e8e8e8" onClick={handlePlusBuyClick} />
                        </Block.FlexBox>
                    </Block.FlexBox>

                    <Block.FlexBox justifyContent="space-between" padding="0 20px">
                        <Text.TitleMenu200>총 상품 금액</Text.TitleMenu200>

                        <Text.Discount color="Black">
                            {Number(productDetail?.discount_rate) > 0 ? (
                                <>
                                    {(Math.floor(Number(productDetail?.discounted_price)) * buyCount).toLocaleString()}{" "}
                                    원
                                </>
                            ) : (
                                <>
                                    {" "}
                                    {productDetail && (Math.floor(productDetail?.price) * buyCount).toLocaleString()}원
                                </>
                            )}
                        </Text.Discount>
                    </Block.FlexBox>

                    <Button.Confirm cursor="pointer" onClick={handleBuyConfirmButtonClick} isDisabled={false}>
                        <Text.TitleMenu200 color="White">결제하기</Text.TitleMenu200>
                    </Button.Confirm>
                </Block.FlexBox>
            </ForcatModal>
            <Block.FlexBox
                padding="70px 0"
                margin="180px 0"
                direction="column"
                style={{
                    overflowY: "scroll",
                    scrollbarWidth: "none",
                    height: "100vh",
                }}
            >
                {productDetail ? (
                    <Block.FlexBox direction="column" alignItems="center" padding="30px 21px" gap="20px">
                        <ProductImageContainer>
                            <Img.AngledIcon width="100%" src={productDetail.thumbnail_url} alt={productDetail.name} />
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

                <Block.AbsoluteBox
                    width="100%"
                    height="93px"
                    padding="0 20px"
                    bottom="0"
                    bgColor="white"
                    zIndex="12"
                    style={{
                        boxShadow: "rgba(0, 0, 0, 0.15) 0px 0px 50px 0px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Block.FlexBox width="100%" height="93px" justifyContent="center" alignItems="center" gap="12px">
                        <Button.CartButton onClick={handleCartModalOpen} isSoldOut={isSoldOut}>
                            장바구니
                        </Button.CartButton>
                        <Button.BuyButton onClick={handleBuyModalOpen} isSoldOut={isSoldOut}>
                            구매하기
                        </Button.BuyButton>
                    </Block.FlexBox>
                </Block.AbsoluteBox>
            </Block.FlexBox>

            {isChoiceModalOpen && (
                <ConfirmChoiceModal
                    isOpen={isChoiceModalOpen}
                    setIsOpen={setIsChoiceModalOpen}
                    width="450px"
                    height="220px"
                    title="상품이 장바구니에 담겼습니다"
                    bodyText="장바구니로 이동하시겠습니까?"
                    onPrimaryAction={handleGoToCart}
                    onSecondaryAction={handleContinueShopping}
                    primaryButtonText="장바구니로 이동"
                    secondaryButtonText="계속 구경하기"
                />
            )}
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
