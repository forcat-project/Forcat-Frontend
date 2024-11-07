import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { orderAPI } from "../../../api/resourses/orders";
import { useUserId } from "../../../hooks/useUserId";
import { Block, Text, Img } from "../../../styles/ui";
import { IOrderProduct } from "../../../interfaces/product";

interface Order {
  orderId: string;
  order_date: string;
  original_amount: string;
  payment: number;
  payment_method: string;
  phone_number: string;
  points_used: string;
  shipping_address: string;
  shipping_address_detail: string;
  shipping_memo: string;
  shipping_status: string;
  status: string;
  total_amount: number;
  user: number;
  user_name: string;
  items: IOrderProduct[];
}

export default function PurchaseList() {
  const [ordersByDate, setOrdersByDate] = useState<{ [date: string]: Order[] }>(
    {}
  );
  const [loading, setLoading] = useState<boolean>(true);
  const userId = useUserId();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollPositionKey = "purchaseListScrollPosition";

  useEffect(() => {
    if (userId) {
      orderAPI
        .getOrders(userId)
        .then((response) => {
          console.log("전체 응답 데이터:", response.data);
          const data = response.data;

          if (Array.isArray(data)) {
            const groupedOrders: { [date: string]: Order[] } = {};

            data.forEach((order: any) => {
              const orderDate = new Date(order.order_date)
                .toLocaleDateString("ko-KR", {
                  year: "2-digit",
                  month: "2-digit",
                  day: "2-digit",
                })
                .replace(/\.$/, "");

              if (!groupedOrders[orderDate]) groupedOrders[orderDate] = [];
              groupedOrders[orderDate].push({
                orderId: order.id,
                order_date: order.order_date,
                original_amount: order.original_amount,
                payment: order.payment,
                payment_method: order.payment_method,
                phone_number: order.phone_number,
                points_used: order.points_used,
                shipping_address: order.shipping_address,
                shipping_address_detail: order.shipping_address_detail,
                shipping_memo: order.shipping_memo,
                shipping_status: order.shipping_status,
                status: order.status,
                total_amount: Number(order.total_amount),
                user: order.user,
                user_name: order.user_name,
                items: order.products.map((product: any) => ({
                  product_id: product.product_id,
                  product_name: product.product_name,
                  quantity: product.quantity,
                  price: Number(product.price),
                  product_image: product.product_image,
                  product_company: product.product_company,
                  discount_rate: Number(product.discount_rate),
                })),
              });
            });

            setOrdersByDate(groupedOrders);
          } else {
            console.warn("API 응답이 배열이 아닙니다.");
          }

          setLoading(false);
        })
        .catch((error) => {
          console.error("주문 데이터를 가져오는 데 실패했습니다.", error);
          setLoading(false);
        });
    }
  }, [userId]);

  const handleClick = (productId: number) => {
    if (containerRef.current) {
      const currentScrollPosition = containerRef.current.scrollTop;
      sessionStorage.setItem(
        scrollPositionKey,
        currentScrollPosition.toString()
      );
    }
    navigate(`/market/${productId}`);
  };

  if (loading) {
    return (
      <Block.FlexBox width="100%" height="100vh" bgColor="white">
        로딩 중...
      </Block.FlexBox>
    );
  }

  return (
    <Block.FlexBox
      ref={containerRef}
      width="100%"
      height="100vh"
      direction="column"
      padding="20px"
      style={{
        marginTop: "20px",
        overflowY: "auto",
        maxHeight: "calc(100vh - 160px)",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      {Object.keys(ordersByDate).map((date) => (
        <div key={date} style={{ marginBottom: "20px" }}>
          <Text.Notice200 style={{ fontSize: "18px", marginBottom: "10px" }}>
            {date}
          </Text.Notice200>
          {ordersByDate[date].map((order) => (
            <div key={order.orderId} style={{ marginBottom: "20px" }}>
              <Block.FlexBox
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                padding="16px"
              >
                <Text.TitleMenu200
                  style={{
                    paddingLeft: "16px",
                    marginBottom: "8px",
                    // color: "#666669",
                    color: order.status === "주문 취소" ? "#fa7586" : "#939292",
                  }}
                >
                  {order.status === "completed"
                    ? "구매확정"
                    : order.status === "주문 취소"
                    ? "주문취소"
                    : "결제완료"}
                </Text.TitleMenu200>

                <Text.Notice200
                  pointer
                  color="Gray"
                  onClick={() =>
                    navigate(`/orders/${userId}/${order.orderId}/details`)
                  }
                  style={{ cursor: "pointer" }}
                >
                  주문 상세 {">"}
                </Text.Notice200>
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
                {order.items.map((item, itemIndex) => (
                  <Block.FlexBox
                    key={itemIndex}
                    direction="row"
                    alignItems="center"
                    padding="16px"
                    onClick={() => handleClick(item.product_id)}
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
          ))}
        </div>
      ))}
    </Block.FlexBox>
  );
}
