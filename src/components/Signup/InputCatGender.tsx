// import { useRecoilState } from "recoil";
import useFocus from "../../hooks/useFocus";
import { Block, Button, Text } from "../../style/ui";
// import { catState } from "../../recoil";
import { useState } from "react";

export default function InputCatGender() {
  // const [catInfo, setCatInfo] = useRecoilState(catState);
  const { isFocused } = useFocus();
  //handleFocus, handleBlur

  const [IsFemaleCat, setIsFemaleCat] = useState(true);

  const handleFemaleClick = () => {
    setIsFemaleCat(true);
    console.log(IsFemaleCat);
  };
  const handleMaleClick = () => {
    setIsFemaleCat(false);
    console.log(IsFemaleCat);
  };

  return (
    <>
      <Block.FlexBox direction="column" gap="20px">
        <Text.FocusedMenu isFocused={isFocused}>성별</Text.FocusedMenu>

        <Block.FlexBox justifyContent="space-between">
          <Button.Select onClick={handleFemaleClick}>여아</Button.Select>
          <Button.Select onClick={handleMaleClick}>남아</Button.Select>
        </Block.FlexBox>
      </Block.FlexBox>
    </>
  );
}
