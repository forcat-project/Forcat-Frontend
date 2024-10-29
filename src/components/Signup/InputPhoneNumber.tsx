import { useState } from "react";
import { Block, Input, Text } from "../../style/ui";
import useFocus from "../../hooks/useFocus";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil";

export default function InputPhoneNumber() {
    const [phone, setPhone] = useState("");
    const [userInfo, setUserInfo] = useRecoilState(userState);

    const { isFocused, handleFocus, handleBlur } = useFocus();

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputPhoneNumber = e.target.value;
        setPhone(inputPhoneNumber);
        setUserInfo(prev => ({
            ...prev,
            phone_number: inputPhoneNumber,
        }));
    };

    return (
        <Block.FlexBox direction="column" gap="10px">
            <Text.FocusedMenu isFocused={isFocused}>휴대폰 번호</Text.FocusedMenu>
            <Input.InfoBox
                value={phone}
                placeholder="전화번호를 입력해주세요"
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handlePhoneChange}
            />
        </Block.FlexBox>
    );
}
