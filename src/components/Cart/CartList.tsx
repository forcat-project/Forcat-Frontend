import { useState, useEffect } from "react";
import {
  Checked,
  MinusGray,
  PlusGray,
  RemoveGray,
  Unchecked,
} from "../../assets/svg";
import { Block, Button, Img, Text } from "../../styles/ui";
import { IProduct } from "../../interfaces/product";
import { cartProductAPI } from "../../api/resourses/cartProducts";
import { useUserId } from "../../hooks/useUserId";
import { useNavigate } from "react-router-dom";

export function CartList() {
  const navigate = useNavigate();
  const userId = useUserId();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<
    { product: IProduct; quantity: number }[]
  >([]);
  const [isAllCheckButtonClick, setIsAllCheckButtonClick] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [quantity, setQuantity] = useState<{ [key: number]: number }>({});

  const handlePayment = () => {
    // 선택된 상품들의 정보를 구성
    const selectedItems: { product: IProduct; count: number }[] = products
      .filter((item: { product: IProduct; quantity: number }) =>
        selectedProducts.includes(item.product.product_id)
      )
      .map((item: { product: IProduct; quantity: number }) => ({
        product: {
          product_id: item.product.product_id,
          name: item.product.name,
          thumbnail_url: item.product.thumbnail_url,
          price: item.product.price,
          discounted_price: item.product.discounted_price ?? 0, // undefined일 경우 기본값 0 설정
          discount_rate: item.product.discount_rate,
          company: item.product.company,
        },
        count: quantity[item.product.product_id] || item.quantity,
      }));

    // state를 통해 /buy 페이지로 이동
    navigate("/buy", {
      state: {
        products: selectedItems,
      },
    });
  };

  // 초기 데이터 로드를 위한 useEffect
  useEffect(() => {
    const fetchCartProducts = async () => {
      if (userId === undefined) return; // Wait for userId to be determined
      if (userId === null) {
        setError("로그인이 필요합니다.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await cartProductAPI.getCartProducts(userId);
        setProducts(response.data);

        // Initialize quantities
        const initialQuantities = response.data.reduce(
          (
            acc: { [key: number]: number },
            item: { product: IProduct; quantity: number }
          ) => {
            acc[item.product.product_id] = item.quantity;
            return acc;
          },
          {}
        );
        setQuantity(initialQuantities);

        // 모든 상품을 선택된 상태로 초기화
        setSelectedProducts(
          response.data.map(
            (item: { product: IProduct; quantity: number }) =>
              item.product.product_id
          )
        );
        setIsAllCheckButtonClick(true);

        setIsLoading(false);
      } catch (err) {
        setError("장바구니 상품을 불러오는데 실패했습니다.");
        setIsLoading(false);
      }
    };

    fetchCartProducts();
  }, [userId]);

  // quantity 변경을 위한 별도의 useEffect
  useEffect(() => {
    const updateProducts = async () => {
      if (userId === undefined) return;
      if (userId === null) return;

      try {
        const response = await cartProductAPI.getCartProducts(userId);
        setProducts(response.data);
      } catch (err) {
        console.error("상품 수량 업데이트 실패:", err);
      }
    };

    updateProducts();
  }, [quantity, userId]);

  const groupedProducts = products.reduce((acc, item) => {
    const company = item.product.company || "기타";
    (acc[company] = acc[company] || []).push(item);
    return acc;
  }, {} as { [company: string]: { product: IProduct; quantity: number }[] });

  const handleProductCheckToggle = (productId: number) => {
    setSelectedProducts((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const handleAllCheckToggle = () => {
    if (isAllCheckButtonClick) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map((item) => item.product.product_id));
    }
    setIsAllCheckButtonClick((prev) => !prev);
  };

  const handleProductRemove = async (productId: number) => {
    if (!userId) return;

    try {
      await cartProductAPI.deleteCartProduct(userId, productId);
      setProducts((prev) =>
        prev.filter((item) => item.product.product_id !== productId)
      );
      setSelectedProducts((prev) => prev.filter((id) => id !== productId));
    } catch (err) {
      console.error("상품 삭제 실패:", err);
    }
  };

  const handleQuantityChange = async (productId: number, delta: number) => {
    if (!userId) return;

    const newQuantity = Math.max((quantity[productId] || 1) + delta, 1);

    try {
      await cartProductAPI.updateCartProductPartial(userId, productId, {
        quantity: newQuantity,
      });

      setQuantity((prev) => ({
        ...prev,
        [productId]: newQuantity,
      }));
    } catch (err) {
      console.error("수량 업데이트 실패:", err);
    }
  };

  const totalPrice = selectedProducts.reduce((total, productId) => {
    const item = products.find((p) => p.product.product_id === productId);
    const productQuantity = quantity[productId] || 1;
    const discountedPrice = item?.product.discounted_price ?? 0; // undefined일 경우 0으로 설정
    return total + discountedPrice * productQuantity;
  }, 0);

  if (isLoading) {
    return (
      <Block.FlexBox width="100%" height="100vh" justifyContent="center">
        <Text.TitleMenu200>로딩중...</Text.TitleMenu200>
      </Block.FlexBox>
    );
  }

  if (error) {
    return (
      <Block.FlexBox width="100%" height="100vh" justifyContent="center">
        <Text.TitleMenu200 color="Warning">{error}</Text.TitleMenu200>
      </Block.FlexBox>
    );
  }

  if (products.length === 0) {
    return (
      <Block.FlexBox
        width="100%"
        height="100vh"
        justifyContent="center"
        alignItems="center"
      >
        <Text.TitleMenu200>장바구니가 비어있습니다.</Text.TitleMenu200>
      </Block.FlexBox>
    );
  }

  return (
    <Block.FlexBox margin="230px 0 0 0" direction="column">
      <Block.FlexBox justifyContent="center">
        <Block.FlexBox
          width="90%"
          height="50px"
          alignItems="center"
          gap="10px"
          style={{ borderBottom: "2px solid #D9D9D9" }}
          onClick={handleAllCheckToggle}
        >
          {isAllCheckButtonClick ? (
            <Checked width={21} height={21} cursor="pointer" />
          ) : (
            <Unchecked width={21} height={21} cursor="pointer" />
          )}
          <Text.TitleMenu100 pointer>전체 선택</Text.TitleMenu100>
        </Block.FlexBox>
      </Block.FlexBox>

      <Block.FlexBox
        width="100%"
        height="100vh"
        padding="0 0 230px 0"
        direction="column"
        style={{
          overflowY: "scroll",
          scrollbarWidth: "none",
        }}
      >
        {Object.entries(groupedProducts).map(([company, items]) => (
          <Block.FlexBox
            padding="30px 40px"
            gap="30px"
            direction="column"
            key={company}
          >
            <Text.TitleMenu200>{company}</Text.TitleMenu200>
            {items.map(({ product, quantity }) => (
              <Block.FlexBox key={product.product_id}>
                <Block.FlexBox
                  width="23px"
                  height="23px"
                  onClick={() => handleProductCheckToggle(product.product_id)}
                >
                  {selectedProducts.includes(product.product_id) ? (
                    <Checked width={21} height={21} cursor="pointer" />
                  ) : (
                    <Unchecked width={21} height={21} cursor="pointer" />
                  )}
                </Block.FlexBox>

                <Block.FlexBox margin="0 0 0 20px" alignItems="flex-start">
                  <Img.AngledIcon
                    width="90px"
                    height="90px"
                    src={product.thumbnail_url}
                    alt={product.name}
                    style={{
                      borderRadius: "16px",
                    }}
                  />
                  <Block.FlexBox
                    width="300px"
                    margin="0 0 0 20px"
                    direction="column"
                    gap="10px"
                  >
                    <Text.TitleMenu100>{product.name}</Text.TitleMenu100>
                    <Block.FlexBox alignItems="flex-end">
                      <Block.FlexBox width="100px" direction="column" gap="3px">
                        {Number(product.discount_rate) > 0 ? (
                          <>
                            <Text.OriginalPrice>
                              {Math.floor(
                                Number(product.price)
                              ).toLocaleString()}
                              원
                            </Text.OriginalPrice>
                            <Text.TitleMenu200>
                              {Math.floor(
                                product.discounted_price ?? 0
                              ).toLocaleString()}{" "}
                              원
                            </Text.TitleMenu200>
                          </>
                        ) : (
                          <Text.TitleMenu200>
                            {Math.floor(
                              product.discounted_price ?? 0
                            ).toLocaleString()}
                            원
                          </Text.TitleMenu200>
                        )}
                      </Block.FlexBox>
                    </Block.FlexBox>
                    <Block.FlexBox
                      width="75px"
                      height="20px"
                      border="1px solid #E8E8E8"
                      borderRadius="30px"
                      justifyContent="space-around"
                      alignItems="center"
                    >
                      <MinusGray
                        cursor="pointer"
                        width={10}
                        height={21}
                        onClick={() =>
                          handleQuantityChange(product.product_id, -1)
                        }
                      />
                      <Text.Notice100>{quantity}</Text.Notice100>
                      <PlusGray
                        cursor="pointer"
                        width={10}
                        height={21}
                        onClick={() =>
                          handleQuantityChange(product.product_id, 1)
                        }
                      />
                    </Block.FlexBox>
                  </Block.FlexBox>
                </Block.FlexBox>

                <RemoveGray
                  width={15}
                  height={20}
                  cursor="pointer"
                  onClick={() => handleProductRemove(product.product_id)}
                />
              </Block.FlexBox>
            ))}
          </Block.FlexBox>
        ))}
      </Block.FlexBox>

      <Block.AbsoluteBox
        width="100%"
        bgColor="white"
        bottom="0"
        padding="20px"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button.Confirm
          isDisabled={selectedProducts.length === 0}
          onClick={handlePayment}
        >
          <Text.TitleMenu200 color="White">
            {totalPrice.toLocaleString()}원 결제하기 ({selectedProducts.length}
            개)
          </Text.TitleMenu200>
        </Button.Confirm>
      </Block.AbsoluteBox>
    </Block.FlexBox>
  );
}
