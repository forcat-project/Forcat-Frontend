import { useRecoilState } from "recoil";
import { Block, Button, Text } from "../../styles/ui";
import { catState, inputState } from "../../store/atoms";
import { useState } from "react";

export default function InputCatIsNeutered() {
    const [, setCatInfo] = useRecoilState(catState);
    const [isNeutered, setIsNeutered] = useState(true);
    const [, setInputData] = useRecoilState(inputState);
    const [isFocused, setIsFocused] = useState(false);

    const handleIsNeuteredClick = (isNeutered: boolean) => {
        setIsNeutered(isNeutered);
        setCatInfo(prev => ({
            ...prev,
            is_neutered: isNeutered ? 0 : 1,
        }));
        setInputData(prev => ({
            ...prev,
            isNeutered: isNeutered ? 0 : 1,
        }));
        setIsFocused(true);
    };

    return (
        <Block.FlexBox direction="column" gap="20px">
            <Text.FocusedMenu isFocused={isFocused}>중성화</Text.FocusedMenu>

            <Block.FlexBox justifyContent="space-between" gap="10px">
                <Button.SelectInput
                    tabIndex={0}
                    onClick={() => handleIsNeuteredClick(true)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    isActive={isNeutered}
                >
                    했어요
                </Button.SelectInput>
                <Button.SelectInput
                    tabIndex={0}
                    onClick={() => handleIsNeuteredClick(false)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    isActive={!isNeutered}
                >
                    안 했어요
                </Button.SelectInput>
            </Block.FlexBox>
        </Block.FlexBox>
    );
}
