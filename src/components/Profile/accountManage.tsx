import { Block, Text, Button } from "../../style/ui";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // useNavigate 훅을 import

export default function AccountManage() {
  const navigate = useNavigate(); // useNavigate 훅을 사용

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
        {/* 이용약관 */}
        <StyledButton
          isDisabled={false}
          onClick={() => navigate("/termsofuse")}
        >
          <Text.Menu>이용약관</Text.Menu>
          <Text.TitleMenu100 pointer color="Gray">
            {">"}
          </Text.TitleMenu100>
        </StyledButton>

        {/* 개인정보처리방침 */}
        <StyledButton isDisabled={false}>
          <Text.Menu>개인정보처리방침</Text.Menu>
          <Text.TitleMenu100 pointer color="Gray">
            {">"}
          </Text.TitleMenu100>
        </StyledButton>

        {/* 로그아웃 */}
        <StyledButton isDisabled={false}>
          <Text.Menu>로그아웃</Text.Menu>
        </StyledButton>

        {/* 회원탈퇴 */}
        <StyledButton isDisabled={false}>
          <Text.Menu>회원탈퇴</Text.Menu>
        </StyledButton>
      </Block.FlexBox>
    </Block.FlexBox>
  );
}

// Styled Components for Buttons
const StyledButton = styled(Button.Confirm)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 0;
  border: none;
  background: none;
  cursor: pointer;
`;
