import useFocus from "../../hooks/useFocus";
import { Block, Input, Text } from "../../styles/ui";
import { useState, useEffect } from "react";
import { validateMonth, validateDay } from "../../util/validator";
import { useRecoilState } from "recoil";
import { catState, inputState } from "../../store/atoms";

export default function InputBirthDate() {
    const [catBirthYear, setCatBirthYear] = useState<string>("");
    const [catBirthMonth, setCatBirthMonth] = useState<string>("");
    const [catBirthDay, setCatBirthDay] = useState<string>("");
    const [, setCatInfo] = useRecoilState(catState);
    const [, setInputData] = useRecoilState(inputState);

    const { isFocused, handleFocus, handleBlur } = useFocus();

    const handleCatBirthYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (/^\d*$/.test(value) && value.length <= 4) {
            setCatBirthYear(value);
        }
    };

    const handleCatBirthMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (value === "" || (value.length <= 2 && validateMonth(value))) {
            setCatBirthMonth(value);
        }
    };

    const handleCatBirthDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (value === "" || (value.length <= 2 && validateDay(value, catBirthMonth, catBirthYear))) {
            setCatBirthDay(value);
        }
    };

    useEffect(() => {
        if (catBirthYear && catBirthMonth && catBirthDay) {
            const birthDate = `${catBirthYear}-${String(catBirthMonth).padStart(2, "0")}-${String(catBirthDay).padStart(
                2,
                "0"
            )}`;
            setCatInfo(prev => ({ ...prev, birth_date: birthDate }));
            setInputData(prev => ({ ...prev, birthDate }));
            console.log(`Saved Birth Date: ${birthDate}`);
        } else {
            setCatInfo(prev => ({ ...prev, birth_date: "" }));
            setInputData(prev => ({ ...prev, birthDate: "" }));
        }
    }, [catBirthYear, catBirthMonth, catBirthDay]);

    return (
        <Block.FlexBox direction="column" gap="20px">
            <Text.FocusedMenu isFocused={isFocused}>생년월일</Text.FocusedMenu>
            <Block.FlexBox width="100%" justifyContent="space-between" gap="10px">
                <Input.BirthBox
                    type="text"
                    value={catBirthYear}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleCatBirthYearChange}
                    placeholder="년도"
                />
                <Input.BirthBox
                    type="text"
                    value={catBirthMonth}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleCatBirthMonthChange}
                    placeholder="월"
                />
                <Input.BirthBox
                    type="text"
                    value={catBirthDay}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleCatBirthDayChange}
                    placeholder="일"
                />
            </Block.FlexBox>
        </Block.FlexBox>
    );
}
