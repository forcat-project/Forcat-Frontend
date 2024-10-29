// import { useRecoilState } from "recoil";
import useFocus from "../../hooks/useFocus";
import { Block, Input, Text } from "../../style/ui";
// import { catState } from "../../recoil";

export default function InputCatBreed() {
  // const [catInfo, setCatInfo] = useRecoilState(catState);
  const { isFocused, handleFocus, handleBlur } = useFocus();

  return (
    <>
      <Block.FlexBox direction="column" gap="20px">
        <Text.FocusedMenu isFocused={isFocused}>묘종</Text.FocusedMenu>
        <Input.InfoBox
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="선택해주세요"
        />
      </Block.FlexBox>
    </>
  );
}
