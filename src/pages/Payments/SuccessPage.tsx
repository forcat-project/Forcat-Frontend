import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  BoxSection,
  Image,
  Grid,
  Button,
} from "../../../src/style/SuccessPage.styles";
import { MarketContainer } from "../../components/Product/ProductContainer";
import { PaymentData, ResponseData } from "../../interfaces/product";

const SuccessPage: React.FC = () => {
  const [paymentData, setPaymentData] = useState<PaymentData>({
    paymentKey: null,
    orderId: null,
    amount: null,
  });
  const [responseData, setResponseData] = useState<ResponseData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    // 조건에 따라 paymentData 설정
    const data: PaymentData = {
      paymentKey: urlParams.get("paymentKey"),
      orderId: urlParams.get("orderId"),
      amount: urlParams.get("amount"),
    };
    setPaymentData(data);

    const confirmPayment = async () => {
      try {
        const response = await axios.post(
          "/payments/confirm",
          data // paymentData 객체 사용
        );
        setResponseData(response.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          navigate(
            `/fail?message=${error.response.data.message}&code=${error.response.data.code}`
          );
        } else {
          console.error("결제 승인 요청 중 오류 발생:", error);
        }
      }
    };

    confirmPayment();
  }, [navigate]);

  const userId = responseData?.user_id;
  const orderId = responseData?.order_id;

  return (
    <MarketContainer>
      <BoxSection>
        <Image
          src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png"
          alt="결제 성공"
        />
        <h2>결제를 완료했어요</h2>

        <Grid>
          <div>
            <b>결제금액</b>
          </div>
          <div>{paymentData.amount}원</div>
        </Grid>
        <Grid>
          <div>
            <b>주문번호</b>
          </div>
          <div>{paymentData.orderId}</div>
        </Grid>
        <Grid>
          <div>
            <b>고객 아이디</b>
          </div>
          <div>{userId}</div>
        </Grid>
        <div
          style={{
            marginTop: "30px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            className="primary"
            onClick={() => navigate(`/orders/${userId}/${orderId}/details`)}
          >
            확인
          </Button>
          <Button
            className="secondary"
            onClick={() =>
              (window.location.href = "https://discord.gg/A4fRFXQhRu")
            }
          >
            실시간 문의
          </Button>
        </div>
      </BoxSection>
    </MarketContainer>
  );
};

export default SuccessPage;