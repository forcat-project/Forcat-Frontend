import { useRecoilState } from "recoil";
import { Block, Button, Text } from "../../style/ui";
import { catState } from "../../recoil";
import { useState } from "react";

export default function InputCatGender() {
    const [catInfo, setCatInfo] = useRecoilState(catState);
    const [isFemaleCat, setIsFemaleCat] = useState(true);
    const [isFocused, setIsFocused] = useState(false);

    const handleGenderClick = (isFemale: boolean) => {
        setIsFemaleCat(isFemale);
        setCatInfo(prev => ({
            ...prev,
            gender: isFemale ? 0 : 1,
        }));
        setIsFocused(true);
    };

    return (
        <Block.FlexBox direction="column" gap="20px">
            <Text.FocusedMenu isFocused={isFocused}>성별</Text.FocusedMenu>

            <Block.FlexBox justifyContent="space-between">
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
