import { useLocation, useNavigate } from "react-router-dom";
import { Block, Text, Button, Divider, PageWrapper } from "../../style/ui";
import { useState } from "react";
import ProductInfo from "../../components/Buy_temp/ProductInfo";
import DeliveryInfo from "../../components/Buy_temp/DeliveryInfo";
import PointInfo from "../../components/Buy_temp/PointInfo";
import Total from "../../components/Buy_temp/Total";
import { useUserId } from "../../hooks/useUserId"; // useUserId 훅 가져오기

export default function Buy() {
    const location = useLocation();
    const navigate = useNavigate();
    const userId = useUserId(); // userId 가져오기
    const { product, count } = location.state || {};
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

    if (!product) {
        return <div>상품 정보가 없습니다.</div>;
    }

    const toggleProductInfo = () => {
        setIsProductInfoExpanded(prev => !prev);
    };

    const toggleShippingInfo = () => {
        setIsShippingInfoExpanded(prev => !prev);
    };

    const productTotalPrice = Math.round(product.discounted_price) * count;
    const pointsUsed = Number(inputValue); // 사용한 포인트
    const finalPrice = Math.max(productTotalPrice - pointsUsed, 0);

    // ProductInfo에서 기대하는 형식에 맞게 변환
    const products = [
        {
            product_id: product.product_id,
            thumbnail_url: product.thumbnail_url,
            name: product.name,
            company: product.company,
            discounted_price: product.discounted_price,
            discount_rate: product.discount_rate,
            count: count,
            product_status: null,
        },
    ];

    // 결제하기 버튼 클릭 시 /payments 페이지로 이동 및 데이터 전달
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
            products,
        };

        // JSON 데이터를 콘솔에 출력
        console.log("결제 정보:", jsonData);

        // /payments 페이지로 이동하며 jsonData를 전달
        navigate("/payments", { state: jsonData });
    };

    return (
        <PageWrapper style={{ maxHeight: "calc(100vh - 90px)" }}>
            <Block.FlexBox direction="column" style={{ marginTop: "90px" }}>
                <ProductInfo
                    products={products}
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
                <Total productTotalPrice={productTotalPrice} pointsToDeduct={pointsUsed} finalPrice={finalPrice} />
                <Block.AbsoluteBox
                    bottom="1%"
                    left="0%"
                    zIndex="3"
                    style={{ width: "100%", display: "flex", justifyContent: "center" }}
                >
                    <Button.Confirm cursor="pointer" isDisabled={isConfirmDisabled} onClick={handlePayment}>
                        <Text.TitleMenu200 color="White">결제하기</Text.TitleMenu200>
                    </Button.Confirm>
                </Block.AbsoluteBox>
            </Block.FlexBox>
        </PageWrapper>
    );
}
