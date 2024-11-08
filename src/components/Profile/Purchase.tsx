import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { orderAPI } from "../../api/resourses/orders";
import { useUserId } from "../../hooks/useUserId";
import { Block, Text, Img } from "../../styles/ui";
import { IOrderProduct } from "../../interfaces/product"; // Existing interface
import styled from "styled-components";
interface Order {
  orderId: string;
  order_date: string;
  status: string;
  total_amount: number;
  items: IOrderProduct[];
}

export default function Purchase() {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const userId = useUserId();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoading(true); // 로딩 시작

    if (userId) {
      orderAPI
        .getOrders(userId)
        .then((response) => {
          const data = response.data;
          if (Array.isArray(data) && data.length > 0) {
            const firstOrder = {
              orderId: data[0].id,
              order_date: data[0].order_date,
              status: data[0].status,
              total_amount: Number(data[0].total_amount),
              items: data[0].products.map((product: any) => ({
                product_id: product.product_id,
                product_name: product.product_name,
                quantity: product.quantity,
                price: Number(product.price),
                product_image: product.product_image,
                product_company: product.product_company,
                discount_rate: Number(product.discount_rate),
              })),
            };
            setOrder(firstOrder);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch order data:", error);
          setLoading(false);
        });
    }
  }, [userId]);
  // 로딩 중일 때 로딩 상태 표시
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!order) {
    return (
      <Block.FlexBox direction="column" padding="20px">
        <Text.TitleMenu200>구매/취소내역</Text.TitleMenu200>
        <ContentWrapper>
          <StyledImage src="/no_order.jpg" alt="고양이 없음 이미지" />
          <Text.TitleMenu200 style={{ color: "#80818C", marginBottom: "10px" }}>
            구매/취소내역이 비어있습니다
          </Text.TitleMenu200>
        </ContentWrapper>
      </Block.FlexBox>
    );
  }

  return (
    <Block.FlexBox direction="column" padding="20px" ref={containerRef}>
      <Block.FlexBox
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        padding="10px"
      >
        <Text.TitleMenu200>구매/취소내역</Text.TitleMenu200>
        <Text.Notice200
          pointer
          color="Gray"
          onClick={() => navigate("/purchaselist")}
        >
          주문상세 {`>`}
        </Text.Notice200>
      </Block.FlexBox>

      <div
        style={{
          borderRadius: "8px",
          margin: "10px 0",
          border: "1px solid #e8e9eb",
        }}
      >
        <Text.Menu200
          style={{
            paddingLeft: "16px",
            marginTop: "20px",
            color: "#666669",
          }}
        >
          {order.status === "completed" ? "구매확정" : "배송준비중"}
        </Text.Menu200>
        <div
          style={{
            height: "1px",
            backgroundColor: "#e8e9eb",
            margin: "10px 0",
            marginTop: "20px",
          }}
        ></div>
        <Block.FlexBox direction="column" alignItems="center" padding="16px">
          {order.items.map((item, itemIndex) => (
            <Block.FlexBox
              key={itemIndex}
              direction="row"
              alignItems="center"
              padding="16px"
              onClick={() =>
                navigate(`/orders/${userId}/${order.orderId}/details`)
              }
              style={{ cursor: "pointer" }}
            >
              <Img.AngledIcon
                src={item.product_image}
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
                  {item.product_company}
                </Text.Notice200>
                <Text.Menu
                  margin="5px 0"
                  style={{
                    color: "#161616",
                    marginBottom: "5px",
                    fontSize: "13px",
                  }}
                >
                  {item.product_name}
                </Text.Menu>
                <Text.Menu
                  color="Gray"
                  style={{
                    marginBottom: "10px",
                    fontSize: "13px",
                  }}
                >
                  {item.quantity}개
                </Text.Menu>
                <Text.TitleMenu200>
                  {Math.round(order.total_amount).toLocaleString()}원
                </Text.TitleMenu200>
              </Block.FlexBox>
            </Block.FlexBox>
          ))}
        </Block.FlexBox>
      </div>
    </Block.FlexBox>
  );
}

// Styled Components for the empty state
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const StyledImage = styled.img`
  width: 100%;
  max-width: 300px;
  margin-bottom: 20px;
  border-radius: 8px;
`;
