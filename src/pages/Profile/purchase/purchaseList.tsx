import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { orderAPI } from "../../../api/resourses/orders";
import { useUserId } from "../../../hooks/useUserId"; // useUserId hook import
import { Block, Text, Img } from "../../../style/ui";
import { IOrderProduct } from "../../../interfaces/product"; // Existing interface

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
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const userId = useUserId();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      orderAPI
        .getOrders(userId)
        .then((response) => {
          console.log("전체 응답 데이터:", response.data);
          const data = response.data;

          if (Array.isArray(data)) {
            const mappedOrders: Order[] = data.map((order: any) => ({
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
            }));

            setOrders(mappedOrders);
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

  const handleOrderDetailClick = (orderId: string) => {
    navigate(`/orders/${userId}/${orderId}/details`);
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <Block.FlexBox
      direction="column"
      padding="20px"
      style={{
        marginTop: "90px",
        overflowY: "auto",
        maxHeight: "calc(100vh - 160px)", // Adjusted height to account for header and navigator
        scrollbarWidth: "none", // Hides scrollbar for Firefox
        msOverflowStyle: "none", // Hides scrollbar for Internet Explorer and Edge
      }}
    >
      {orders.map((order, index) => (
        <div
          key={index}
          style={{
            marginBottom: "20px",
          }}
        >
          <Block.FlexBox
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            padding="16px"
          >
            <Text.Notice200 style={{ fontSize: "18px" }}>
              {new Date(order.order_date)
                .toLocaleDateString("ko-KR", {
                  year: "2-digit",
                  month: "2-digit",
                  day: "2-digit",
                })
                .replace(/\.$/, "")}
            </Text.Notice200>
            <Text.Notice200
              pointer
              color="Gray"
              onClick={() => handleOrderDetailClick(order.orderId)}
              style={{ cursor: "pointer" }}
            >
              주문 상세
            </Text.Notice200>
          </Block.FlexBox>
          <Text.Menu200
            style={{
              paddingLeft: "16px",
              marginBottom: "8px",
              color: "#666669",
            }}
          >
            {order.status === "completed" ? "구매확정" : "배송준비중"}
          </Text.Menu200>
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
                    {Number(item.price).toLocaleString()}원
                  </Text.TitleMenu200>
                </Block.FlexBox>
              </Block.FlexBox>
            ))}
          </Block.FlexBox>
        </div>
      ))}
    </Block.FlexBox>
  );
}
