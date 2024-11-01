import { Block, Text, Input, Button, Section } from "../../style/ui";
import styled from "styled-components";

interface DeliveryInfoProps {
  isShippingInfoExpanded: boolean;
  toggleShippingInfo: () => void;
}

export default function DeliveryInfo({
  isShippingInfoExpanded,
  toggleShippingInfo,
}: DeliveryInfoProps) {
  return (
    <>
      {/* 배송 정보 */}
      <Block.FlexBox padding="20px" justifyContent="space-between">
        <Text.TitleMenu300>배송 정보</Text.TitleMenu300>
        <Button.ToggleButton onClick={toggleShippingInfo}>
          {isShippingInfoExpanded ? "⌃" : "⌄"}
        </Button.ToggleButton>
      </Block.FlexBox>

      {isShippingInfoExpanded && (
        <Block.FlexBox padding="20px">
          <Section>
            <StyledInput placeholder="이름 (필수)" defaultValue="오혜령" />
            <StyledInput
              placeholder="휴대폰 번호 (필수)"
              defaultValue="010-5303-9713"
            />
            <StyledInput
              placeholder="배송지 (필수)"
              defaultValue="경기 안양시 동안구 동편로 135 (관양동, 동편마을 아파트 상가)"
            />
            <StyledInput placeholder="상세 주소" defaultValue="410동601호" />
            <StyledInput
              placeholder="배송요청사항"
              defaultValue="예) 안전 배송 부탁드려요"
            />
          </Section>
        </Block.FlexBox>
      )}
    </>
  );
}

const StyledInput = styled(Input.InfoBox)`
  margin-bottom: 10px;
`;
