import React, { useState, useEffect } from "react";
import axios from "axios";
import { Block, Text } from "../../style/ui";
import {
  StyledModal,
  ModalHeader,
  CloseButton,
  SaveButton,
  StyledInput,
  ProfileImageWrapper,
  StyledTextButton,
} from "../../style/modal"; // modal.ts 파일에서 스타일 컴포넌트 가져오기

interface UserEditProps {
  user: any;
  onClose: () => void;
  onReload: () => void;
}

export default function UserEdit({ user, onClose, onReload }: UserEditProps) {
  const [nickname, setNickname] = useState(user.nickname || "");
  const [profilePicture, setProfilePicture] = useState(
    user.profile_picture || ""
  );
  const [address, setAddress] = useState(user.address || "");
  const [addressDetail, setAddressDetail] = useState(user.address_detail || "");

  // Check user data when component mounts or when user prop changes
  useEffect(() => {
    console.log("Phone Number:", user.phone_number);
    console.log("Address:", user.address);
    console.log("Address Detail:", user.address_detail);
  }, [user]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setProfilePicture(reader.result.toString());
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    const updatedData = {
      username: user.username,
      nickname,
      profile_picture: profilePicture,
      phone_number: user.phone_number, // 변경 불가 필드
      address,
      address_detail: addressDetail,
    };

    try {
      await axios.put(`https://forcat.store/api/users/${user.id}`, updatedData);
      alert("사용자 정보가 업데이트되었습니다.");
      onReload();

      onClose(); // 수정 후 모달 닫기
      onReload();
    } catch (error) {
      console.error("정보 수정에 실패했습니다:", error);
      alert("정보 수정에 실패했습니다.");
    }
  };

  return (
    <StyledModal>
      <ModalHeader>
        <CloseButton onClick={onClose}>×</CloseButton>
        <SaveButton onClick={handleSave}>완료</SaveButton>
      </ModalHeader>

      <Block.FlexBox direction="column" padding="20px" alignItems="center">
        <ProfileImageWrapper>
          <label htmlFor="profile-upload">
            <img
              src={profilePicture || "https://via.placeholder.com/150"}
              alt="User Profile"
              width="80"
              height="80"
              style={{
                borderRadius: "50%",
                marginBottom: "10px",
                cursor: "pointer",
              }}
            />
          </label>
          <input
            type="file"
            id="profile-upload"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleImageChange}
          />
        </ProfileImageWrapper>

        <StyledInput
          type="text"
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          style={{ textAlign: "center" }}
        />

        <Block.FlexBox direction="column" width="100%" padding="10px 0">
          <InfoRow label="이름" value={user.username} />
          <InfoRow label="핸드폰 번호" value={user.phone_number} />
          <Block.FlexBox
            direction="row"
            justifyContent="space-between"
            padding="8px 0"
          >
            <Text.Notice200 color="Gray">주소</Text.Notice200>
            <StyledTextButton onClick={() => alert()}>
              주소 변경
            </StyledTextButton>
          </Block.FlexBox>
          <StyledInput
            type="text"
            placeholder="주소"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <StyledInput
            type="text"
            placeholder="상세 주소"
            value={addressDetail}
            onChange={(e) => setAddressDetail(e.target.value)}
          />
        </Block.FlexBox>
      </Block.FlexBox>
    </StyledModal>
  );
}

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <Block.FlexBox direction="row" justifyContent="space-between" padding="8px 0">
    <Text.Notice200 color="Gray">{label}</Text.Notice200>
    <Text.Notice200>{value}</Text.Notice200>
  </Block.FlexBox>
);
