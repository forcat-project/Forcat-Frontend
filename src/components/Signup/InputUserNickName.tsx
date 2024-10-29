import { useRecoilState } from "recoil";
import useFocus from "../../hooks/useFocus";
import { Block, Input, Text } from "../../style/ui";
import { userState } from "../../recoil";

export default function InputUserNickName() {
  const [, setUserInfo] = useRecoilState(userState);
  const { isFocused, handleFocus, handleBlur } = useFocus();

  const handleUserNickNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo((prev) => ({ ...prev, nickname: e.target.value }));
  };
  return (
    <>
      <Block.FlexBox direction="column" gap="20px">
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
