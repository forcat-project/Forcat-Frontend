import { useState } from "react";
import { Block, Input, Text } from "../../style/ui";
import useFocus from "../../hooks/useFocus";
import { useRecoilState } from "recoil";
import { inputState, userState } from "../../recoil";
import { validatePhoneNumber } from "../../share/validator";

export default function InputPhoneNumber() {
    const [phone, setPhone] = useState("");

    const [, setUserInfo] = useRecoilState(userState);
    const [, setInputValue] = useRecoilState(inputState);

    const { isFocused, handleFocus, handleBlur } = useFocus();

    const [isValid, setIsValid] = useState(true);

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputPhoneNumber = e.target.value;
        setPhone(inputPhoneNumber);

        if (inputPhoneNumber === "") {
            setIsValid(true);
            setUserInfo(prev => ({
                ...prev,
                phone_number: "",
            }));
            setInputValue(prev => ({
                ...prev,
                phoneNumber: "",
            }));
        } else if (validatePhoneNumber(inputPhoneNumber)) {
            setIsValid(true);
            setUserInfo(prev => ({
                ...prev,
                phone_number: inputPhoneNumber,
            }));
            setInputValue(prev => ({
                ...prev,
                phoneNumber: inputPhoneNumber,
            }));
        } else {
            setIsValid(false);
        }
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
                type="text"
                maxLength={11}
            />
            <Block.AbsoluteBox width="550px" top="245px" style={{ display: "flex", justifyContent: "flex-end" }}>
                {!isValid && <Text.Warning color="Warning">올바른 전화번호 형식을 입력해주세요</Text.Warning>}
            </Block.AbsoluteBox>
        </Block.FlexBox>
    );
}
