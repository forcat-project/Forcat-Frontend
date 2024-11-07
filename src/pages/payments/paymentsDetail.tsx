import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { orderAPI } from "../../api/resourses/orders";
import { IResponseData } from "../../interfaces/product";
import styled from "styled-components";
import { Text, PageWrapper, Block, Img, Divider2 } from "../../styles/ui";
import axios from "axios"; // axios를 추가하여 문제 해결

const PaymentsDetail: React.FC = () => {
  const [responseData, setResponseData] = useState<IResponseData | null>(null);
  const { userId, orderId } = useParams<{ userId: string; orderId: string }>();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId || !userId) return;

      try {
        const response = await orderAPI.getOrder(Number(userId), orderId);
        setResponseData(response.data);
        console.log(response.data);
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

  const shippingStatuses = [
    "배송 준비 중",
    "➔",
    "상품 발송",
    "➔",
    "택배사 도착",
    "➔",
    "배송중",
    "➔",
    "배송완료",
  ];

  // 주문 취소 함수 추가
  const handleCancelOrder = async () => {
    try {
      await orderAPI.updateOrder(Number(userId), String(orderId));
      alert("주문이 취소되었습니다.");
      setResponseData((prevData) => {
        if (!prevData) return prevData;
        return {
          ...prevData,
          order_info: {
            ...prevData.order_info,
            status: "취소됨",
          },
        };
      });
    } catch (error) {
      console.error("주문 취소 중 오류 발생:", error);
      alert("주문 취소에 실패했습니다.");
    }
  };

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
        <Divider2 />

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
        <Divider2 />

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
          <Text.TitleMenu200
            style={{
              color: order_info.status === "canceled" ? "#fa7586" : "#e8e9eb",
            }}
          >
            {order_info.status === "completed"
              ? "구매확정"
              : order_info.status === "canceled"
              ? "결제취소"
              : "결제완료"}
          </Text.TitleMenu200>
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
          <Button onClick={() => handleCancelOrder()}>주문 취소</Button>
        </ButtonContainer>
        <Divider2 />

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
        <Divider2 />

        {/*========== 결제 내역 */}
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
            결제 내역{" "}
          </Text.Menu200>
        </Block.FlexBox>

        <Block.FlexBox
          direction="column"
          margin="0 0 0 10px"
          flexGrow="1"
          style={{
            marginLeft: "-5px",
            padding: "0 15px", // 양옆에 20px 간격 추가
          }}
        >
          {/* 상품 금액 */}
          <Block.FlexBox
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text.Menu style={{ marginBottom: "10px" }}>상품 금액</Text.Menu>
            <Text.Menu>
              {Number(order_info.original_amount).toLocaleString()}원
            </Text.Menu>
          </Block.FlexBox>

          {/* 포인트 사용 금액 */}
          <Block.FlexBox
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            margin="5px 0"
          >
            <Text.Menu style={{ marginBottom: "10px" }}>포인트 사용</Text.Menu>
            <Text.Menu style={{ color: "#F4B647" }}>{`-${Number(
              order_info.points_used
            ).toLocaleString()}P`}</Text.Menu>
          </Block.FlexBox>

          {/* 배송비 */}
          <Block.FlexBox
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            margin="5px 0"
          >
            <Text.Menu style={{ marginBottom: "10px" }}>배송비</Text.Menu>
            <Text.Menu style={{ color: "#F4B647" }}>배송비 무료</Text.Menu>
          </Block.FlexBox>

          {/* 결제 금액 */}
          <Block.FlexBox
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            margin="10px 0"
          >
            <Text.Menu200 style={{ fontWeight: "bold", fontSize: "18px" }}>
              결제 금액
            </Text.Menu200>
            <Text.Menu200
              style={{ fontWeight: "bold", fontSize: "18px" }}
            >{` ${Number(
              order_info.total_amount
            ).toLocaleString()}원`}</Text.Menu200>
          </Block.FlexBox>

          {/* 결제 수단 */}
          <Block.FlexBox
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            margin="5px 0"
          >
            <Text.Menu style={{ marginBottom: "50px" }}>결제 수단</Text.Menu>
            <Text.Menu>{order_info.payment_method}</Text.Menu>
          </Block.FlexBox>
        </Block.FlexBox>
        <Button2>주문 내역 삭제</Button2>
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
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); */
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

const Button2 = styled.button`
  width: 100%;
  align-items: center;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #e8e9eb;
  border-radius: 8px;
  background-color: white;
  margin-bottom: 50px;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const ShippingStatusContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  justify-content: space-evenly;
  justify-content: center;
  margin-left: -20px;
`;

const StatusText = styled.span<{ isActive: boolean }>`
  color: ${(props) => (props.isActive ? "#F4B647" : "#939292")};
`;
