import { Block, Text, Button, Img } from "../../style/ui";
import styled from "styled-components";
import {
  ProductCompany,
  OriginalPrice,
  DiscountRate,
  DiscountedPrice,
} from "../../components/Product/ProductContainer";
import { ProductInfoProps } from "../../interfaces/info";

export default function ProductInfo({
  product,
  count,
  isProductInfoExpanded,
  toggleProductInfo,
}: ProductInfoProps) {
  // Calculate the original price before the discount
  const calculatedOriginalPrice = Math.round(
    product.discounted_price * (1 + product.discount_rate / 100)
  );

  return (
    <>
      {/* 주문 상품 */}
      <Block.FlexBox padding="20px" justifyContent="space-between">
        <Text.TitleMenu300>주문 상품</Text.TitleMenu300>
        <Button.ToggleButton onClick={toggleProductInfo}>
          {isProductInfoExpanded ? "⌃" : "⌄"}
        </Button.ToggleButton>
      </Block.FlexBox>

      {isProductInfoExpanded && (
        <Block.FlexBox padding="20px">
          <ProductInform>
            <Img.BuyImg src={product.thumbnail_url} alt={product.name} />
            <Block.FlexBox direction="column" gap="10px">
              <ProductCompany color="Gray" style={{ fontSize: "15px" }}>
                {product.company}
              </ProductCompany>
              <Text.Menu style={{ fontSize: "18px" }}>{product.name}</Text.Menu>

              {/* 옵션 버튼과 수량 */}
              <Block.FlexBox alignItems="center" gap="10px">
                <Button.OptionButton>옵션</Button.OptionButton>
                <Text.Menu color="Gray">{count}개</Text.Menu>
              </Block.FlexBox>

              {/* 할인 정보 */}
              <Block.FlexBox gap="5px" alignItems="center">
                {product.discount_rate > 0 && (
                  <>
                    <OriginalPrice>
                      {(calculatedOriginalPrice * count).toLocaleString()}원
                    </OriginalPrice>
                    <DiscountRate>
                      {Math.round(product.discount_rate).toLocaleString()}% 할인
                    </DiscountRate>
                  </>
                )}
              </Block.FlexBox>

              {/* 할인된 가격 계산 */}
              <DiscountedPrice>
                {(
                  Math.round(product.discounted_price) * count
                ).toLocaleString()}
                원
              </DiscountedPrice>
            </Block.FlexBox>
          </ProductInform>
        </Block.FlexBox>
      )}
    </>
  );
}

// Styled Components
const ProductInform = styled(Block.FlexBox)`
  gap: 15px; /* 여백을 15px로 늘림 */
`;
