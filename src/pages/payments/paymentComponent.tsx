import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
import styled from "styled-components";
import { orderAPI } from "../../api/resourses/orders";

const clientKey = import.meta.env.VITE_TOSS_CLIENT_ID;

type TossPaymentsInstance = {
    widgets: (options: { customerKey: string }) => PaymentWidgetInstance;
};

type PaymentWidgetInstance = {
    setAmount: (amount: { currency: string; value: number }) => Promise<void>;
    renderPaymentMethods: (options: { selector: string; variantKey: string }) => Promise<unknown>;
    renderAgreement: (options: { selector: string; variantKey: string }) => Promise<unknown>;
    requestPayment: (options: {
        orderId: string;
        orderName: string;
        successUrl: string;
        failUrl: string;
        customerName?: string;
        customerMobilePhone?: string;
    }) => Promise<void>;
};

export default function CheckoutPage() {
    const [ready, setReady] = useState<boolean>(false);
    const [widgets, setWidgets] = useState<PaymentWidgetInstance | null>(null);
    const location = useLocation();
    const navigate = useNavigate();

    const {
        userId,
        userName,
        phoneNumber,
        shippingAddress,
        shippingAddressDetail,
        shippingMemo,
        pointsUsed,
        originalAmount,
        totalAmount,
        cancellationDate,
        products,
    } = location.state || {};

    useEffect(() => {
        async function fetchPaymentWidgets() {
            try {
                const tossPayments: TossPaymentsInstance = await loadTossPayments(clientKey);
                const paymentWidgets = tossPayments.widgets({ customerKey: ANONYMOUS });
                setWidgets(paymentWidgets);
            } catch (error) {
                console.error("결제 위젯 로드 중 오류 발생:", error);
            }
        }

        fetchPaymentWidgets();
    }, []);

    useEffect(() => {
        async function renderPaymentWidgets() {
            if (!widgets) return;

            try {
                await widgets.setAmount({ currency: "KRW", value: totalAmount });
                await Promise.all([
                    widgets.renderPaymentMethods({
                        selector: "#payment-method",
                        variantKey: "DEFAULT",
                    }),
                    widgets.renderAgreement({
                        selector: "#agreement",
                        variantKey: "AGREEMENT",
                    }),
                ]);

                setReady(true);
            } catch (error) {
                console.error("결제 위젯 렌더링 중 오류 발생:", error);
            }
        }

        renderPaymentWidgets();
    }, [widgets, totalAmount]);

    const handlePayment = async () => {
        try {
            const orderId = generateNumericString();
            const createOrderResponse = await orderAPI.createOrder({
                orderId,
                amount: totalAmount,
                originalAmount,
                userId,
                userName,
                phoneNumber,
                shippingAddress,
                shippingAddressDetail,
                paymentMethod: "card",
                shippingMemo,
                pointsUsed,
                cancellationDate,
                products: products.map(
                    (product: {
                        product_id: number;
                        name: string;
                        count: number;
                        discounted_price: number;
                        discount_rate: number;
                        company: string;
                        thumbnail_url: string;
                    }) => ({
                        product_id: product.product_id,
                        quantity: product.count,
                        product_name: product.name,
                        price: product.discounted_price,
                        discount_rate: product.discount_rate,
                        product_company: product.company,
                        product_image: product.thumbnail_url,
                    })
                ),
            });

            if (createOrderResponse.data.status === "주문이 생성되었습니다" && createOrderResponse.data.orderId) {
                await widgets?.requestPayment({
                    orderId: createOrderResponse.data.orderId,
                    orderName: "상품 결제",
                    successUrl: `${window.location.origin}/success`,
                    failUrl: `${window.location.origin}/fail?code=payment_failed&message=${encodeURIComponent(
                        "결제에 실패했습니다."
                    )}`,
                    customerName: userName,
                    customerMobilePhone: phoneNumber,
                });
            } else {
                alert("주문 생성에 실패했습니다: " + (createOrderResponse.data.error || "알 수 없는 오류"));
            }
        } catch (error) {
            alert("주문 생성 중 오류가 발생했습니다: " + error);
        }
    };

    function generateNumericString(length: number = 12): string {
        let result = "";
        while (result.length < length) {
            result += Math.floor(Math.random() * 10);
        }
        return result;
    }

    return (
        <Wrapper>
            <MaxWidthContainer>
                <div id="payment-method" className="w-100" />
                <div id="agreement" className="w-100" />
                <ButtonWrapper>
                    <Button className="primary" onClick={handlePayment} disabled={!ready}>
                        결제하기
                    </Button>
                </ButtonWrapper>
            </MaxWidthContainer>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 64px 0 0 0;
    overflow: auto;
    width: 100%;
    height: 100vh;
`;

const MaxWidthContainer = styled.div`
    max-width: 500px;
    width: 100%;
`;

const ButtonWrapper = styled.div`
    padding: 0 24px;
`;

const Button = styled.button`
    padding: 11px 22px;
    border: none;
    border-radius: 8px;
    background-color: #f2f4f6;
    color: #4e5968;
    font-weight: 600;
    font-size: 17px;
    cursor: pointer;

    &.primary {
        background-color: #f4b647;
        color: #f9fcff;
    }
`;
