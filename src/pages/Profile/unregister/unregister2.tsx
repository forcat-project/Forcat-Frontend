import {
  PageWrapper,
  Text,
  Block,
  Button,
  ContentWrapper,
  Divider,
} from "../../../style/ui";
import styled from "styled-components";

export default function Unregister2() {
  return (
    <PageWrapper>
      <ContentWrapper>
        <Text.TitleMenu100 style={{ color: "#C8C8C8", marginBottom: "10px" }}>
          마지막으로, 아래 내용을{" "}
          <strong style={{ color: "#F34747" }}>꼭</strong> 확인해 주세요
        </Text.TitleMenu100>
        <Text.TitleMenu300 style={{ color: "#333", marginBottom: "20px" }}>
          모든 정보와 데이터가 삭제되며 복구가 불가능해요
        </Text.TitleMenu300>
        <InfoList>
          <li>
            - 탈퇴 이후 데이터 삭제로 인해 고객센터 대응에 어려움이 있을 수
            있어요.
          </li>
          <li>
            - 삐따귀물 상품 배송 전 탈퇴할 경우 구매 정보가 삭제되어 배송이
            어려우니 신중히 선택해 주세요.
          </li>
          <li>
            - 포동 탈퇴 후 재가입 하더라도 탈퇴 전 보유하고 있던 쿠폰, 삐따귀
            포인트, 이벤트 진행 내역 등 모든 정보는 삭제되어 복구가 불가능해요.
          </li>
          <li>
            - 포동 서비스 이용에 불편이 있어 탈퇴를 결정하셨다면, 카카오톡
            채널로 불편사항을 말씀해 주세요.
          </li>
        </InfoList>
        <Divider />
        <AgreementBox>
          <Text.Menu>
            <CheckIcon /> 안내사항을 모두 확인하였으며, 탈퇴에 동의합니다.
          </Text.Menu>
        </AgreementBox>
      </ContentWrapper>
      <Block.AbsoluteBox
        bottom="1%"
        left="0%"
        zIndex="3"
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        <Block.FlexBox
          width="100%"
          height="93px"
          justifyContent="center"
          alignItems="center"
          gap="12px"
        >
          <Button.CartButton onClick={() => {}} isSoldOut={false}>
            확인
          </Button.CartButton>
          <Button.BuyButton
            cursor="pointer"
            isSoldOut={false}
            onClick={() => {}}
          >
            계속 이용할게요
          </Button.BuyButton>
        </Block.FlexBox>
      </Block.AbsoluteBox>
    </PageWrapper>
  );
}

const InfoList = styled.ul`
  list-style-type: none;
  padding: 0;
  color: #555;
  font-size: 14px;
  line-height: 1.5;
  text-align: left;
  max-width: 600px;

  li {
    margin-bottom: 10px;
  }
`;

const AgreementBox = styled.div`
  position: fixed;
  bottom: 100px; /* 하단에서의 거리 조정 */
  left: 50%;
  transform: translateX(-50%);
  width: 28%;
  padding: 15px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CheckIcon = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: #ccc;
  border-radius: 50%;
  margin-right: 8px;
`;
