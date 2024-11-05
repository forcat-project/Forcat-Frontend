import { useEffect, useState } from "react";
import { orderAPI } from "../../../api/resourses/orders";
import { useUserId } from "../../../hooks/useUserId"; // useUserId 훅 import
import { Block, Text, Img } from "../../../style/ui";
import { IResponseData } from "../../../interfaces/product";
import { Order } from "../../../interfaces/product";

// 수정된 PurchaseList 컴포넌트
export default function PurchaseList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const userId = useUserId();
  console.log(userId);
  useEffect(() => {
    if (userId) {
      orderAPI
        .getOrders(userId)
        .then((response) => {
          // API 응답 구조에 맞게 수정
          const data = response.data as IResponseData; // 필요 시 타입 단언 사용
          setOrders(data.orders || []); // 적절한 경로 사용
          console.error(data.orders);

          setLoading(false);
        })
        .catch((error) => {
          console.error("주문 데이터를 가져오는 데 실패했습니다.", error);
          setLoading(false);
        });
    }
  }, [userId]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <Block.FlexBox
      direction="column"
      padding="20px"
      style={{ overflowY: "auto", maxHeight: "80vh" }}
    >
      {orders.map((order, index) => (
        <div key={index} style={{ marginBottom: "20px" }}>
          <Block.FlexBox
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            padding="0 0 10px 0"
          >
            <Text.TitleMenu200>{order.date}</Text.TitleMenu200>
            <Text.Notice200 pointer color="Gray">
              주문상세 &gt;
            </Text.Notice200>
          </Block.FlexBox>

          {order.items.map((item, itemIndex) => (
            <div
              key={itemIndex}
              style={{
                width: "calc(100% - 40px)",
                borderRadius: "8px",
                padding: "16px",
                margin: "10px auto",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#f8f8f8",
              }}
            >
              <Text.TitleMenu100
                color={
                  order.status === "구매확정"
                    ? "Green" // 테마 색상 키 문자열로 제공
                    : "Warning" // 테마 색상 키 문자열로 제공
                }
              >
                {order.status}
              </Text.TitleMenu100>
              <Block.FlexBox
                direction="row"
                alignItems="center"
                padding="10px 0"
              >
                <Img.AngledIcon
                  src={item.product_image}
                  width="60px"
                  height="60px"
                />
                <Block.FlexBox
                  direction="column"
                  margin="0 0 0 20px"
                  flexGrow="1"
                >
                  <Text.Menu>{item.product_name}</Text.Menu>
                  <Text.Mini color="Gray" margin="5px 0">
                    {item.quantity}개
                  </Text.Mini>
                  <Text.TitleMenu300>
                    {item.price.toLocaleString()}원
                  </Text.TitleMenu300>
                </Block.FlexBox>
              </Block.FlexBox>
            </div>
          ))}
        </div>
      ))}
    </Block.FlexBox>
  );
}
