import { Block, Text, Button, Input } from "../../style/ui";
import styled from "styled-components";

export default function PointInfo() {
  return (
    <PointContainer>
      <Text.TitleMenu300>포인트 사용</Text.TitleMenu300>
      <Text.Menu style={{ color: "#A6A9B8", marginTop: "20px" }}>
        포인트
      </Text.Menu>
      <Block.FlexBox
        alignItems="center"
        style={{ marginTop: "5px", gap: "12px" }}
      >
        <StyledInput placeholder="0" defaultValue="0" />
        <StyledButton>전액사용</StyledButton>
      </Block.FlexBox>

      {/* 보유 포인트 텍스트 */}
      <Text.Mini style={{ marginTop: "8px", color: "#A6A9B8" }}>
        보유: 0P
      </Text.Mini>
    </PointContainer>
  );
}

// 스타일드 컴포넌트
const PointContainer = styled(Block.FlexBox)`
  padding: 20px;
  margin-left: 10px; /* 왼쪽 마진 추가 */
  flex-direction: column;
`;

const StyledInput = styled(Input.InfoBox)`
  flex: 1;
  height: 40px;
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 14px;
  border: 1px solid #d9d9d9;
  color: #000000;
`;

const StyledButton = styled(Button.Select)`
  padding: 8px 12px;
  border-radius: 8px;
  background-color: #f1f3f5;
  color: #2d2d2d;
  font-weight: 500;
  font-size: 14px;
  border: none;

  cursor: pointer;
  &:hover {
    background-color: #e9ecef;
  }
`;
