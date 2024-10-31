// CheckoutPage.tsx
import { useEffect, useState } from "react";
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
import { IOrderProduct } from "../../interfaces/product";
// import { useNavigate} from "react-router-dom";
import {
  Wrapper,
  MaxWidthContainer,
  ButtonWrapper,
  Button,
} from "../../../src/style/CheckoutPage.styles"; // 스타일 파일 import

const clientKey = import.meta.env.VITE_TOSS_CLIENT_ID;

type TossPaymentsInstance = {
  widgets: (options: { customerKey: string }) => PaymentWidgetInstance;
};

type PaymentWidgetInstance = {
  setAmount: (amount: { currency: string; value: number }) => Promise<void>;
  renderPaymentMethods: (options: {
    selector: string;
    variantKey: string;
  }) => Promise<unknown>;
  renderAgreement: (options: {
    selector: string;
    variantKey: string;
  }) => Promise<unknown>;
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
  // const [amount, setAmount] = useState<IAmount>({ currency: "KRW", value: 0 });

  const products: IOrderProduct[] = [
    { product_id: 1, product_name: "상품1", price: 3000, quantity: 1, discount_rate: 5, product_company: "포동" },
    { product_id: 2, product_name: "상품2", price: 2000, quantity: 2, discount_rate: 10, product_company: "포캣" },
  ];

  const pointUsed = 1000;
  const originalAmount = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );
  const totalAmount = originalAmount - pointUsed;

  useEffect(() => {
    async function fetchPaymentWidgets() {
      const tossPayments: TossPaymentsInstance = await loadTossPayments(
        clientKey
      );
      const paymentWidgets = tossPayments.widgets({ customerKey: ANONYMOUS });
      setWidgets(paymentWidgets);
    }

    fetchPaymentWidgets();
  }, []);

  useEffect(() => {
    async function renderPaymentWidgets() {
      if (!widgets) return;

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
    }

    renderPaymentWidgets();
  }, [widgets, totalAmount]);

  const handlePayment = async () => {
    try {
      const orderId = generateRandomString();
      const createOrderResponse = await createOrder(
        orderId,
        originalAmount,
        pointUsed,
        totalAmount,
        products
      );
  
      if (createOrderResponse.status === "주문이 생성되었습니다") {
        await widgets?.requestPayment({
          orderId: createOrderResponse.orderId,
          orderName: "여러 상품 결제",
          successUrl: `${window.location.origin}/success`,
          failUrl: `${window.location.origin}/fail?code=payment_failed&message=${encodeURIComponent("결제에 실패했습니다.")}`,
          customerName: "김토스",
          customerMobilePhone: "01012341234",
        });
      } else {
        alert(
          "주문 생성에 실패했습니다: " +
            (createOrderResponse.error || "알 수 없는 오류")
        );
      }
    } catch (error) {
      alert("주문 생성 중 오류가 발생했습니다: " + error);
    }
  };

  async function createOrder(
    orderId: string,
    originalAmount: number,
    pointUsed: number,
    totalAmount: number,
    products: IOrderProduct[]
  ) {
    const response = await fetch(
      "http://localhost:8000/api/payments/create_order",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          amount: totalAmount,
          originalAmount,
          userId: 1,
          userName: "김토스",  // 추가된 필드
          phoneNumber: "01012341234",  // 추가된 필드
          shippingAddress: "서울시 강남구...",
          shippingAddressDetail: "Apt 101호",  // 추가된 필드
          paymentMethod: "card",
          shippingMemo: "부재시 문 앞에 놔둬주세요!",
          pointsUsed: pointUsed,
          products,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "서버 오류가 발생했습니다.");
    }

    return response.json();
  }

  function generateRandomString(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
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