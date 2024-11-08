import React, { useState, useEffect } from "react";
import {
  StyledModal,
  ModalHeader,
  CloseButton,
  SaveButton,
  StyledInput,
  ProfileImageWrapper,
  StyledTextButton,
} from "../../styles/modal";
import { Block, Text, Button } from "../../styles/ui";
import { Cat } from "../../interfaces/info";
import axios from "axios";
import { BASE_URL } from "../../api/constants";
import { uploadImage } from "../../api/upload";
import { useUserId } from "../../hooks/useUserId";
import ReactModal from "react-modal";

interface CatEditProps {
  cat: Cat;
  onClose: () => void;
  onReload: () => void;
  onSave: (updatedCat: Cat) => void; // onSave prop 추가
}
ReactModal.setAppElement("#root");

export default function CatEdit({ cat, onClose, onReload }: CatEditProps) {
  const [name, setName] = useState(cat.name || "");
  const [breed, setBreed] = useState(cat.cat_breed_name || "");
  const [breedId, setBreedId] = useState(cat.cat_breed || 0); // 종 ID
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [isNeutered, setIsNeutered] = useState(cat.is_neutered || 0); // 중성화 상태
  const [gender, setGender] = useState(cat.gender || 0); // 0: 여아, 1: 남아
  const [weight, setWeight] = useState(cat.weight || "");
  const [profileImage, setProfileImage] = useState(cat.profile_image || "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const userId = useUserId();
  console.log("catEdit :::::::::::::", userId);

  useEffect(() => {
    if (cat.birth_date) {
      const [year, month, day] = cat.birth_date.split("-");
      setBirthYear(year);
      setBirthMonth(month);
      setBirthDay(day);
    }
  }, [cat.birth_date]);

  useEffect(() => {
    console.log("Current profileImage:", profileImage);
  }, [profileImage]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      console.log("Selected file:", file);
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        console.log("Profile image preview URL:", reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      console.log("No file selected");
    }
  };

  const handleResetImage = () => {
    setProfileImage(
      "https://bff-images.bemypet.kr/media/medias/all/993-image_picker152967371293908462.jpg"
    ); // 프로필 이미지를 null 또는 빈 문자열로 설정하여 기본 이미지로 변경
    setSelectedFile(null); // 파일 선택도 초기화
  };

  const handleBreedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBreed(e.target.value); // 품종 이름
    setBreedId(Number(e.target.value)); // 품종 ID
  };

  const handleSave = async () => {
    try {
      let uploadedImageUrl = profileImage;

      if (selectedFile) {
        console.log("Uploading selected file...");
        uploadedImageUrl = await uploadImage(selectedFile);
        console.log("Uploaded image URL:", uploadedImageUrl);
      }

      const updatedCat = {
        name,
        cat_breed_name: breed,
        cat_breed: breedId,
        birth_date: `${birthYear}-${birthMonth}-${birthDay}`,
        gender,
        is_neutered: isNeutered,
        weight,
        profile_image: uploadedImageUrl,
      };

      const apiUrl = `${BASE_URL}/users/${userId}/cats/${cat.cat_id}`;
      console.log("API URL:", apiUrl);
      console.log("Updated Cat Data:", updatedCat);

      await axios.put(apiUrl, updatedCat);

      alert("고양이 정보가 업데이트되었습니다.");
      onReload();
      onClose();
    } catch (error: any) {
      console.error("고양이 정보 수정에 실패했습니다:", error);
      alert("고양이 정보 수정에 실패했습니다.");
    }
  };

  const handleGenderSelect = (selectedGender: number) => {
    setGender(selectedGender);
  };

  const handleNeuteredSelect = (selectedStatus: number) => {
    setIsNeutered(selectedStatus);
  };

  const handleDelete = async () => {
    try {
      const apiUrl = `${BASE_URL}/users/${userId}/cats/${cat.cat_id}`;
      await axios.delete(apiUrl);

      alert("고양이 정보가 삭제되었습니다.");
      onReload();
      onClose();
    } catch (error: any) {
      console.error("고양이 정보 삭제에 실패했습니다:", error);
      alert("고양이 정보 삭제에 실패했습니다.");
    }
  };

  return (
    <StyledModal>
      <ModalHeader>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Text.TitleMenu200>고양이 정보 수정</Text.TitleMenu200>
        <SaveButton onClick={handleSave}>완료</SaveButton>
      </ModalHeader>

      <Block.FlexBox direction="column" padding="20px">
        <ProfileImageWrapper>
          <label htmlFor="profile-upload">
            {profileImage && profileImage.trim() !== "" ? (
              <img
                src={profileImage}
                alt="Cat Profile"
                width="80"
                height="80"
                style={{ borderRadius: "50%", cursor: "pointer" }}
              />
            ) : (
              <img
                src="https://bff-images.bemypet.kr/media/medias/all/993-image_picker152967371293908462.jpg"
                alt="Default Cat Profile"
                width="80"
                height="80"
                style={{ borderRadius: "50%", cursor: "pointer" }}
              />
            )}
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

        <Text.Notice200>이름</Text.Notice200>
        <StyledInput
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Text.Notice200>품종</Text.Notice200>
        <StyledInput
          type="text"
          placeholder="품종"
          value={breed}
          onChange={handleBreedChange}
        />

        <Text.Notice200>생년월일</Text.Notice200>
        <Block.FlexBox>
          <StyledInput
            type="text"
            placeholder={birthYear || "년"}
            value={birthYear}
            onChange={(e) => setBirthYear(e.target.value)}
          />
          <StyledInput
            type="text"
            placeholder={birthMonth || "월"}
            value={birthMonth}
            onChange={(e) => setBirthMonth(e.target.value)}
          />
          <StyledInput
            type="text"
            placeholder={birthDay || "일"}
            value={birthDay}
            onChange={(e) => setBirthDay(e.target.value)}
          />
        </Block.FlexBox>

        <Text.Notice200 style={{ marginTop: "10px" }}>성별</Text.Notice200>
        <Block.FlexBox justifyContent="space-between" margin="10px 0">
          <Button.SelectInput
            onClick={() => handleGenderSelect(0)}
            isActive={gender === 0}
            style={{ height: "40px", padding: "5px 10px", marginRight: "5px" }}
          >
            여아
          </Button.SelectInput>
          <Button.SelectInput
            onClick={() => handleGenderSelect(1)}
            isActive={gender === 1}
            style={{ height: "40px", padding: "5px 10px" }}
          >
            남아
          </Button.SelectInput>
        </Block.FlexBox>

        <Text.Notice200 style={{ marginTop: "10px" }}>중성화</Text.Notice200>
        <Block.FlexBox justifyContent="space-between" margin="10px 0">
          <Button.SelectInput
            onClick={() => handleNeuteredSelect(0)}
            isActive={isNeutered === 0}
            style={{ height: "40px", padding: "5px 10px", marginRight: "5px" }}
          >
            미완료
          </Button.SelectInput>
          <Button.SelectInput
            onClick={() => handleNeuteredSelect(1)}
            isActive={isNeutered === 1}
            style={{ height: "40px", padding: "5px 10px" }}
          >
            완료
          </Button.SelectInput>
        </Block.FlexBox>

        <Text.Notice200>몸무게</Text.Notice200>
        <StyledInput
          type="text"
          placeholder="몸무게"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        {/* 삭제하기 버튼 */}
        <Block.FlexBox justifyContent="center" margin="20px 0">
          <Button.Confirm
            onClick={handleDelete}
            isDisabled={false} // 또는 필요한 논리로 설정
            style={{ padding: "10px 20px", width: "100px", height: "40px" }}
          >
            <Text.TitleMenu100 color="White">삭제하기</Text.TitleMenu100>
          </Button.Confirm>
        </Block.FlexBox>
      </Block.FlexBox>
    </StyledModal>
  );
}
