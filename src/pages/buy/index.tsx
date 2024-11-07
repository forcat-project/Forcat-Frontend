import { useLocation, useNavigate } from "react-router-dom";
import { Block, Text, Button, Divider, PageWrapper } from "../../styles/ui";
import { useState } from "react";
import ProductInfo from "../../components/Buy/ProductInfo";
import DeliveryInfo from "../../components/Buy/DeliveryInfo";
import PointInfo from "../../components/Buy/PointInfo";
import Total from "../../components/Buy/Total";
import { useUserId } from "../../hooks/useUserId"; // useUserId 훅 가져오기

// 타입 정의
interface Product {
  product_id: number;
  thumbnail_url: string;
  name: string;
  company: string;
  discounted_price: number;
  discount_rate: number;
}

interface CartProduct {
  product: Product;
  count: number;
}

export default function Buy() {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = useUserId();
  const { products = [] } = (location.state as { products: CartProduct[] }) || {
    products: [],
  };
  const [isProductInfoExpanded, setIsProductInfoExpanded] = useState(true);
  const [isShippingInfoExpanded, setIsShippingInfoExpanded] = useState(true);
  const [inputValue, setInputValue] = useState("0");
  const [isConfirmDisabled, setIsConfirmDisabled] = useState(true);

  // 배송 정보 상태
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingAddressDetail, setShippingAddressDetail] = useState("");
  const [shippingMemo, setShippingMemo] = useState("");

  // 주문 취소 상태
  const [cancellationDate] = useState("");

  if (!products.length) {
    return (
      <Block.FlexBox width="100%" height="100vh" bgColor="white">
        상품 정보가 없습니다.
      </Block.FlexBox>
    );
  }

  const toggleProductInfo = () => {
    setIsProductInfoExpanded((prev) => !prev);
  };

  const toggleShippingInfo = () => {
    setIsShippingInfoExpanded((prev) => !prev);
  };

  // 모든 상품의 총 가격 계산
  const productTotalPrice = products.reduce((total, item) => {
    return total + Math.round(item.product.discounted_price) * item.count;
  }, 0);

  const pointsUsed = Number(inputValue);
  const finalPrice = Math.max(productTotalPrice - pointsUsed, 0);

  // ProductInfo 컴포넌트에 전달할 형식으로 변환
  const formattedProducts = products.map(({ product, count }) => ({
    product_id: String(product.product_id), // product_id를 string으로 변환
    thumbnail_url: product.thumbnail_url,
    name: product.name,
    company: product.company,
    discounted_price: product.discounted_price,
    discount_rate: product.discount_rate,
    count: count,
    product_status: null,
  }));

  const handlePayment = () => {
    console.log("handlePayment 함수가 호출되었습니다");

    const jsonData = {
      userId,
      userName,
      phoneNumber,
      shippingAddress,
      shippingAddressDetail,
      shippingMemo,
      pointsUsed,
      originalAmount: productTotalPrice,
      totalAmount: finalPrice,
      cancellationDate: cancellationDate,
      products: formattedProducts,
    };

    console.log("결제 정보:", jsonData);
    navigate("/payments", { state: jsonData });
  };

  return (
    <PageWrapper>
      <Block.FlexBox
        direction="column"
        alignItems="center"
        style={{ margin: "70px 0", padding: "10px" }}
      >
        <ProductInfo
          products={formattedProducts}
          isProductInfoExpanded={isProductInfoExpanded}
          toggleProductInfo={toggleProductInfo}
        />
        <Divider />
        <DeliveryInfo
          isShippingInfoExpanded={isShippingInfoExpanded}
          toggleShippingInfo={toggleShippingInfo}
          onConfirmDisabledChange={setIsConfirmDisabled}
          setUserName={setUserName}
          setPhoneNumber={setPhoneNumber}
          setShippingAddress={setShippingAddress}
          setShippingAddressDetail={setShippingAddressDetail}
          setShippingMemo={setShippingMemo}
        />
        <Divider />
        <PointInfo inputValue={inputValue} setInputValue={setInputValue} />
        <Divider />
        <Total
          productTotalPrice={productTotalPrice}
          pointsToDeduct={pointsUsed}
          finalPrice={finalPrice}
        />
        <Block.AbsoluteBox
          bottom="0%"
          zIndex="3"
          padding="20px"
          bgColor="white"
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Button.Confirm
            cursor="pointer"
            isDisabled={isConfirmDisabled}
            onClick={handlePayment}
          >
            <Text.TitleMenu200 color="White">결제하기</Text.TitleMenu200>
          </Button.Confirm>
        </Block.AbsoluteBox>
      </Block.FlexBox>
    </PageWrapper>
  );
}
