import { useEffect, useState } from "react";
import axios from "axios";
import UserProfile from "../../assets/svg/UserProfile";
import { Block, Text, Button } from "../../style/ui";
import CatEdit from "../../pages/Profile/catEdit";
import { Cat } from "../../interfaces/info";
import { BASE_URL } from "../../api/constants";

export default function Cats() {
  const userId = 1; // 사용자 ID를 설정
  const [cats, setCats] = useState<Cat[]>([]);
  const [, setLoading] = useState<boolean>(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedCat, setSelectedCat] = useState<Cat | null>(null);

  useEffect(() => {
    fetchCats();
  }, []);

  const fetchCats = () => {
    axios
      .get(`${BASE_URL}/users/${userId}/cats`)
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
  };

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
    setCats((prevCats) =>
      prevCats.map((cat) =>
        cat.cat_id === updatedCat.cat_id ? updatedCat : cat
      )
    );
    closeEditModal();
  };

  return (
    <Block.FlexBox padding="20px" direction="column">
      <Block.FlexBox justifyContent="space-between" alignItems="center">
        <Text.TitleMenu200>우리집 냐옹이들</Text.TitleMenu200>
        <Text.Notice200 color="Gray" pointer>
          추가
        </Text.Notice200>
      </Block.FlexBox>

      {cats.map((cat, index) => (
        <div
          style={{
            width: "calc(100% - 40px)", // 양옆에 20px씩 여백 추가
            // border: "3px solid #D3D3D3", // 더 밝은 회색으로 두껍게 설정
            borderRadius: "8px",
            padding: "16px",
            margin: "20px auto 10px", // 상단 여백과 아래쪽 여백 조정
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // 부드러운 그림자 추가
            backgroundColor: "#f8f8f8", // 배경을 흰색으로 설정
          }}
        >
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
                  {getMonthsFromDays(cat.days_since_birth || 0)}
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
        </div>
      ))}

      {isEditModalOpen && selectedCat && (
        <CatEdit
          cat={selectedCat}
          userId={userId}
          onClose={closeEditModal}
          onReload={fetchCats} // 프로필 페이지 reload
          onSave={handleSave}
        />
      )}
    </Block.FlexBox>
  );
}
