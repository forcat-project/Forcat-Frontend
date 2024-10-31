// SuccessPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BoxSection,
  Image,
  Grid,
  Button,
} from "../../../src/style/SuccessPage.styles";
import { MarketContainer } from "../../components/Product/ProductContainer";

interface PaymentData {
  paymentKey: string | null;
  orderId: string | null;
  amount: string | null;
}

const SuccessPage: React.FC = () => {
  const [paymentData, setPaymentData] = useState<PaymentData>({
    paymentKey: null,
    orderId: null,
    amount: null,
  });
  const [responseData, setResponseData] = useState<Record<string, unknown> | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    setPaymentData({
      paymentKey: urlParams.get("paymentKey"),
      orderId: urlParams.get("orderId"),
      amount: urlParams.get("amount"),
    });

    const confirmPayment = async () => {
      try {
        const requestData = {
          paymentKey: urlParams.get("paymentKey"),
          orderId: urlParams.get("orderId"),
          amount: urlParams.get("amount"),
        };

        const response = await fetch("http://localhost:8000/api/payments/confirm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });

        const json = await response.json();

        if (!response.ok) {
          navigate(`/fail?message=${json.message}&code=${json.code}`);
        } else {
          setResponseData(json);
        }
      } catch (error) {
        console.error("결제 승인 요청 중 오류 발생:", error);
      }
    };

    confirmPayment();
  }, [navigate]);

  return (
    <MarketContainer>
      <BoxSection>
        <Image
          src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png"
          alt="결제 성공"
        />
        <h2>결제를 완료했어요</h2>

        <Grid>
          <div><b>결제금액</b></div>
          <div>{paymentData.amount}원</div>
        </Grid>
        <Grid>
          <div><b>주문번호</b></div>
          <div>{paymentData.orderId}</div>
        </Grid>
        <Grid>
          <div><b>Payment Key</b></div>
          <div>{paymentData.paymentKey}</div>
        </Grid>
        <div style={{ marginTop: "30px", display: "flex", justifyContent: "center" }}>
          <Button
            className="primary"
            onClick={() =>
              navigate("/buy")
            }
          >
            확인
          </Button>
          <Button
            className="secondary"
            onClick={() => window.location.href = "https://discord.gg/A4fRFXQhRu"}
          >
            실시간 문의
          </Button>
        </div>
      </BoxSection>

      <BoxSection>
        <b>Response Data :</b>
        <div>
          <pre>{JSON.stringify(responseData, null, 4)}</pre>
        </div>
      </BoxSection>
    </MarketContainer>
  );
};

export default SuccessPage;