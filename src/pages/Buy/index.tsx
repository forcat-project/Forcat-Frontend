import { useLocation } from "react-router-dom";
import { Block, Text, Input, Button } from "../../style/ui";
import styled from "styled-components";
import { useState } from "react";
import ProductInfo from "../../components/Buy/productInfo"; // Import the ProductInfo component

export default function Buy() {
  const location = useLocation();
  const { product, count } = location.state || {};
  const [isProductInfoExpanded, setIsProductInfoExpanded] = useState(true);
  const [isShippingInfoExpanded, setIsShippingInfoExpanded] = useState(true);

  if (!product) {
    return <div>상품 정보가 없습니다.</div>;
  }

  const toggleProductInfo = () => {
    setIsProductInfoExpanded((prev) => !prev);
  };

  const toggleShippingInfo = () => {
    setIsShippingInfoExpanded((prev) => !prev);
  };

  return (
    <ScrollableContainer>
      <Block.FlexBox direction="column" style={{ marginTop: "90px" }}>
        <ProductInfo
          product={product}
          count={count}
          isProductInfoExpanded={isProductInfoExpanded}
          toggleProductInfo={toggleProductInfo}
        />

        <Divider />

        {/* 배송 정보 */}
        <Block.FlexBox padding="20px" justifyContent="space-between">
          <SectionTitle>배송 정보</SectionTitle>
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

        <Divider />

        {/* 포인트 사용 */}
        <Block.FlexBox padding="20px">
          <Section>
            <SectionTitle>포인트 사용</SectionTitle>
            <Block.FlexBox alignItems="center" gap="10px">
              <StyledInput placeholder="포인트" defaultValue="0" />
              <StyledButton>전액사용</StyledButton>
            </Block.FlexBox>
            <Text.Mini color="Gray">보유: 0P</Text.Mini>
          </Section>
        </Block.FlexBox>
        <Divider />

        {/* 구매 정보 */}
        <Block.FlexBox padding="20px">
          <Section>
            <SectionTitle>구매 정보</SectionTitle>
            <Block.FlexBox justifyContent="space-between">
              <Text.Menu>상품 금액</Text.Menu>
              <Text.TitleMenu200>
                {Math.floor(product.price).toLocaleString()}원
              </Text.TitleMenu200>
            </Block.FlexBox>
            <Block.FlexBox justifyContent="space-between">
              <Text.Mini>포인트</Text.Mini>
              <Text.Mini>-2,000원</Text.Mini>
            </Block.FlexBox>
            <Block.FlexBox justifyContent="space-between">
              <Text.Mini>배송비</Text.Mini>
              <Text.Mini>무료</Text.Mini>
            </Block.FlexBox>
            <Block.FlexBox
              justifyContent="space-between"
              style={{ fontWeight: "bold" }}
            >
              <Text.Mini>총 결제 금액</Text.Mini>
              <Text.Mini style={{ color: "orange" }}>15,000원</Text.Mini>
            </Block.FlexBox>
          </Section>
        </Block.FlexBox>
        <Divider />

        {/* 결제 버튼 */}
        <StyledButton>결제하기</StyledButton>
      </Block.FlexBox>
    </ScrollableContainer>
  );
}

// Styled Components
const ScrollableContainer = styled.div`
  max-height: 100vh;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled(Text.TitleMenu200)`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Divider = styled.div`
  width: 100%;
  height: 10px;
  background-color: #f0f0f0;
  margin: 20px 0;
`;

const StyledInput = styled(Input.InfoBox)`
  margin-bottom: 10px;
`;

const StyledButton = styled(Button.Select)`
  width: 100%;
  padding: 10px;
  font-weight: bold;
  text-align: center;
`;
