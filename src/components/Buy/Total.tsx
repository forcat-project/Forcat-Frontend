import { Block, Text, Section } from "../../styles/ui";

interface TotalProps {
    productTotalPrice: number;
    pointsToDeduct: number;
    finalPrice: number;
}

export default function Total({ productTotalPrice, pointsToDeduct, finalPrice }: TotalProps) {
    return (
        <Block.FlexBox direction="column" padding="20px" justifyContent="space-between">
            {/* Title */}
            <Text.TitleMenu300>구매 정보</Text.TitleMenu300>

            <Block.FlexBox margin="15px 0 " justifyContent="space-between">
                <Block.FlexBox direction="column" gap="10px">
                    <Text.TitleMenu100 color="Gray400">상품 금액</Text.TitleMenu100>
                    <Text.TitleMenu100 color="Gray400">포인트</Text.TitleMenu100>
                    <Text.TitleMenu100 color="Gray400">배송비</Text.TitleMenu100>
                </Block.FlexBox>

                <Block.FlexBox direction="column" alignItems="flex-end" gap="10px">
                    <Text.TitleMenu200>{productTotalPrice.toLocaleString()}원</Text.TitleMenu200>
                    <Text.TitleMenu200>- {pointsToDeduct.toLocaleString()}원</Text.TitleMenu200>
                    <Text.TitleMenu200 color="Yellow">무료</Text.TitleMenu200>
                </Block.FlexBox>
            </Block.FlexBox>

            <div
                style={{
                    height: "1px",
                    backgroundColor: "#E0E0E0",
                    margin: "15px 0",
                }}
            ></div>

            {/* Final Price */}
            <Block.FlexBox justifyContent="space-between">
                <Text.TitleMenu200 style={{ fontWeight: "bold" }}>총 결제 금액</Text.TitleMenu200>
                <Text.TitleMenu200 style={{ color: "#F4B647", fontWeight: "bold" }}>
                    {finalPrice.toLocaleString()}원
                </Text.TitleMenu200>
            </Block.FlexBox>
        </Block.FlexBox>
    );
}
