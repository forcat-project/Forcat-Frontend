// import { useRecoilState } from "recoil";
import useFocus from "../../hooks/useFocus";
import { Block, Input, Text } from "../../style/ui";
// import { catState } from "../../recoil";
import { useState } from "react";

export default function InputBirthDate() {
  const [catBirthYear] = useState<number>();
  const [catBirthMonth] = useState<number>();
  const [catBirthDay] = useState<number>();

  //   const [catInfo, setCatInfo] = useRecoilState(catState);

  const { isFocused, handleFocus, handleBlur } = useFocus();
  
  const handleCatBirthYearChange = () => {
    console.log(catBirthYear);
  };
  const handleCatBirthMonthChange = () => {
    console.log(catBirthMonth);
  };
  const handleCatBirthDayChange = () => {
    console.log(catBirthDay);
  };

    return (
        <>
            <Block.FlexBox direction="column" gap="20px">
                <Text.FocusedMenu isFocused={isFocused}>생년월일</Text.FocusedMenu>

                <Block.FlexBox justifyContent="space-between">
                    <Input.BirthBox
                        value={catBirthYear}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={handleCatBirthYearChange}
                        placeholder="년도"
                    />
                    <Input.BirthBox
                        value={catBirthMonth}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={handleCatBirthMonthChange}
                        placeholder="월"
                    />
                    <Input.BirthBox
                        value={catBirthDay}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={handleCatBirthDayChange}
                        placeholder="일"
                    />
                </Block.FlexBox>
            </Block.FlexBox>
        </>
    );

}
