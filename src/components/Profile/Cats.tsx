import { useEffect, useState } from "react";
import { Block, Text, Button } from "../../styles/ui";
import CatEdit from "../../pages/profile/catEdit";
import { Cat } from "../../interfaces/info";
import { useUserId } from "../../hooks/useUserId";
import { catAPI } from "../../api/resourses/cats";
import ReactModal from "react-modal";
import { useNavigate } from "react-router-dom";

export default function Cats() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [, setLoading] = useState<boolean>(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedCat, setSelectedCat] = useState<Cat | null>(null);
  const userId = useUserId();
  const navigate = useNavigate();

  ReactModal.setAppElement("#root");

  useEffect(() => {
    if (userId) {
      fetchCats();
    }
  }, [userId]);

  const fetchCats = () => {
    catAPI
      .getCats(Number(userId))
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
      <Block.FlexBox
        justifyContent="space-between"
        alignItems="center"
        padding="0 20px"
      >
        <Text.TitleMenu200 style={{ marginLeft: "-20px" }}>
          우리집 냐옹이들
        </Text.TitleMenu200>
        <Text.Notice200
          color="Gray"
          pointer
          onClick={() => navigate("/catadd")}
        >
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
          style={{
            borderRadius: "8px",
            margin: "10px 0",
            border: "1px solid #e8e9eb",
            cursor: "pointer", // 클릭 가능한 UI 표시
            marginTop: "20px",
          }}
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
                src={
                  cat.profile_image ||
                  "https://bff-images.bemypet.kr/media/medias/all/993-image_picker152967371293908462.jpg"
                }
                alt="Cat Profile"
                width="100"
                height="100"
                style={{ borderRadius: "50%" }}
              />
            ) : (
              <img
                src="https://bff-images.bemypet.kr/media/medias/all/993-image_picker152967371293908462.jpg"
                alt="Default Cat Profile"
                width="100"
                height="100"
                style={{ borderRadius: "50%" }}
              />
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
      <ReactModal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "999",
          },
          content: {
            border: "none",
            background: "transparent",
            padding: 0,
            inset: "auto",
            maxWidth: "600px",
            width: "90%",
            borderRadius: "8px",
            overflow: "visible",
          },
        }}
      >
        {selectedCat && (
          <CatEdit
            cat={selectedCat}
            onClose={closeEditModal}
            onReload={fetchCats}
            onSave={handleSave}
          />
        )}
      </ReactModal>
    </Block.FlexBox>
  );
}
