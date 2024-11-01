import { Block, Text, Button, Img } from "../../style/ui";
import styled from "styled-components";
import {
  ProductCompany,
  ProductName,
  OriginalPrice,
  DiscountRate,
  DiscountedPrice,
} from "../../components/Product/ProductContainer";

interface ProductInfoProps {
  product: {
    thumbnail_url: string;
    name: string;
    company: string;
    discount_rate: number;
    discounted_price: number;
    price: number;
  };
  count: number;
  isProductInfoExpanded: boolean;
  toggleProductInfo: () => void;
}

export default function ProductInfo({
  product,
  count,
  isProductInfoExpanded,
  toggleProductInfo,
}: ProductInfoProps) {
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
              {" "}
              <ProductCompany color="Gray" style={{ fontSize: "15px" }}>
                {product.company}
              </ProductCompany>
              <Text.Menu style={{ fontSize: "20px" }}>{product.name}</Text.Menu>
              {/* 옵션 버튼과 수량 */}
              <Block.FlexBox alignItems="center" gap="10px">
                <OptionButton>옵션</OptionButton>
                <Text.Menu color="Gray">{count}개</Text.Menu>
              </Block.FlexBox>
              {/* 할인 정보 */}
              <Block.FlexBox gap="5px" alignItems="center">
                {product.discount_rate > 0 && (
                  <>
                    <OriginalPrice>
                      {Math.round(product.price).toLocaleString()}원
                    </OriginalPrice>
                    <DiscountRate>
                      {Math.round(product.discount_rate).toLocaleString()}% 할인
                    </DiscountRate>
                  </>
                )}
              </Block.FlexBox>
              {/* 할인된 가격 */}
              <DiscountedPrice>
                {Math.round(product.discounted_price).toLocaleString()}원
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

const OptionButton = styled.button`
  background-color: #f0f8ff; /* 연한 파란색 배경 */
  color: #6994ff; /* 파란색 텍스트 */
  border: 1px solid #f0f8ff; /* 파란색 테두리 */
  border-radius: 5px;
  padding: 2px 8px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
`;
