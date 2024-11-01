import { useEffect, useState } from "react";
import { Block, Text, Input, Button, Section } from "../../style/ui";
import styled from "styled-components";
import axiosInstance from "../../api/axiosInstance";
import DaumPostcode from "react-daum-postcode";
import ReactModal from "react-modal";
import { User } from "../../interfaces/info";

ReactModal.setAppElement("#root");

interface DeliveryInfoProps {
  isShippingInfoExpanded: boolean;
  toggleShippingInfo: () => void;
}

export default function DeliveryInfo({
  isShippingInfoExpanded,
  toggleShippingInfo,
}: DeliveryInfoProps) {
  const [user, setUser] = useState<User | null>(null);
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userId = 5;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userId) {
          const response = await axiosInstance.get(`/users/${userId}`);
          console.log(response.data);
          setUser(response.data);
          setAddress(response.data.address || "");
          setAddressDetail(response.data.address_detail || "");
        }
      } catch (error) {
        console.error("사용자 정보를 가져오는데 실패했습니다:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const onToggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleComplete = (data: { address: string }) => {
    setAddress(data.address);
    setAddressDetail(""); // 상세 주소는 빈칸으로 설정
    onToggleModal();
  };

  return (
    <>
      {/* 배송 정보 */}
      <Block.FlexBox padding="20px" justifyContent="space-between">
        <Text.TitleMenu300>배송 정보</Text.TitleMenu300>
        <Button.ToggleButton onClick={toggleShippingInfo}>
          {isShippingInfoExpanded ? "⌃" : "⌄"}
        </Button.ToggleButton>
      </Block.FlexBox>

      {isShippingInfoExpanded && (
        <Block.FlexBox padding="20px" direction="column" gap="15px">
          <Section>
            <Text.Menu style={{ color: "#A6A9B8", marginBottom: "10px" }}>
              이름 (필수)
            </Text.Menu>
            <StyledInput defaultValue={user?.username || ""} />
          </Section>

          <Section>
            <Text.Menu style={{ color: "#A6A9B8", marginBottom: "10px" }}>
              휴대폰 번호 (필수)
            </Text.Menu>
            <StyledInput defaultValue={user?.phone_number || ""} />
          </Section>

          <Section>
            <Text.Menu style={{ color: "#A6A9B8", marginBottom: "10px" }}>
              배송지 (필수)
            </Text.Menu>
            <StyledInput
              value={address}
              onClick={onToggleModal}
              readOnly
              placeholder="주소를 선택해주세요"
            />
            <StyledInput
              value={addressDetail}
              onChange={(e) => setAddressDetail(e.target.value)}
              placeholder="상세 주소"
            />
          </Section>

          <Section>
            <Text.Menu style={{ color: "#A6A9B8", marginBottom: "10px" }}>
              배송요청사항
            </Text.Menu>
            <StyledInput placeholder="예) 안전 배송 부탁드려요" />
          </Section>
        </Block.FlexBox>
      )}

      {/* 주소 검색 모달 */}
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={onToggleModal}
        contentLabel="주소 검색"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            width: "500px",
            padding: "10px",
          },
        }}
      >
        <DaumPostcode onComplete={handleComplete} />
      </ReactModal>
    </>
  );
}

const StyledInput = styled(Input.InfoBox)`
  margin-bottom: 10px;
  border-radius: 15px;
`;
