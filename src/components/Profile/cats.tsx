import React, { useEffect, useState } from "react";
import axios from "axios";
import UserProfile from "../../assets/svg/UserProfile";
import { Block, Text, Button } from "../../style/ui";
import CatEdit from "../../pages/Profile/catEdit"; // CatEdit 모달 컴포넌트 임포트

interface Cat {
  name: string;
  cat_breed_name: string;
  days_since_birth: number;
  gender: number;
  is_neutered: number;
  weight: string;
  profile_image: string;
}

export default function Cats() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedCat, setSelectedCat] = useState<Cat | null>(null);

  useEffect(() => {
    axios
      .get("https://forcat.store/api/users/1/cats")
      .then((response) => {
        const catData = Array.isArray(response.data)
          ? response.data
          : [response.data];
        setCats(catData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("고양이 정보를 가져오는데 실패했습니다:", error);
        setLoading(false);
      });
  }, []);

  const getMonthsFromDays = (days: number) => {
    if (days === undefined || days < 0) {
      return "정보 없음";
    }
    return `${Math.max(1, Math.floor(days / 30))}개월`;
  };

  const openEditModal = (cat: Cat) => {
    setSelectedCat(cat);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedCat(null);
    setIsEditModalOpen(false);
  };

  const handleSave = (updatedCat: Cat) => {
    // 업데이트된 고양이 정보를 반영하여 상태를 갱신
    setCats((prevCats) =>
      prevCats.map((cat) => (cat.name === updatedCat.name ? updatedCat : cat))
    );
    closeEditModal();
  };

  if (loading) {
    return <Text.Notice200>로딩 중...</Text.Notice200>;
  }

  return (
    <Block.FlexBox padding="20px" direction="column">
      <Block.FlexBox justifyContent="space-between" alignItems="center">
        <Text.TitleMenu200>우리집 냐옹이들</Text.TitleMenu200>
        <Text.Notice200 color="Gray" pointer>
          추가
        </Text.Notice200>
      </Block.FlexBox>

      {cats.map((cat, index) => (
        <Block.FlexBox
          key={index}
          direction="row"
          justifyContent="space-between"
          padding="20px 20px"
          alignItems="center"
        >
          <Block.FlexBox direction="column">
            <Text.TitleMenu300 style={{ marginBottom: "10px" }}>
              {cat.name || "이름 없음"}
            </Text.TitleMenu300>
            <Block.FlexBox margin="5px 0">
              <Text.Notice200 color="Gray" style={{ marginRight: "10px" }}>
                견종
              </Text.Notice200>
              <Text.Notice200>
                {String(cat.cat_breed_name) || "정보 없음"}
              </Text.Notice200>
            </Block.FlexBox>
            <Block.FlexBox margin="5px 0">
              <Text.Notice200 color="Gray" style={{ marginRight: "10px" }}>
                나이
              </Text.Notice200>
              <Text.Notice200>
                {getMonthsFromDays(cat.days_since_birth)}
              </Text.Notice200>
            </Block.FlexBox>
            <Block.FlexBox margin="5px 0">
              <Text.Notice200 color="Gray" style={{ marginRight: "10px" }}>
                성별
              </Text.Notice200>
              <Text.Notice200>
                {cat.gender === 0 ? "여아" : "남아"}
              </Text.Notice200>
            </Block.FlexBox>
            <Block.FlexBox margin="5px 0">
              <Text.Notice200 color="Gray" style={{ marginRight: "10px" }}>
                중성화
              </Text.Notice200>
              <Text.Notice200>
                {cat.is_neutered === 1 ? "수술 완료" : "수술 미완료"}
              </Text.Notice200>
            </Block.FlexBox>
            <Block.FlexBox margin="5px 0">
              <Text.Notice200 color="Gray" style={{ marginRight: "10px" }}>
                몸무게
              </Text.Notice200>
              <Text.Notice200>{cat.weight}kg</Text.Notice200>
            </Block.FlexBox>
          </Block.FlexBox>

          <Block.FlexBox
            alignItems="center"
            width="150px"
            height="150px"
            direction="column"
          >
            {cat.profile_image ? (
              <img
                src={cat.profile_image}
                alt="Cat Profile"
                width="100"
                height="100"
                style={{ borderRadius: "50%" }}
              />
            ) : (
              <UserProfile />
            )}
            <Button.EditButton
              style={{ marginTop: "15px" }}
              onClick={() => openEditModal(cat)}
            >
              <Text.Mini>편집</Text.Mini>
            </Button.EditButton>
          </Block.FlexBox>
        </Block.FlexBox>
      ))}

      {isEditModalOpen && (
        <CatEdit
          cat={selectedCat}
          onClose={closeEditModal}
          onSave={handleSave}
        />
      )}
    </Block.FlexBox>
  );
}
