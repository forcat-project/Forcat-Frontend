import { useEffect, useState } from "react";
import { Block, Text, Input, Button, Section } from "../../style/ui";
import styled from "styled-components";
import axiosInstance from "../../api/axiosInstance";
// import { useUserId } from "../../hooks/useUserId";
import { User } from "../../interfaces/info";

interface DeliveryInfoProps {
  isShippingInfoExpanded: boolean;
  toggleShippingInfo: () => void;
}

export default function DeliveryInfo({
  isShippingInfoExpanded,
  toggleShippingInfo,
}: DeliveryInfoProps) {
  const [user, setUser] = useState<User | null>(null);
  const userId = 5;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userId) {
          const response = await axiosInstance.get(`/users/${userId}`);
          console.log(response.data);
          setUser(response.data);
        }
      } catch (error) {
        console.error("사용자 정보를 가져오는데 실패했습니다:", error);
      }
    };

    fetchUserData();
  }, [userId]);

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
            <StyledInput defaultValue={user?.address || ""} />
            <StyledInput defaultValue={user?.address_detail || ""} />
          </Section>

          <Section>
            <Text.Menu style={{ color: "#A6A9B8", marginBottom: "10px" }}>
              배송요청사항
            </Text.Menu>
            <StyledInput placeholder="예) 안전 배송 부탁드려요" />
          </Section>
        </Block.FlexBox>
      )}
    </>
  );
}

const StyledInput = styled(Input.InfoBox)`
  margin-bottom: 10px;
  border-radius: 15px;
`;
