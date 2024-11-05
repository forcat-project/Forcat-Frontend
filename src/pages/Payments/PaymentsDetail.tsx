import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance"; // axiosInstance를 import
import { BoxSection, Grid } from "../../style/SuccessPage.styles";
import { MarketContainer } from "../../components/Product/ProductContainer";
import { IResponseData } from "../../interfaces/product";

const PaymentsDetail: React.FC = () => {
  const [responseData, setResponseData] = useState<IResponseData | null>(null);
  const { userId, orderId } = useParams<{ userId: string; orderId: string }>();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId || !userId) return;

      try {
        // axiosInstance를 사용하여 API 요청
        const response = await axiosInstance.get(`users/${userId}/orders/${orderId}`);
        setResponseData(response.data); // 서버에서 응답한 주문 상세 데이터를 설정
      } catch (error) {
        console.error("주문 상세 정보 요청 중 오류 발생:", error);
      }
    };

    fetchOrderDetails();
  }, [orderId, userId]);

  if (!responseData) return <div>Loading...</div>;

  const { order_info } = responseData;

  return (
    <MarketContainer>
      <BoxSection>
        <h2>주문 상세</h2>
        <Grid>
          <div>
            <b>No.{orderId}</b>
          </div>
        </Grid>
        <Grid>
          <div>
            <b>Date</b>(
            {new Date(order_info.order_date)
              .toLocaleDateString("ko-KR", {
                year: "2-digit",
                month: "2-digit",
                day: "2-digit",
              })
              .replace(/\./g, ".")}
            )
          </div>
        </Grid>
        <hr />
        <h3>구매 상품</h3>
        {order_info.products.map((product, index) => (
          <BoxSection key={index}>
            <Grid>
              <div>
                <b>{product.product_company}</b>
              </div>
            </Grid>
            <Grid>
              <div>{order_info.status}</div>
            </Grid>
            <Grid>
              <div>
                <b>상품명</b>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={product.product_image}
                  alt={product.product_name}
                  style={{
                    width: "80px",
                    height: "80px",
                    marginRight: "0px",
                    borderRadius: "5px",
                  }}
                />
                {product.product_name}
                {product.product_status}
              </div>
            </Grid>
            <Grid>
              <div>
                <b>구매 수량</b>
              </div>
              <div>{product.quantity}개</div>
            </Grid>
            <Grid>
              <div>
                <b>상품 금액</b>
              </div>
              <div>{Number(product.price).toLocaleString()}원</div>
            </Grid>
            <hr />
          </BoxSection>
        ))}

        <h2>배송 현황</h2>
        <Grid>
          <div>{order_info.shipping_status}</div>
        </Grid>
        <hr />

        <h2>배송 정보</h2>
        <Grid>
          <div>
            <b>수령인</b>
          </div>
          <div>{order_info.user_name}</div>
        </Grid>
        <Grid>
          <div>
            <b>휴대폰</b>
          </div>
          <div>{order_info.phone_number}</div>
        </Grid>
        <Grid>
          <div>
            <b>주소</b>
          </div>
          <div>
            {order_info.shipping_address} {order_info.shipping_address_detail}
          </div>
        </Grid>
        <Grid>
          <div>
            <b>배송 메모</b>
          </div>
          <div>{order_info.shipping_memo}</div>
        </Grid>
        <hr />

        <h2>결제 내역</h2>
        <Grid>
          <div>
            <b>상품 금액</b>
          </div>
          <div>{Number(order_info.original_amount).toLocaleString()}원</div>
        </Grid>
        <Grid>
          <div>
            <b>사용한 포인트</b>
          </div>
          <div>-{Number(order_info.points_used).toLocaleString()}pt</div>
        </Grid>
        <hr />
        <Grid>
          <div>
            <b>총 결제 금액</b>
          </div>
          <div>{Number(order_info.total_amount).toLocaleString()}원</div>
        </Grid>
        <Grid>
          <div>
            <b>결제 방법</b>
          </div>
          <div>{order_info.payment_method}</div>
        </Grid>
      </BoxSection>
    </MarketContainer>
  );
};

export default PaymentsDetail;