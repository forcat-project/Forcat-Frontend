import { useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil";
import { Block, Input, Text } from "../../style/ui";
import { Warning, WarningDisabled } from "../../assets/svg";
import useFocus from "../../hooks/useFocus";

type Props = {
    userName: string;
    onChange: (newName: string) => void;
};

export default function InputUserName({ userName, onChange }: Props) {
    const [name, setName] = useState(userName);
    const [userInfo, setUserInfo] = useRecoilState(userState);

    const { isFocused, handleFocus, handleBlur } = useFocus();

    const handleInputNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        setName(newName);
        setUserInfo(prev => ({ ...prev, nickname: newName }));
        onChange(newName);
    };

    return (
        <>
            <Block.FlexBox>
                <Block.FlexBox direction="column" gap="10px">
                    <Text.FocusedMenu isFocused={isFocused}>이름</Text.FocusedMenu>
                    <Input.InfoBox
                        value={name}
                        placeholder="이름"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={handleInputNameChange}
                    />
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
