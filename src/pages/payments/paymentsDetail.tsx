import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { orderAPI } from "../../api/resourses/orders";
import { IResponseData } from "../../interfaces/product";
import styled from "styled-components";
import { Text, PageWrapper, Divider, Block, Img } from "../../styles/ui";

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

    if (!responseData)
        return (
            <Block.FlexBox width="100%" height="100vh" bgColor="white">
                로딩 중...
            </Block.FlexBox>
        );

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
                                <ProductImage src={product.product_image} alt={product.product_name} />
                                <div>
                                    <ProductName>{product.product_name}</ProductName>
                                    <ProductOptions>{product.options}</ProductOptions>
                                </div>
                            </ProductInfo>
                            <ProductPrice>{Number(product.price).toLocaleString()}원</ProductPrice>
                        </Grid>
                        <Divider />
                    </ProductSection>
                ))}

  const shippingStatuses = [
    "배송준비중",
    "상품발송",
    "택배사도착",
    "배송중",
    "배송완료",
  ];

  return (
    <PageWrapper style={{ marginTop: "70px" }}>
      <BoxSection>
        <Grid>
          <Text.TitleMenu200>
            {new Date(order_info.order_date)
              .toLocaleDateString("ko-KR", {
                year: "2-digit",
                month: "2-digit",
                day: "2-digit",
              })
              .replace(/\./g, ".")}
          </Text.TitleMenu200>
          <div>No.{orderId}</div>
        </Grid>
        <Divider />

        {/* 유저정보 */}
        <Block.FlexBox direction="column" margin="0 0 0 10px" flexGrow="1">
          <Text.Notice200
            style={{
              // color: "#161616",
              marginBottom: "15px",
              fontSize: "20px",
            }}
          >
            {order_info.user_name}
          </Text.Notice200>
          <Text.Menu
            style={{
              marginBottom: "10px",
            }}
          >
            {formatPhoneNumber(order_info.phone_number)}
          </Text.Menu>
          <Text.Menu
            style={{
              marginBottom: "10px",
            }}
          >
            {order_info.shipping_address} {order_info.shipping_address_detail}
          </Text.Menu>
          <Text.Menu
            style={{
              marginBottom: "10px",
            }}
          >
            {order_info.shipping_memo}{" "}
          </Text.Menu>
        </Block.FlexBox>
        <Divider />

        {/* 주문상품 정보 */}
        <Block.FlexBox
          direction="column"
          margin="0 0 0 10px"
          flexGrow="1"
          style={{
            marginLeft: "10px",
          }}
        >
          <Text.Menu200
            style={{
              fontSize: "20px",
              marginBottom: "20px",
            }}
          >
            주문상품 {order_info.products.length}개
          </Text.Menu200>
          <Text.TitleMenu100
            style={
              {
                // paddingLeft: "-30px",
                // marginBottom: "8px",
                // color: "#666669",
              }
            }
          >
            {order_info.status === "completed" ? "구매확정" : "결제완료"}
          </Text.TitleMenu100>
        </Block.FlexBox>

        <Block.FlexBox
          direction="column"
          alignItems="center"
          padding="16px"
          style={{
            borderRadius: "8px",
            margin: "10px 0",
            border: "1px solid #e8e9eb",
          }}
        >
          {order_info.products.map((product, index) => (
            <Block.FlexBox
              key={index}
              direction="row"
              alignItems="center"
              padding="16px"
              // onClick={() => handleClick(item.product_id)}
              style={{ cursor: "pointer" }}
            >
              <Img.AngledIcon
                src={product.product_image}
                width="80px"
                height="80px"
              />
              <Block.FlexBox
                direction="column"
                margin="0 0 0 20px"
                flexGrow="1"
              >
                <Text.Notice200
                  style={{
                    color: "#161616",
                    marginBottom: "5px",
                    fontSize: "13px",
                  }}
                >
                  {product.product_company}
                </Text.Notice200>
                <Text.Menu
                  margin="5px 0"
                  style={{
                    color: "#161616",
                    marginBottom: "5px",
                    fontSize: "13px",
                  }}
                >
                  {product.product_name}
                </Text.Menu>
                <Text.Menu
                  color="Gray"
                  style={{
                    marginBottom: "10px",
                    fontSize: "13px",
                  }}
                >
                  {product.quantity}개
                </Text.Menu>
                <Text.TitleMenu200>
                  {Math.round(order_info.total_amount).toLocaleString()}원
                </Text.TitleMenu200>
              </Block.FlexBox>
            </Block.FlexBox>
          ))}
        </Block.FlexBox>
        <ButtonContainer>
          <Button>재구매</Button>
          <Button>주문 취소</Button>
        </ButtonContainer>
        <Divider />

        {/* 배송현황 */}
        <Block.FlexBox
          direction="column"
          margin="0 0 0 10px"
          flexGrow="1"
          style={{
            marginLeft: "10px",
          }}
        >
          <Text.Menu200
            style={{
              fontSize: "20px",
              marginBottom: "20px",
            }}
          >
            배송 현황{" "}
          </Text.Menu200>
          <ShippingStatusContainer>
            {shippingStatuses.map((status, index) => (
              <StatusText
                key={index}
                isActive={status === order_info.shipping_status}
              >
                {status}
              </StatusText>
            ))}
          </ShippingStatusContainer>
        </Block.FlexBox>
        <Divider />

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
    </PageWrapper>
  );
};

export default PaymentsDetail;

const BoxSection = styled.div`
  /* width: 600px; */

  /* margin: 10px auto; */
  padding: 0px 24px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const Grid = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  padding: 15px;
  font-size: 16px;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  padding: 10px 0;
  /* border-top: 1px solid #e8e9eb; */
`;

const Button = styled.button`
  width: 48%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #e8e9eb;
  border-radius: 8px;
  background-color: white;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const ShippingStatusContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const StatusText = styled.span<{ isActive: boolean }>`
  color: ${(props) => (props.isActive ? "#F4B647" : "#000")};
`;
