import { Block, Text, Section } from "../../styles/ui";

interface TotalProps {
    productTotalPrice: number;
    pointsToDeduct: number;
    finalPrice: number;
}

export default function Total({ productTotalPrice, pointsToDeduct, finalPrice }: TotalProps) {
    return (
        <Block.FlexBox padding="20px">
            <Section>
                {/* Title */}
                <Text.TitleMenu300>구매 정보</Text.TitleMenu300>

                {/* Product Price */}
                <Block.FlexBox justifyContent="space-between" style={{ marginTop: "20px" }}>
                    <Text.TitleMenu100 style={{ color: "#A6A9B8", marginRight: "400px" }}>상품 금액</Text.TitleMenu100>
                    <Text.TitleMenu200 style={{ color: "#333", marginLeft: "20px" }}>
                        {productTotalPrice.toLocaleString()}원
                    </Text.TitleMenu200>
                </Block.FlexBox>

                {/* Points Deduction */}
                <Block.FlexBox justifyContent="space-between" style={{ marginTop: "15px" }}>
                    <Text.TitleMenu100 style={{ color: "#A6A9B8", marginRight: "10px" }}>포인트</Text.TitleMenu100>
                    <Text.TitleMenu200 style={{ color: "#333", marginLeft: "20px" }}>
                        -{pointsToDeduct.toLocaleString()}원
                    </Text.TitleMenu200>
                </Block.FlexBox>

                {/* Shipping Cost */}
                <Block.FlexBox justifyContent="space-between" style={{ marginTop: "15px" }}>
                    <Text.TitleMenu100 style={{ color: "#A6A9B8", marginRight: "10px" }}>배송비</Text.TitleMenu100>
                    <Text.TitleMenu200 style={{ color: "#F4B647", fontWeight: "600" }}>무료</Text.TitleMenu200>
                </Block.FlexBox>

                {/* Divider */}
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
            </Section>
        </Block.FlexBox>
    );
}
