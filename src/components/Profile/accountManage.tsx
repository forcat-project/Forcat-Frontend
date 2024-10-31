import { Block, Text } from "../../style/ui";

export default function AccountManage() {
  return (
    <Block.FlexBox
      direction="column"
      padding="20px"
      maxWidth="600px"
      margin="0 auto"
    >
      {/* 계정 관리 타이틀 */}
      <Text.TitleMenu200>계정관리</Text.TitleMenu200>

      {/* 각 메뉴 항목 */}
      <Block.FlexBox direction="column" padding="10px 0">
        <Block.FlexBox
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          padding="10px 0"
        >
          <Text.Menu>이용약관</Text.Menu>
          <Text.TitleMenu100 pointer color="Gray">
            {">"}
          </Text.TitleMenu100>
        </Block.FlexBox>

        <Block.FlexBox
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          padding="10px 0"
        >
          <Text.Menu>개인정보처리방침</Text.Menu>
          <Text.TitleMenu100 pointer color="Gray">
            {">"}
          </Text.TitleMenu100>
        </Block.FlexBox>

        <Block.FlexBox
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          padding="10px 0"
        >
          <Text.Menu>로그아웃</Text.Menu>
        </Block.FlexBox>

        <Block.FlexBox
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          padding="10px 0"
        >
          <Text.Menu>회원탈퇴</Text.Menu>
        </Block.FlexBox>
      </Block.FlexBox>
    </Block.FlexBox>
  );
}
