// import { useRecoilState } from "recoil";
import useFocus from "../../hooks/useFocus";
import { Block, Input, Text } from "../../style/ui";
// import { catState } from "../../recoil";
import { useState } from "react";

export default function InputCatWeight() {
    const [weight, setWeight] = useState({ whole: "", decimal: "", unit: "kg" });

    // const [catInfo, setCatInfo] = useRecoilState(catState);
    const { isFocused, handleFocus, handleBlur } = useFocus();

    const handleWholeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWeight(prev => ({
            ...prev,
            whole: event.target.value,
        }));
    };

    const handleDecimalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWeight(prev => ({
            ...prev,
            decimal: event.target.value,
        }));
    };

    return (
        <>
            <Block.FlexBox direction="column" gap="20px">
                <Text.FocusedMenu isFocused={isFocused}>몸무게(kg)</Text.FocusedMenu>

                <Block.FlexBox justifyContent="space-between" alignItems="flex-end">
                    <Input.WeightBox
                        value={weight.whole}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={handleWholeChange}
                        placeholder="예) 23"
                    />
                    <Text.TitleMenu200>.</Text.TitleMenu200>
                    <Input.WeightBox
                        value={weight.decimal}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={handleDecimalChange}
                        placeholder="소수점 아래 숫자를 입력해주세요"
                    />
                </Block.FlexBox>
            </Block.FlexBox>
        </>
    );
}
