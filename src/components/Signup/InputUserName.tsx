import { useState } from "react";
import { Block, Input, Text } from "../../style/ui";

type Props = {
    userName: string;
};

export default function InputUserName({ userName }: Props) {
    const [isFocused, setIsFocused] = useState(false);
    return (
        <>
            <Block.FlexBox direction="column">
                <Text.TitleMenu300>보호자님의 이름을 알려주세요</Text.TitleMenu300>

                <Text.FocusedMenu isFocused={isFocused}>이름</Text.FocusedMenu>
                <Input.InfoBox value={userName} placeholder="이름" />
                <Text.FocusedWarning isFocused={isFocused}>
                    이름은 수정이 불가하니 정확하게 입력해주세요
                </Text.FocusedWarning>
            </Block.FlexBox>
        </>
    );
}
