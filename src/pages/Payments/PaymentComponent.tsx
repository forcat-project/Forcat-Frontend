import { useEffect, useState } from "react";
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
import axios from "axios";
import { IOrderProduct, ICreateOrderRequest } from "../../interfaces/product";
import {
  Wrapper,
  MaxWidthContainer,
  ButtonWrapper,
  Button,
} from "../../../src/style/CheckoutPage.styles";

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

  const products: IOrderProduct[] = [
    {
      product_id: 11,
      product_name: "네코이찌 발톱깍이",
      price: 18500,
      quantity: 1,
      discount_rate: 0,
      product_company: "템테이션",
      product_image:
        "https://neko.co.kr/web/product/big/202103/e0c9f9908e722d0c6350d4e8c229d88f.jpg",
      product_status: "",
    },
    {
      product_id: 26,
      product_name:
        "위스카스 포켓 캣 고양이 헤어볼닭고기 참치 오션피쉬 사료 1.1kg/3kg/7kg",
      price: 10500,
      quantity: 2,
      discount_rate: 0,
      product_company: "힐링타임",
      product_image:
        "https://neko.co.kr/web/product/big/202103/9fd529767482ef5ea23eb40195bf6bf5.png",
      product_status: "",
    },
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
      const orderId = generateNumericString();
      const orderParams: ICreateOrderRequest = {
        orderId,
        amount: totalAmount,
        originalAmount,
        userId: 1,
        userName: "김토스",
        phoneNumber: "01012341234",
        shippingAddress: "서울시 강남구...",
        shippingAddressDetail: "Apt 101호",
        paymentMethod: "card",
        shippingMemo: "부재시 문 앞에 놔둬주세요!",
        pointsUsed: pointUsed,
        products,
      };

      const createOrderResponse = await createOrder(orderParams);

      if (createOrderResponse.status === "주문이 생성되었습니다") {
        await widgets?.requestPayment({
          orderId: createOrderResponse.orderId,
          orderName: "여러 상품 결제",
          successUrl: `${window.location.origin}/success`,
          failUrl: `${
            window.location.origin
          }/fail?code=payment_failed&message=${encodeURIComponent(
            "결제에 실패했습니다."
          )}`,
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

  async function createOrder(order: ICreateOrderRequest) {
    try {
      const response = await axios.post(
        "/paymnets/orders",
        order,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorData = error.response.data;
        throw new Error(errorData.error || "서버 오류가 발생했습니다.");
      } else {
        throw new Error("주문 생성 요청 중 알 수 없는 오류가 발생했습니다.");
      }
    }
  }

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