import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { orderAPI } from "../../api/resourses/orders";
import { MarketContainer } from "../../components/Product/ProductContainer";
import { IResponseData } from "../../interfaces/product";
import styled from "styled-components";

const PaymentsDetail: React.FC = () => {
  const [responseData, setResponseData] = useState<IResponseData | null>(null);
  const { userId, orderId } = useParams<{ userId: string; orderId: string }>();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId || !userId) return;

      try {
        const response = await orderAPI.getOrder(Number(userId), orderId);
        setResponseData(response.data);
      } catch (error) {
        console.error("주문 상세 정보 요청 중 오류 발생:", error);
      }
    };

    fetchOrderDetails();
  }, [orderId, userId]);

  const formatPhoneNumber = (phoneNumber: string | undefined) => {
    if (!phoneNumber) return "";
    return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  };

  if (!responseData) return <div>Loading...</div>;

  const { order_info } = responseData;

  return (
    <MarketContainer>
      <BoxSection>
        <Title>주문 상세</Title>
        <Grid>
          <div>
            <OrderNumber>No.{orderId}</OrderNumber>
          </div>
        </Grid>
        <Grid>
          <OrderDate>
            (
            {new Date(order_info.order_date)
              .toLocaleDateString("ko-KR", {
                year: "2-digit",
                month: "2-digit",
                day: "2-digit",
              })
              .replace(/\./g, ".")}
            )
          </OrderDate>
        </Grid>
        <Divider />

        {/* 구매 상품 */}
        <SectionTitle>구매 상품</SectionTitle>
        {order_info.products.map((product, index) => (
          <ProductSection key={index}>
            <Grid>
              <Status>{order_info.status}</Status>
              <ProductCompany>{product.product_company}</ProductCompany>
            </Grid>
            <Grid>
              <ProductInfo>
                <ProductImage
                  src={product.product_image}
                  alt={product.product_name}
                />
                <div>
                  <ProductName>{product.product_name}</ProductName>
                  <ProductOptions>{product.options}</ProductOptions>
                </div>
              </ProductInfo>
              <ProductPrice>
                {Number(product.price).toLocaleString()}원
              </ProductPrice>
            </Grid>
            <Divider />
          </ProductSection>
        ))}

        {/* 배송 정보 */}
        <SectionTitle>배송 정보</SectionTitle>
        <Grid>
          <Label>수령인</Label>
          <div>{order_info.user_name}</div>
        </Grid>
        <Grid>
          <Label>휴대폰</Label>
          <div>{formatPhoneNumber(order_info.phone_number)}</div>
        </Grid>
        <Grid>
          <Label>주소</Label>
          <div>
            {order_info.shipping_address} {order_info.shipping_address_detail}
          </div>
        </Grid>
        <Grid>
          <Label>배송 메모</Label>
          <div>{order_info.shipping_memo || "없음"}</div>
        </Grid>
        <Divider />

        {/* 결제 내역 */}
        <SectionTitle>결제 내역</SectionTitle>
        <Grid>
          <Label>상품 금액</Label>
          <div>{Number(order_info.original_amount).toLocaleString()}원</div>
        </Grid>
        <Grid>
          <Label>쿠폰 할인</Label>
          <div>-{Number(order_info.discount || 0).toLocaleString()}원</div>
        </Grid>
        <Divider />
        <Grid>
          <TotalLabel>총 결제 금액</TotalLabel>
          <TotalAmount>
            {Number(order_info.total_amount).toLocaleString()}원
          </TotalAmount>
        </Grid>
        <Grid>
          <Label>결제 방법</Label>
          <div>{order_info.payment_method}</div>
        </Grid>
      </BoxSection>
    </MarketContainer>
  );
};

export default PaymentsDetail;

const BoxSection = styled.div`
  text-align: center;
  margin: 20px auto;
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

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const OrderNumber = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const OrderDate = styled.span`
  font-size: 14px;
  color: #6c757d;
`;

const Divider = styled.hr`
  border: 0;
  border-top: 1px solid #e9ecef;
  margin: 10px 0;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
  text-align: left;
`;

const ProductSection = styled.div`
  margin-top: 10px;
`;

const ProductCompany = styled.div`
  font-weight: bold;
  color: #333;
`;

const Status = styled.div`
  font-size: 14px;
  color: #f04b4b;
  font-weight: bold;
`;

const ProductInfo = styled.div`
  display: flex;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 60px;
  height: 60px;
  margin-right: 10px;
  border-radius: 4px;
  object-fit: cover;
`;

const TotalAmount = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #f4b647;
`;

const ProductName = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;

const ProductOptions = styled.div`
  font-size: 12px;
  color: #888;
`;

const ProductPrice = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

const Label = styled.div`
  font-weight: bold;
  color: #333;
`;

const TotalLabel = styled.div`
  font-weight: bold;
  font-size: 18px;
  color: #333;
`;
