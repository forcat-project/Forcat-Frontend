import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import UserProfile from "../../assets/svg/UserProfile";
import { Block, Text, Button } from "../../style/ui";
import UserEdit from "../../pages/Profile/userEdit";

Modal.setAppElement("#root");

interface User {
  nickname: string;
  profile_picture: string;
  phone_number: string;
  address: string;
  address_detail: string;
}

interface UserInfoProps {
  onReload: () => void; // Reload 함수 prop 추가
}

export default function UserInfo({ onReload }: UserInfoProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get("https://forcat.store/api/users/1")
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("사용자 정보를 가져오는데 실패했습니다:", error);
      });
  }, []);

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
        <Block.FlexBox direction="row" alignItems="center">
          <Block.FlexBox width="70px" height="70px">
            {user?.profile_picture ? (
              <img
                src={user.profile_picture}
                alt="User Profile"
                width="70"
                height="70"
                style={{ borderRadius: "50%" }}
              />
            ) : (
              <UserProfile />
            )}
          </Block.FlexBox>
          <Block.FlexBox margin="0 0 0 20px">
            <Text.TitleMenu300>{user?.nickname}</Text.TitleMenu300>
          </Block.FlexBox>
        </Block.FlexBox>

        <Button.EditButton onClick={toggleEditModal}>
          <Text.Mini>편집</Text.Mini>
        </Button.EditButton>
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
        <UserEdit user={user} onClose={toggleEditModal} onReload={onReload} />
      </Modal>
    </Block.FlexBox>
  );
}
