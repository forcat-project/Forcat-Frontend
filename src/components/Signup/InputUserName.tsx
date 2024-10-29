import { useRecoilState } from "recoil";
import { userState } from "../../recoil";
import { Block, Input, Text } from "../../style/ui";
import { Warning, WarningDisabled } from "../../assets/svg";
import useFocus from "../../hooks/useFocus";

export default function InputUserName() {
    const [userInfo, setUserInfo] = useRecoilState(userState);

    const { isFocused, handleFocus, handleBlur } = useFocus();

    const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInfo(prev => ({ ...prev, username: e.target.value }));
    };

    return (
        <>
            <Block.FlexBox direction="column" gap="10px">
                <Text.FocusedMenu isFocused={isFocused}>이름</Text.FocusedMenu>
                <Input.InfoBox
                    value={userInfo.username}
                    placeholder="이름을 입력해주세요"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleUserNameChange}
                />
                <Block.FlexBox alignItems="center" gap="10px">
                    {isFocused ? <Warning width={16} /> : <WarningDisabled width={16} />}
                    <Text.FocusedWarning isFocused={isFocused}>
                        이름은 수정이 불가하니 정확하게 입력해주세요
                    </Text.FocusedWarning>
                </Block.FlexBox>
            </Block.FlexBox>
        </>
    );
}
