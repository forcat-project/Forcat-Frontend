import { useRecoilState } from "recoil";
import useFocus from "../../hooks/useFocus";
import { Block, Input, Text } from "../../styles/ui";
import { inputState, userState } from "../../store/atoms";
import { useEffect } from "react";

export default function InputUserNickName() {
    const [userInfo, setUserInfo] = useRecoilState(userState);
    const { isFocused, handleFocus, handleBlur } = useFocus();
    const [, setInputData] = useRecoilState(inputState);

    const handleUserNickNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInfo(prev => ({ ...prev, nickname: e.target.value }));
        setInputData(prev => ({ ...prev, nickname: e.target.value }));
    };

    useEffect(() => {
        console.log("유저정보", userInfo);
    }, [userInfo]);

    return (
        <>
            <Block.FlexBox direction="column" gap="20px" margin="20px 0 0 0">
                <Text.FocusedMenu isFocused={isFocused}>닉네임</Text.FocusedMenu>
                <Input.InfoBox
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleUserNickNameChange}
                    placeholder="닉네임을 입력해주세요"
                />
            </Block.FlexBox>
        </>
    );
}
