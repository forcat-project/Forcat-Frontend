import { Block, Text, Button, Img } from "../../styles/ui";
import styled from "styled-components";
import { DiscountedPrice } from "../Product/ProductContainer";
import { ProductInfoProps } from "../../interfaces/info";

export default function ProductInfo({ products, isProductInfoExpanded, toggleProductInfo }: ProductInfoProps) {
    return (
        <>
            {/* 주문 상품 */}
            <Block.FlexBox
                padding="20px"
                justifyContent="space-between"
                style={{ marginTop: "20px" }} // 여백을 추가하여 더 아래로 내림
            >
                <Text.TitleMenu300>주문 상품</Text.TitleMenu300>
                <Button.ToggleButton onClick={toggleProductInfo}>
                    {isProductInfoExpanded ? "⌃" : "⌄"}
                </Button.ToggleButton>
            </Block.FlexBox>

            {isProductInfoExpanded && products && products.length > 0 && (
                <Block.FlexBox direction="column" padding="20px" gap="35px">
                    {products.map((product, index) => {
                        // 할인 전 가격 계산
                        const calculatedOriginalPrice = Math.round(
                            product.discounted_price * (1 + product.discount_rate / 100)
                        );

                        return (
                            <ProductInform key={index}>
                                <Img.BuyImg src={product.thumbnail_url} alt={product.name} />
                                <Block.FlexBox direction="column" gap="5px">
                                    <Text.Menu200>{product.name}</Text.Menu200>

                                    {/* 옵션 버튼과 수량 */}
                                    <Block.FlexBox alignItems="center" gap="10px">
                                        <Button.OptionButton>옵션</Button.OptionButton>
                                        <Text.Menu color="Gray">{product.count}개</Text.Menu>
                                    </Block.FlexBox>

                                    {/* 할인 정보 */}
                                    <Block.FlexBox gap="10px" alignItems="center">
                                        {product.discount_rate > 0 && (
                                            <>
                                                <Text.OriginalPrice>
                                                    {(calculatedOriginalPrice * product.count).toLocaleString()}원
                                                </Text.OriginalPrice>

                                                <Text.Discount>
                                                    {Math.round(product.discount_rate).toLocaleString()}% 할인
                                                </Text.Discount>
                                            </>
                                        )}
                                    </Block.FlexBox>

                                    {/* 할인된 가격 */}
                                    <DiscountedPrice>
                                        {(Math.round(product.discounted_price) * product.count).toLocaleString()}원
                                    </DiscountedPrice>
                                </Block.FlexBox>
                            </ProductInform>
                        );
                    })}
                </Block.FlexBox>
            )}

            {/* 데이터가 없을 경우 처리 */}
            {isProductInfoExpanded && (!products || products.length === 0) && (
                <Block.FlexBox padding="20px" justifyContent="center">
                    <Text.Menu color="Gray">상품 정보가 없습니다.</Text.Menu>
                </Block.FlexBox>
            )}
        </>
    );
}

// 스타일 컴포넌트
const ProductInform = styled(Block.FlexBox)`
    gap: 15px; /* 여백을 15px로 설정 */
`;
