import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { orderAPI } from "../../../src/api/resourses/orders";
import styled from "styled-components";
import axios from "axios";
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

        // URL 파라미터에서 결제 정보 설정
        const fetchedPaymentData = {
            paymentKey: urlParams.get("paymentKey"),
            orderId: urlParams.get("orderId"),
            amount: Number(urlParams.get("amount")),
        };

        setPaymentData({
            ...fetchedPaymentData,
            amount: String(fetchedPaymentData.amount),
        });

        const confirmPayment = async () => {
            if (fetchedPaymentData.paymentKey && fetchedPaymentData.orderId) {
                try {
                    const response = await orderAPI.confirmPayment({
                        paymentKey: fetchedPaymentData.paymentKey,
                        orderId: fetchedPaymentData.orderId,
                        amount: fetchedPaymentData.amount,
                    });
                    setResponseData(response.data);
                } catch (error) {
                    if (axios.isAxiosError(error) && error.response) {
                        const { message, code } = error.response.data;
                        navigate(`/fail?message=${message}&code=${code}`);
                    } else {
                        console.error("결제 승인 요청 중 오류 발생:", error);
                    }
                }
            } else {
                console.error("필수 결제 정보가 누락되었습니다.");
            }
        };

        // paymentKey, orderId, amount가 존재하는 경우에만 confirmPayment 호출
        confirmPayment();
    }, [navigate]);

    const userId = responseData?.user_id;
    const orderId = responseData?.order_id;

    return (
        <MarketContainer>
            <BoxSection>
                <Image src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png" alt="결제 성공" />
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
                    <div>No.{paymentData.orderId}</div>
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
                        onClick={() => userId && orderId && navigate(`/orders/${userId}/${orderId}/details`)}
                    >
                        확인
                    </Button>
                    <Button
                        className="secondary"
                        onClick={() => (window.location.href = "https://discord.gg/A4fRFXQhRu")}
                    >
                        실시간 문의
                    </Button>
                </div>
            </BoxSection>
        </MarketContainer>
    );
};

export default SuccessPage;

const BoxSection = styled.div`
    /* width: 600px; */
    text-align: center;
    margin: 20px auto;
`;

const Image = styled.img`
    width: 100px;
`;

const Grid = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    font-size: 16px;

    &.title {
        margin-top: 50px;
    }
`;

const Button = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;

    &.primary {
        background-color: #4e96f2;
        color: white;
    }

    &.secondary {
        background-color: #e8f3ff;
        color: #1b64da;
    }

    margin: 0 10px;
`;
