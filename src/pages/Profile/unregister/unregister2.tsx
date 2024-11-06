import {
  PageWrapper,
  Text,
  Block,
  Button,
  ContentWrapper,
} from "../../../style/ui";
import styled from "styled-components";
import { Checked, Unchecked, Warning } from "../../../assets/svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ForcatModal from "../../../components/Modal/ForcatModal";
import { userAPI } from "../../../api/resourses/users"; // userAPI 임포트
import { useUserId } from "../../../hooks/useUserId"; // useUserId 훅 가져오기

export default function Unregister2() {
  const [isChecked, setIsChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가
  const navigate = useNavigate();
  const userId = useUserId(); // 유저 ID 가져오기

  // 토글 함수
  const toggleCheck = () => {
    setIsChecked((prev) => !prev);
  };

  const openModal = () => {
    if (isChecked) {
      setIsModalOpen(true); // 체크된 경우 모달 열기
    }
  };

  // 탈퇴 함수
  const handleUnregister = async () => {
    try {
      if (userId) {
        await userAPI.deleteUser(userId);
        alert("탈퇴가 완료되었습니다.");
        navigate("/home"); // 탈퇴 후 홈 페이지로 이동
      } else {
        console.error("유저 ID가 유효하지 않습니다.");
      }
    } catch (error) {
      console.error("탈퇴에 실패했습니다.", error);
      alert("탈퇴에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <PageWrapper>
      <ContentWrapper>
        <Text.TitleMenu100 style={{ color: "#C8C8C8", marginBottom: "20px" }}>
          마지막으로, 아래 내용을{" "}
          <strong style={{ color: "#F34747" }}>꼭</strong> 확인해 주세요
        </Text.TitleMenu100>
        <Text.TitleMenu300 style={{ color: "#333", marginBottom: "40px" }}>
          모든 정보와 데이터가 삭제되며 <br />
          복구가 불가능해요
        </Text.TitleMenu300>
        <InfoList>
          <li>
            - 탈퇴 이후 데이터 삭제로 인해 고객센터 대응에 어려움이 있을 수
            있어요.
          </li>
          <li>
            - 상품 배송 전 탈퇴할 경우 구매 정보가 삭제되어 배송이 어려우니
            신중히 선택해 주세요.
          </li>
          <li>
            - 포캣 탈퇴 후 재가입 하더라도 탈퇴 전 보유하고 있던 쿠폰, 생선
            포인트, 이벤트 진행 내역 등 모든 정보는 삭제되어 복구가 불가능해요.
          </li>
          <li>
            - 포캣 서비스 이용에 불편이 있어 탈퇴를 결정하셨다면, 포캣
            채널톡으로 불편사항을 말씀해 주세요.
          </li>
        </InfoList>

        <AgreementBox onClick={toggleCheck}>
          <Text.Menu>
            {isChecked ? (
              <Checked
                width={"40px"}
                height={"40px"}
                style={{ marginBottom: "-12px" }}
              />
            ) : (
              <Unchecked
                width={"40px"}
                height={"40px"}
                style={{ marginBottom: "-12px" }}
              />
            )}{" "}
            안내사항을 모두 확인하였으며, 탈퇴에 동의합니다.
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
          <Button.CartButton onClick={openModal} isSoldOut={!isChecked}>
            탈퇴 동의
          </Button.CartButton>
          <Button.BuyButton
            cursor="pointer"
            isSoldOut={false}
            onClick={() => navigate("/home")}
          >
            계속 이용할게요
          </Button.BuyButton>
        </Block.FlexBox>
      </Block.AbsoluteBox>

      {/* ForcatModal */}
      <ForcatModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        title=""
        width="599px"
        height="200px"
      >
        {/* 모달 내용 */}
        <Block.FlexBox direction="column" alignItems="center">
          <Warning
            width="40px"
            height="40px"
            style={{ marginBottom: "15px" }}
          />
          <Text.TitleMenu300>정말 포캣을 탈퇴하시겠어요?</Text.TitleMenu300>
          <Block.FlexBox
            width="100%"
            height="93px"
            justifyContent="center"
            alignItems="center"
            gap="12px"
          >
            <Button.CartButton onClick={handleUnregister} isSoldOut={false}>
              포캣탈퇴
            </Button.CartButton>
            <Button.BuyButton
              cursor="pointer"
              isSoldOut={false}
              onClick={() => setIsModalOpen(false)}
            >
              취소
            </Button.BuyButton>
          </Block.FlexBox>
        </Block.FlexBox>
      </ForcatModal>
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
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  width: 28%;
  padding: 15px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
