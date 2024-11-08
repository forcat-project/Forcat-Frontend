import { Block, Button, Text } from "../../styles/ui";

type Props = {
    onContinueShopping: () => void;
};

export function CartEmpty({ onContinueShopping }: Props) {
    return (
        <Block.FlexBox bgColor="#F9F9F9" alignItems="center">
            <Block.FlexBox
                width="100%"
                height="100vh"
                direction="column"
                justifyContent="center"
                alignItems="center"
                gap="12px"
            >
                <Text.TitleMenu200> 장바구니에 담은 상품이 없어요</Text.TitleMenu200>
                <Text.Notice100>상품을 추가해보세요!</Text.Notice100>
            </Block.FlexBox>
            <Block.AbsoluteBox
                width="100%"
                height="90px"
                padding="0 20px"
                bgColor="white"
                bottom="0"
                zIndex="20"
                style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
                <Button.Confirm isDisabled={false} onClick={onContinueShopping}>
                    쇼핑 계속하기
                </Button.Confirm>
            </Block.AbsoluteBox>
        </Block.FlexBox>
    );
}
