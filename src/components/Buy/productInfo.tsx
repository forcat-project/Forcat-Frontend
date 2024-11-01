import { Block, Text, Button, Img } from "../../style/ui";
import styled from "styled-components";
import {
  ProductCompany,
  ProductName,
  ProductPrice,
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
            <Block.FlexBox direction="column" gap="5px">
              <ProductCompany color="Gray">{product.company}</ProductCompany>
              <ProductName>{product.name}</ProductName>

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

              {/* 수량 */}
              <Text.TitleMenu200>{count}개</Text.TitleMenu200>
            </Block.FlexBox>
          </ProductInform>
        </Block.FlexBox>
      )}
    </>
  );
}

const ProductInform = styled(Block.FlexBox)`
  gap: 10px;
`;
