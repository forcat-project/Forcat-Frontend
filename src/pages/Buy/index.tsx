import { useLocation } from "react-router-dom";
import { Block, Text, Button, Divider, PageWrapper } from "../../style/ui";
import { useState } from "react";
import ProductInfo from "../../components/Buy/productInfo";
import DeliveryInfo from "../../components/Buy/deliveryInfo";
import PointInfo from "../../components/Buy/pointInfo";
import Total from "../../components/Buy/total"; // Import Total component

export default function Buy() {
  const location = useLocation();
  const { product, count } = location.state || {};
  const [isProductInfoExpanded, setIsProductInfoExpanded] = useState(true);
  const [isShippingInfoExpanded, setIsShippingInfoExpanded] = useState(true);
  const [inputValue, setInputValue] = useState("0");

  if (!product) {
    return <div>상품 정보가 없습니다.</div>;
  }

  const toggleProductInfo = () => {
    setIsProductInfoExpanded((prev) => !prev);
  };

  const toggleShippingInfo = () => {
    setIsShippingInfoExpanded((prev) => !prev);
  };

  const productTotalPrice = Math.round(product.discounted_price) * count;
  const pointsToDeduct = Number(inputValue);
  const finalPrice = Math.max(productTotalPrice - pointsToDeduct, 0);

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
        <Total
          productTotalPrice={productTotalPrice}
          pointsToDeduct={pointsToDeduct}
          finalPrice={finalPrice}
        />{" "}
        {/* Use Total component */}
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
