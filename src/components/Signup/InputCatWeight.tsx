import { useRecoilState } from "recoil";
import useFocus from "../../hooks/useFocus";
import { validateWeightDecimal, validateWeightWhole } from "../../util/validator";
import { Block, Input, Text } from "../../styles/ui";
import { useEffect, useState } from "react";
import { catState, inputState } from "../../store/atoms";

export default function InputCatWeight() {
    const [weight, setWeight] = useState({ whole: "", decimal: "", unit: "kg" });
    const { isFocused, handleFocus, handleBlur } = useFocus();

    const [, setCatInfo] = useRecoilState(catState);
    const [, setInputData] = useRecoilState(inputState);

    useEffect(() => {
        if (weight.whole) {
            const fullWeight = `${weight.whole}${weight.decimal ? "." + weight.decimal : ""}`;
            setCatInfo(prev => ({ ...prev, weight: fullWeight }));
            setInputData(prev => ({ ...prev, catWeight: fullWeight }));
        } else {
            setCatInfo(prev => ({ ...prev, weight: "" }));
            setInputData(prev => ({ ...prev, catWeight: "" }));
        }
    }, [weight.whole, weight.decimal]);

    const handleWholeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (validateWeightWhole(value)) {
            setWeight(prev => ({
                ...prev,
                whole: value,
            }));
        }
    };

    const handleDecimalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (validateWeightDecimal(value)) {
            setWeight(prev => ({
                ...prev,
                decimal: value,
            }));
        }
    };

    return (
        <>
            <Block.FlexBox direction="column" gap="20px">
                <Text.FocusedMenu isFocused={isFocused}>몸무게(kg)</Text.FocusedMenu>

                <Block.FlexBox justifyContent="space-between" gap="4px" alignItems="flex-end">
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
                        placeholder="00"
                    />
                </Block.FlexBox>
            </Block.FlexBox>
        </>
    );
}
