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

interface ResponseData {
  orderId: string;
  paymentDate: string;
  items: Array<{
    company: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  shippingStatus: string;
  recipientName: string;
  recipientPhone: string;
  address: string;
  shippingMemo: string;
  productAmount: number;
  totalAmount: number;
}

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
          <div>{responseData?.orderId}</div>
        </Grid>
        <Grid>
          <div><b>결제 날짜</b></div>
          <div>{responseData?.paymentDate}</div>
        </Grid>

        <h3>구매 상품</h3>
        {responseData?.items.map((item, index) => (
          <BoxSection key={index}>
            <Grid>
              <div><b>회사명</b></div>
              <div>{item.company}</div>
            </Grid>
            <Grid>
              <div><b>상품명</b></div>
              <div>{item.name}</div>
            </Grid>
            <Grid>
              <div><b>구매 수량</b></div>
              <div>{item.quantity}개</div>
            </Grid>
            <Grid>
              <div><b>상품 금액</b></div>
              <div>{item.price}원</div>
            </Grid>
          </BoxSection>
        ))}

        <h3>배송 현황</h3>
        <Grid>
          <div><b>배송 상태</b></div>
          <div>{responseData?.shippingStatus}</div>
        </Grid>

        <h3>배송 정보</h3>
        <Grid>
          <div><b>수령인</b></div>
          <div>{responseData?.recipientName}</div>
        </Grid>
        <Grid>
          <div><b>휴대폰</b></div>
          <div>{responseData?.recipientPhone}</div>
        </Grid>
        <Grid>
          <div><b>주소</b></div>
          <div>{responseData?.address}</div>
        </Grid>
        <Grid>
          <div><b>배송 메모</b></div>
          <div>{responseData?.shippingMemo}</div>
        </Grid>

        <h3>결제 내역</h3>
        <Grid>
          <div><b>상품 금액</b></div>
          <div>{responseData?.productAmount}원</div>
        </Grid>
        <Grid>
          <div><b>총 결제 금액</b></div>
          <div>{responseData?.totalAmount}원</div>
        </Grid>

        <div style={{ marginTop: "30px", display: "flex", justifyContent: "center" }}>
          <Button className="primary" onClick={() => navigate('/order-history')}>
            주문 내역 보기
          </Button>
        </div>
      </BoxSection>
    </MarketContainer>
  );
};

export default SuccessPage;