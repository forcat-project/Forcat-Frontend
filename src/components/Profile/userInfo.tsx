import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal"; // react-modal 라이브러리 추가
import UserProfile from "../../assets/svg/UserProfile";
import { Block, Text, Button } from "../../style/ui";
import UserEdit from "../../pages/Profile/userEdit"; // userEdit 모달 컴포넌트 가져오기

// react-modal 설정 (최상위 DOM에 모달이 추가되도록 설정)
Modal.setAppElement("#root");

interface User {
  nickname: string;
  profile_picture: string; // 프로필 이미지 URL 필드 변경
  phone_number: string;
  addres: string;
  address_detail: string;
}

export default function UserInfo() {
  const [user, setUser] = useState<User | null>(null);
  const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false); // 모달 상태

  useEffect(() => {
    // 사용자 정보 API 호출
    axios
      .get("https://forcat.store/api/users/1")
      .then((response) => {
        setUser(response.data); // 응답 데이터로 상태 업데이트
      })
      .catch((error) => {
        console.error("사용자 정보를 가져오는데 실패했습니다:", error);
      });
  }, []);

  // 모달을 열고 닫는 함수
  const toggleEditModal = () => {
    setEditModalOpen(!isEditModalOpen);
  };

  return (
    <Block.FlexBox direction="column" padding="20px" bgColor="white">
      <Block.FlexBox
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        {/* 프로필 이미지와 이름 */}
        <Block.FlexBox direction="row" alignItems="center">
          <Block.FlexBox width="70px" height="70px">
            {user?.profile_picture ? (
              <img
                src={user.profile_picture}
                alt="User Profile"
                width="70"
                height="70"
                style={{ borderRadius: "50%" }} // 이미지 둥글게 만들기
              />
            ) : (
              <UserProfile /> // 기본 프로필 이미지 컴포넌트
            )}
          </Block.FlexBox>
          <Block.FlexBox margin="0 0 0 20px">
            <Text.TitleMenu300>{user?.nickname}</Text.TitleMenu300>
          </Block.FlexBox>
        </Block.FlexBox>

        {/* 편집 버튼 */}
        <Button.EditButton onClick={toggleEditModal}>
          <Text.Mini>편집</Text.Mini>
        </Button.EditButton>
      </Block.FlexBox>

      {/* 생선 포인트 */}
      <Block.FlexBox
        direction="row"
        alignItems="center"
        style={{ marginLeft: "10px", marginTop: "10px" }}
      >
        <img
          src="https://e7.pngegg.com/pngimages/53/63/png-clipart-fish-bone-computer-icons-fish-blue-marine-mammal.png"
          alt="Fish Icon"
          width="24"
          height="24"
        />
        <Text.Mini color="Gray">모은 생선 포인트</Text.Mini>
        <Text.TitleMenu300 style={{ marginLeft: "10px" }}>
          0 P
        </Text.TitleMenu300>
      </Block.FlexBox>

      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={toggleEditModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          content: {
            border: "none",
            background: "transparent",
            padding: 0,
            inset: "auto",
            maxWidth: "400px",
            width: "90%",
            borderRadius: "8px",
            overflow: "visible",
          },
        }}
      >
        <UserEdit user={user} onClose={toggleEditModal} />
      </Modal>
    </Block.FlexBox>
  );
}
