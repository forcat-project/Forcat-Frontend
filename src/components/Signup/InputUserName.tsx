import { useState } from "react";
import { Block, Input, Text } from "../../style/ui";

type Props = {
    userName: string;
};

export default function InputUserName({ userName }: Props) {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    return (
        <>
            <Block.FlexBox direction="column" padding="97px 20px" gap="20px">
                <Text.TitleMenu300>보호자님의 이름을 알려주세요</Text.TitleMenu300>

                <Text.FocusedMenu isFocused={isFocused}>이름</Text.FocusedMenu>
                <Input.InfoBox value={userName} placeholder="이름" onFocus={handleFocus} onBlur={handleBlur} />

                <Block.FlexBox>
                    <Text.FocusedWarning isFocused={isFocused}>
                        이름은 수정이 불가하니 정확하게 입력해주세요
                    </Text.FocusedWarning>
                </Block.FlexBox>
            </Block.FlexBox>
        </>
    );
}
