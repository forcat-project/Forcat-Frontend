import { useState } from "react";
import { Block, Input, Text } from "../../style/ui";
import { Warning, WarningDisabled } from "../../assets/svg";

type Props = {
    userName: string;
};

export default function InputUserName({ userName }: Props) {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    return (
        <>
            <Block.FlexBox direction="column" padding="97px 20px" gap="60px">
                <Block.FlexBox direction="column" gap="10px">
                    <Text.TitleMenu300>보호자님의</Text.TitleMenu300>
                    <Text.TitleMenu300>이름을 알려주세요</Text.TitleMenu300>
                </Block.FlexBox>
                <Block.FlexBox direction="column" gap="10px">
                    <Text.FocusedMenu isFocused={isFocused}>이름</Text.FocusedMenu>
                    <Input.InfoBox value={userName} placeholder="이름" onFocus={handleFocus} onBlur={handleBlur} />
                    <Block.FlexBox alignItems="center" gap="10px">
                        {isFocused ? <Warning width={16} /> : <WarningDisabled width={16} />}

                        <Text.FocusedWarning isFocused={isFocused}>
                            이름은 수정이 불가하니 정확하게 입력해주세요
                        </Text.FocusedWarning>
                    </Block.FlexBox>
                </Block.FlexBox>
            </Block.FlexBox>
        </>
    );
}
