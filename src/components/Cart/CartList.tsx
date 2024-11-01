import { Block, Button } from "../../style/ui";

type Props = {
    onPayment: () => void;
};

export function CartList({ onPayment }: Props) {
    return (
        <Block.FlexBox margin="100px 0 0 0">
            전체 선택
            <Block.AbsoluteBox
                width="599px"
                height="90px"
                bgColor="white"
                bottom="0"
                style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
                <Button.Confirm isDisabled={false} onClick={onPayment}>
                    결제하기 ( 원)
                </Button.Confirm>
            </Block.AbsoluteBox>
        </Block.FlexBox>
    );
}
