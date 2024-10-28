import { useState } from "react";
import { Block, Input, Text } from "../../style/ui";
import { IUser } from "../../interfaces/product";
import useFocus from "../../hooks/useFocus";

type Props = {
    setUserInfo: React.Dispatch<React.SetStateAction<IUser>>;
};

export default function InputPhoneNumber({ setUserInfo }: Props) {
    const [phone, setPhone] = useState("");

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
                placeholder="전화번호를 입력하세요"
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handlePhoneChange}
            />
        </Block.FlexBox>
    );
}
