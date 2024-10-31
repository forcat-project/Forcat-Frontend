import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { Block, Button, Img, Text } from "../../style/ui";
import { IProduct } from "../../interfaces/product";
import styled from "styled-components";
import ForcatModal from "../../components/Modal/ForcatModal";
import { Minus, Plus } from "../../assets/svg";
import axiosInstance from "../../api/axiosInstance";
import { useUserId } from "../../hooks/useUserId";

export default function MarketDetail() {
  const { productId } = useParams();
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [productDetail, setProductDetail] = useState<IProduct | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [cartCount, setCartCount] = useState(1);
  const userId = useUserId();

  const navigate = useNavigate();

  const isSoldOut = productDetail?.remain_count === 0;
  const handleCartModalOpen = () => {
    if (!isSoldOut) {
      setIsCartModalOpen(true);
    }
  };

  const handleBuyModalOpen = () => {
    if (!isSoldOut) {
      setIsBuyModalOpen(true);
    }
  };

  const handleCartConfirmButtonClick = () => {
    if (userId !== null) {
      try {
        const res = axiosInstance.post(`/users/${userId}/cart/products`, {
          product_id: productId,
        });
        console.log(res);
        alert("성공적으로 장바구니에 담겼습니다.");
      } catch (error) {
        alert("장바구니에 담기지 않았어요, 다시 시도해 주세요.");
      }
    } else {
      alert("로그인 후 장바구니에 담을 수 있어요!");
      navigate("/login");
    }
  };

  const handleBuyConfirmButtonClick = () => {
    console.log("결제");
    setIsBuyModalOpen(false); // 모달을 닫고
    navigate("/buy"); // 페이지 이동
    // 결제 API 나오면 주소, body 전달할 값만 넘겨주면 됨!
    // if (userId !== null) {
    //     try {
    //         const res = axiosInstance.post(``, {
    //         });
    //         console.log(res);
    //         alert("결제 페이지로 이동합니다.");
    //     } catch (error) {
    //         alert("결제 페이지로 이동 실패했어요, 다시 시도해 주세요.");
    //     }
    // } else {
    //     alert("로그인 후 결제해주세요!");
    //     navigate("/login");
    // }
  };

  useEffect(() => {
    axiosInstance
      .get(`/products/${productId}`)
      .then((response) => {
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

  const handleMinusButtonClick = () => {
    if (productDetail?.remain_count > 1 && cartCount > 1) {
      setCartCount((prev) => prev - 1);
    }
  };

  const handlePlusButtonClick = () => {
    if (productDetail?.remain_count >= cartCount) {
      setCartCount((prev) => prev + 1);
    } else {
      alert("재고 수량이 부족합니다.");
    }
  };

  return (
    <>
      <ForcatModal
        isOpen={isCartModalOpen}
        setIsOpen={setIsCartModalOpen}
        width="599px"
        height="300px"
        title=""
      >
        <Block.FlexBox
          width="559px"
          height="240px"
          direction="column"
          justifyContent="space-between"
          padding="20px 0 0 0"
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
            <Block.FlexBox
              width="70%"
              height="100%"
              direction="column"
              justifyContent="space-between"
            >
              <Text.Menu>{productDetail?.name}</Text.Menu>
              <Text.Menu color="Gray">
                {Number(productDetail?.discount_rate) > 0 ? (
                  <>
                    {Math.floor(
                      Number(productDetail?.discounted_price)
                    ).toLocaleString()}{" "}
                    원
                  </>
                ) : (
                  <>
                    {" "}
                    {productDetail &&
                      Math.floor(productDetail?.price).toLocaleString()}{" "}
                    원
                  </>
                )}
              </Text.Menu>
            </Block.FlexBox>

            <Block.FlexBox
              width="100px"
              justifyContent="space-between"
              alignItems="center"
            >
              <Minus
                width={28}
                height={28}
                cursor="pointer"
                fill="#e8e8e8"
                onClick={handleMinusButtonClick}
              />
              <Text.TitleMenu300>{cartCount}</Text.TitleMenu300>
              <Plus
                width={28}
                height={28}
                cursor="pointer"
                fill="#e8e8e8"
                onClick={handlePlusButtonClick}
              />
            </Block.FlexBox>
          </Block.FlexBox>

          <Block.FlexBox justifyContent="space-between" padding="0 20px">
            <Text.TitleMenu200>총 상품 금액</Text.TitleMenu200>

            <Text.Discount color="Black">
              {Number(productDetail?.discount_rate) > 0 ? (
                <>
                  {(
                    Math.floor(Number(productDetail?.discounted_price)) *
                    cartCount
                  ).toLocaleString()}{" "}
                  원
                </>
              ) : (
                <>
                  {" "}
                  {productDetail &&
                    (
                      Math.floor(productDetail?.price) * cartCount
                    ).toLocaleString()}
                  원
                </>
              )}
            </Text.Discount>
          </Block.FlexBox>

          <Button.CartConfirm
            cursor="pointer"
            onClick={handleCartConfirmButtonClick}
          >
            <Text.TitleMenu200 color="Yellow">
              장바구니에 담기
            </Text.TitleMenu200>
          </Button.CartConfirm>
        </Block.FlexBox>
      </ForcatModal>
      <ForcatModal
        isOpen={isBuyModalOpen}
        setIsOpen={setIsBuyModalOpen}
        width="599px"
        height="300px"
        title=""
      >
        <Block.FlexBox
          width="559px"
          height="240px"
          direction="column"
          justifyContent="space-between"
          padding="20px 0 0 0"
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
            <Block.FlexBox
              width="70%"
              height="100%"
              direction="column"
              justifyContent="space-between"
            >
              <Text.Menu>{productDetail?.name}</Text.Menu>
              <Text.Menu color="Gray">
                {Number(productDetail?.discount_rate) > 0 ? (
                  <>
                    {Math.floor(
                      Number(productDetail?.discounted_price)
                    ).toLocaleString()}{" "}
                    원
                  </>
                ) : (
                  <>
                    {" "}
                    {productDetail &&
                      Math.floor(productDetail?.price).toLocaleString()}{" "}
                    원
                  </>
                )}
              </Text.Menu>
            </Block.FlexBox>

            <Block.FlexBox
              width="100px"
              justifyContent="space-between"
              alignItems="center"
            >
              <Minus
                width={28}
                height={28}
                cursor="pointer"
                fill="#e8e8e8"
                onClick={handleMinusButtonClick}
              />
              <Text.TitleMenu300>{cartCount}</Text.TitleMenu300>
              <Plus
                width={28}
                height={28}
                cursor="pointer"
                fill="#e8e8e8"
                onClick={handlePlusButtonClick}
              />
            </Block.FlexBox>
          </Block.FlexBox>

          <Block.FlexBox justifyContent="space-between" padding="0 20px">
            <Text.TitleMenu200>총 상품 금액</Text.TitleMenu200>

            <Text.Discount color="Black">
              {Number(productDetail?.discount_rate) > 0 ? (
                <>
                  {(
                    Math.floor(Number(productDetail?.discounted_price)) *
                    cartCount
                  ).toLocaleString()}{" "}
                  원
                </>
              ) : (
                <>
                  {" "}
                  {productDetail &&
                    (
                      Math.floor(productDetail?.price) * cartCount
                    ).toLocaleString()}
                  원
                </>
              )}
            </Text.Discount>
          </Block.FlexBox>

          <Button.Confirm
            cursor="pointer"
            onClick={handleBuyConfirmButtonClick}
            isDisabled={false}
          >
            <Text.TitleMenu200 color="White">결제하기</Text.TitleMenu200>
          </Button.Confirm>
        </Block.FlexBox>
      </ForcatModal>
      <Block.FlexBox
        margin="89px 0"
        direction="column"
        style={{ overflow: "auto", scrollbarWidth: "none" }}
      >
        {productDetail ? (
          <Block.FlexBox
            direction="column"
            alignItems="center"
            padding="30px 21px"
            gap="20px"
          >
            <ProductImageContainer>
              <Img.AngledIcon
                width="599px"
                src={productDetail.thumbnail_url}
                alt={productDetail.name}
              />
              {productDetail.remain_count === 0 && (
                <SoldoutBox width="100%" height="100%">
                  SOLD OUT
                </SoldoutBox>
              )}
            </ProductImageContainer>

            <Block.FlexBox direction="column" gap="9px">
              <Text.Notice200 color="Gray">
                {" "}
                {productDetail.company}
              </Text.Notice200>
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
                          {Math.floor(
                            Number(productDetail.discount_rate)
                          ).toLocaleString()}
                          %
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
          <Block.FlexBox
            width="100%"
            height="93px"
            justifyContent="center"
            alignItems="center"
            gap="12px"
          >
            <Button.CartButton
              onClick={handleCartModalOpen}
              isSoldOut={isSoldOut}
            >
              장바구니
            </Button.CartButton>
            <Button.BuyButton
              onClick={handleBuyModalOpen}
              isSoldOut={isSoldOut}
            >
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
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "100%"};
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
`;
