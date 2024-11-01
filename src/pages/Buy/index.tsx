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
import PointInfo from "../../components/Buy/pointInfo"; // Import PointInfo component

export default function Buy() {
  const location = useLocation();
  const { product, count } = location.state || {};
  const [isProductInfoExpanded, setIsProductInfoExpanded] = useState(true);
  const [isShippingInfoExpanded, setIsShippingInfoExpanded] = useState(true);

  if (!product) {
    return <div>상품 정보가 없습니다.</div>;
  }

  const toggleProductInfo = () => {
    setIsProductInfoExpanded((prev) => !prev);
  };

  const toggleShippingInfo = () => {
    setIsShippingInfoExpanded((prev) => !prev);
  };

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
        <PointInfo /> {/* Use the PointInfo component here */}
        <Divider />
        {/* 구매 정보 */}
        <Block.FlexBox padding="20px">
          <Section>
            <Text.TitleMenu300>구매 정보</Text.TitleMenu300>
            <Block.FlexBox justifyContent="space-between">
              <Text.Menu>상품 금액</Text.Menu>
              <Text.TitleMenu200>
                {Math.floor(product.price).toLocaleString()}원
              </Text.TitleMenu200>
            </Block.FlexBox>
            <Block.FlexBox justifyContent="space-between">
              <Text.Mini>포인트</Text.Mini>
              <Text.Mini>-2,000원</Text.Mini>
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
              <Text.Mini style={{ color: "orange" }}>15,000원</Text.Mini>
            </Block.FlexBox>
          </Section>
        </Block.FlexBox>
        {/* 결제 버튼 */}
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
