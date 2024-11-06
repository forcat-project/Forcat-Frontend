import { useRecoilState } from "recoil";
import { Block, Button, Text } from "../../styles/ui";
import { useState } from "react";
import { catState, inputState } from "../../store/atoms";

export default function InputCatGender() {
    const [, setCatInfo] = useRecoilState(catState);
    const [isFemaleCat, setIsFemaleCat] = useState(true);
    const [isFocused, setIsFocused] = useState(false);
    const [, setInputData] = useRecoilState(inputState);

    const handleGenderClick = (isFemale: boolean) => {
        setIsFemaleCat(isFemale);
        setCatInfo(prev => ({
            ...prev,
            gender: isFemale ? 0 : 1,
        }));
        setInputData(prev => ({
            ...prev,
            catGender: isFemale ? 0 : 1,
        }));

        setIsFocused(true);
    };

    return (
        <Block.FlexBox direction="column" gap="20px">
            <Text.FocusedMenu isFocused={isFocused}>성별</Text.FocusedMenu>

            <Block.FlexBox justifyContent="space-between" gap="10px">
                <Button.SelectInput
                    tabIndex={0}
                    onClick={() => handleGenderClick(true)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    isActive={isFemaleCat}
                >
                    여아
                </Button.SelectInput>
                <Button.SelectInput
                    tabIndex={0}
                    onClick={() => handleGenderClick(false)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    isActive={!isFemaleCat}
                >
                    남아
                </Button.SelectInput>
            </Block.FlexBox>
        </Block.FlexBox>
    );
}
