import { useState, useEffect } from "react";
import {
  StyledModal,
  ModalHeader,
  CloseButton,
  SaveButton,
  StyledInput,
  ProfileImageWrapper,
} from "../../style/modal";
import { Block, Text, Button } from "../../style/ui";
import { Cat } from "../../interfaces/info";

interface CatEditProps {
  cat: Cat;
  onClose: () => void;
  onSave: (updatedCat: Cat) => void;
}

export default function CatEdit({ cat, onClose, onSave }: CatEditProps) {
  const [name, setName] = useState(cat.name || "");
  const [breed, setBreed] = useState(cat.cat_breed_name || "");
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [gender, setGender] = useState(cat.gender || 0); // 0: 여아, 1: 남아
  const [weight, setWeight] = useState(cat.weight || "");

  // 생년월일 초기값 설정
  useEffect(() => {
    if (cat.birth_date) {
      const [year, month, day] = cat.birth_date.split("-");
      setBirthYear(year);
      setBirthMonth(month);
      setBirthDay(day);
    }
  }, [cat.birth_date]);

  const handleSave = () => {
    const updatedCat: Cat = {
      ...cat,
      name,
      cat_breed_name: breed,
      birth_date: `${birthYear}-${birthMonth}-${birthDay}`,
      gender,
      weight,
      profile_image: cat.profile_image,
    };
    onSave(updatedCat);
    onClose();
  };

  const handleGenderSelect = (selectedGender: number) => {
    setGender(selectedGender);
  };

  return (
    <StyledModal>
      <ModalHeader>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Text.TitleMenu200>고양이 정보 수정</Text.TitleMenu200>
        <SaveButton onClick={handleSave}>완료</SaveButton>
      </ModalHeader>

      <Block.FlexBox direction="column" padding="20px">
        {/* 프로필 이미지 */}
        <ProfileImageWrapper>
          <label htmlFor="profile-upload">
            <img
              src={cat.profile_image || "https://via.placeholder.com/150"}
              alt="Cat Profile"
              width="80"
              height="80"
              style={{ borderRadius: "50%", cursor: "pointer" }}
            />
          </label>
          <input
            type="file"
            id="profile-upload"
            style={{ display: "none" }}
            accept="image/*"
          />
        </ProfileImageWrapper>

        {/* 이름 */}
        <Text.Notice200>이름</Text.Notice200>
        <StyledInput
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* 품종 */}
        <Text.Notice200>품종</Text.Notice200>
        <StyledInput
          type="text"
          placeholder="품종"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
        />

        {/* 생년월일 */}
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

        {/* 성별 */}
        <Block.FlexBox justifyContent="space-between" margin="10px 0">
          <Button.Select
            onClick={() => handleGenderSelect(0)}
            style={{
              backgroundColor: gender === 0 ? "#f4b647" : "#f6ecd7",
              color: gender === 0 ? "#ffffff" : "#f4b647",
            }}
          >
            여아
          </Button.Select>
          <Button.Select
            onClick={() => handleGenderSelect(1)}
            style={{
              backgroundColor: gender === 1 ? "#f4b647" : "#f6ecd7",
              color: gender === 1 ? "#ffffff" : "#f4b647",
            }}
          >
            남아
          </Button.Select>
        </Block.FlexBox>

        {/* 몸무게 */}
        <Text.Notice200>몸무게</Text.Notice200>
        <StyledInput
          type="text"
          placeholder="몸무게"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </Block.FlexBox>
    </StyledModal>
  );
}
