import { useLocation } from "react-router-dom";
import {
  Block,
  Text,
  Button,
  Divider,
  PageWrapper,
  Section,
} from "../../style/ui";
import { useState } from "react";
import ProductInfo from "../../components/Buy/productInfo";
import DeliveryInfo from "../../components/Buy/deliveryInfo";
import PointInfo from "../../components/Buy/pointInfo";

export default function Buy() {
  const location = useLocation();
  const { product, count } = location.state || {};
  const [isProductInfoExpanded, setIsProductInfoExpanded] = useState(true);
  const [isShippingInfoExpanded, setIsShippingInfoExpanded] = useState(true);
  const [inputValue, setInputValue] = useState("0"); // 포인트 사용 입력값

  if (!product) {
    return <div>상품 정보가 없습니다.</div>;
  }

  const toggleProductInfo = () => {
    setIsProductInfoExpanded((prev) => !prev);
  };

  const toggleShippingInfo = () => {
    setIsShippingInfoExpanded((prev) => !prev);
  };

  // 상품 금액 및 최종 결제 금액 계산
  const productTotalPrice = Math.round(product.discounted_price) * count;
  const pointsToDeduct = Number(inputValue); // 포인트 값을 숫자로 변환
  const finalPrice = Math.max(productTotalPrice - pointsToDeduct, 0); // 포인트를 차감한 최종 금액

  return (
    <PageWrapper style={{ maxHeight: "calc(100vh - 90px)" }}>
      <Block.FlexBox direction="column" style={{ marginTop: "90px" }}>
        <ProductInfo
          product={product}
          count={count}
          isProductInfoExpanded={isProductInfoExpanded}
          toggleProductInfo={toggleProductInfo}
        />
        <Divider />
        <DeliveryInfo
          isShippingInfoExpanded={isShippingInfoExpanded}
          toggleShippingInfo={toggleShippingInfo}
        />
        <Divider />
        <PointInfo inputValue={inputValue} setInputValue={setInputValue} />
        <Divider />
        <Block.FlexBox padding="20px">
          <Section>
            <Text.TitleMenu300>구매 정보</Text.TitleMenu300>
            <Block.FlexBox justifyContent="space-between">
              <Text.Menu>상품 금액</Text.Menu>
              <Text.TitleMenu200>
                {productTotalPrice.toLocaleString()}원
              </Text.TitleMenu200>
            </Block.FlexBox>
            <Block.FlexBox justifyContent="space-between">
              <Text.Mini>포인트</Text.Mini>
              <Text.Mini>-{pointsToDeduct.toLocaleString()}원</Text.Mini>
            </Block.FlexBox>
            <Block.FlexBox justifyContent="space-between">
              <Text.Mini>배송비</Text.Mini>
              <Text.Mini>무료</Text.Mini>
            </Block.FlexBox>
            <Block.FlexBox
              justifyContent="space-between"
              style={{ fontWeight: "bold" }}
            >
              <Text.Mini>총 결제 금액</Text.Mini>
              <Text.Mini style={{ color: "orange" }}>
                {finalPrice.toLocaleString()}원
              </Text.Mini>
            </Block.FlexBox>
          </Section>
        </Block.FlexBox>
        <Block.AbsoluteBox
          bottom="1%"
          left="0%"
          zIndex="3"
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Button.Confirm cursor="pointer" isDisabled={false}>
            <Text.TitleMenu200 color="White">결제하기</Text.TitleMenu200>
          </Button.Confirm>
        </Block.AbsoluteBox>
      </Block.FlexBox>
    </PageWrapper>
  );
}
