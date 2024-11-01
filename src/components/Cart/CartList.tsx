import { useState } from "react";
import { Checked, Unchecked } from "../../assets/svg";
import { Block, Button, Text } from "../../style/ui";

type Product = {
    product_id: number;
    name: string;
    company: string;
    price: string;
    discount_rate: string;
    discounted_price: number;
    thumbnail_url: string;
    remain_count: number;
};

type Props = {
    onPayment: () => void;
    dummyProducts: Product[];
};

export function CartList({ onPayment, dummyProducts }: Props) {
    const [isAllCheckButtonClick, setIsAllCheckButtonClick] = useState(false);

    return (
        <Block.FlexBox margin="110px 0 0 0">
            <Block.FlexBox justifyContent="center">
                <Block.FlexBox
                    width="90%"
                    height="50px"
                    alignItems="center"
                    gap="10px"
                    style={{ borderBottom: "2px solid #D9D9D9" }}
                >
                    {isAllCheckButtonClick ? (
                        <Checked
                            cursor="pointer"
                            onClick={() => setIsAllCheckButtonClick(false)}
                            width={21}
                            height={21}
                        />
                    ) : (
                        <Unchecked
                            cursor="pointer"
                            onClick={() => setIsAllCheckButtonClick(true)}
                            width={21}
                            height={21}
                        />
                    )}

                    <Text.Menu200>전체 선택</Text.Menu200>
                </Block.FlexBox>
            </Block.FlexBox>
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
