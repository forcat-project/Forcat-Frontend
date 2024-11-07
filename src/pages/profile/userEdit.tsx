import React, { useState, useEffect } from "react";
import DaumPostcode from "react-daum-postcode";
import ReactModal from "react-modal";
import { uploadImage } from "../../api/upload";
import { Block, Text } from "../../styles/ui";
import {
  StyledModal,
  ModalHeader,
  CloseButton,
  SaveButton,
  StyledInput,
  ProfileImageWrapper,
  StyledTextButton,
} from "../../styles/modal";
import { User } from "../../interfaces/info";
import { UserDataParams, userAPI } from "../../api/resourses/users";

ReactModal.setAppElement("#root");

interface UserEditProps {
  user: User;
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.log("Phone Number:", user.phone_number);
    console.log("Address:", user.address);
    console.log("Address Detail:", user.address_detail);
  }, [user]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetImage = () => {
    setProfilePicture(
      "https://i.pinimg.com/474x/d7/70/33/d7703333ad8ba85827b60fccf42f9c25.jpg"
    ); // 프로필 이미지를 null 또는 빈 문자열로 설정하여 기본 이미지로 변경
    setSelectedFile(null); // 파일 선택도 초기화
  };

  const handleSave = async () => {
    try {
      let uploadedImageUrl = profilePicture;

      if (selectedFile) {
        uploadedImageUrl = await uploadImage(selectedFile);
      }

      const userData: UserDataParams = {
        username: user.username,
        nickname,
        profile_picture: uploadedImageUrl,
        phone_number: user.phone_number,
        address,
        address_detail: addressDetail,
      };

      await userAPI.updateUser(user.id, userData);
      alert("사용자 정보가 업데이트되었습니다.");
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

  const onToggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleComplete = (data: { address: string }) => {
    setAddress(data.address);
    setAddressDetail(""); // 상세 주소는 빈칸으로 설정
    onToggleModal();
  };

  return (
    <StyledModal>
      <ModalHeader>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Text.TitleMenu200>유저 정보 수정</Text.TitleMenu200>
        <SaveButton onClick={handleSave}>완료</SaveButton>
      </ModalHeader>

      <Block.FlexBox direction="column" padding="10px" alignItems="center">
        <ProfileImageWrapper>
          <label htmlFor="profile-upload">
            <img
              src={profilePicture || "https://via.placeholder.com/150"}
              alt="User Profile"
              width="70"
              height="70"
              style={{
                borderRadius: "20%",
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

        <StyledTextButton
          onClick={handleResetImage}
          style={{ marginBottom: "30px" }}
        >
          기본이미지로 변경
        </StyledTextButton>

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
            <StyledTextButton onClick={onToggleModal}>
              주소 변경
            </StyledTextButton>
          </Block.FlexBox>

          <StyledInput
            type="text"
            placeholder="주소"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            readOnly
          />
          <StyledInput
            type="text"
            placeholder="상세 주소"
            value={addressDetail}
            onChange={(e) => setAddressDetail(e.target.value)}
          />
        </Block.FlexBox>
      </Block.FlexBox>

      {/* 주소 검색 모달 */}
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={onToggleModal}
        contentLabel="주소 검색"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: "999",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            width: "500px",
            padding: "20px",
          },
        }}
      >
        <DaumPostcode onComplete={handleComplete} />
      </ReactModal>
    </StyledModal>
  );
}

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <Block.FlexBox direction="row" justifyContent="space-between" padding="8px 0">
    <Text.Notice200 color="Gray">{label}</Text.Notice200>
    <Text.Notice200>{value}</Text.Notice200>
  </Block.FlexBox>
);
