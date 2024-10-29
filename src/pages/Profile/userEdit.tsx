import React, { useState, useEffect } from "react";
import { uploadImage } from "../../api/upload"; // 이미지 업로드 함수 가져오기
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
import axios from "axios";

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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    console.log("Phone Number:", user.phone_number);
    console.log("Address:", user.address);
    console.log("Address Detail:", user.address_detail);
  }, [user]);

  // 파일 선택 시 FormData로 파일 설정 및 화면에 즉시 반영
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      // FileReader를 사용해 선택한 이미지를 화면에 바로 표시
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      let uploadedImageUrl = profilePicture;

      // 이미지 파일이 선택된 경우 서버에 업로드
      if (selectedFile) {
        uploadedImageUrl = await uploadImage(selectedFile); // uploadImage 함수 호출
      }

      const updatedData = {
        username: user.username,
        nickname,
        profile_picture: uploadedImageUrl, // 수정된 profile_picture URL
        phone_number: user.phone_number,
        address,
        address_detail: addressDetail,
      };

      await axios.put(`https://forcat.store/api/users/${user.id}`, updatedData);
      alert("사용자 정보가 업데이트되었습니다.");
      console.log("업데이트된 데이터:", updatedData);
      onReload();
      onClose();
    } catch (error: any) {
      console.error("정보 수정에 실패했습니다:", error);
      if (error.response) {
        console.log("서버 응답 (에러 발생 시):", error.response.data);
      }
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