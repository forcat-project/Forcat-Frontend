import { useState } from "react";
import { Block, Input, Text } from "../../styles/ui";
import useFocus from "../../hooks/useFocus";
import { useRecoilState } from "recoil";
import { inputState, userState } from "../../store/atoms";
import { validatePhoneNumber } from "../../util/validator";

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
        <Block.FlexBox width="100%" direction="column" gap="10px">
            <Block.FlexBox width="100%" alignItems="center" justifyContent="space-between">
                <Text.FocusedMenu isFocused={isFocused}>휴대폰 번호</Text.FocusedMenu>
                <Block.FlexBox width="200px">
                    {!isValid && <Text.Warning color="Warning">올바른 전화번호 형식을 입력해주세요</Text.Warning>}
                </Block.FlexBox>
            </Block.FlexBox>
            <Input.InfoBox
                value={phone}
                placeholder="전화번호를 입력해주세요"
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handlePhoneChange}
                type="text"
                maxLength={11}
            />
        </Block.FlexBox>
    );
}
