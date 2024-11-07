import { useEffect, useState } from "react";
import { Block, Text, Input, Button, Section } from "../../styles/ui";
import styled from "styled-components";
import ReactModal from "react-modal";
import DaumPostcode from "react-daum-postcode";
import { userAPI } from "../../api/resourses/users";
import { useUserId } from "../../hooks/useUserId";

ReactModal.setAppElement("#root");

interface DeliveryInfoProps {
    isShippingInfoExpanded: boolean;
    toggleShippingInfo: () => void;
    onConfirmDisabledChange: (isDisabled: boolean) => void;
    setUserName: (name: string) => void;
    setPhoneNumber: (number: string) => void;
    setShippingAddress: (address: string) => void;
    setShippingAddressDetail: (detail: string) => void;
    setShippingMemo: (memo: string) => void;
}

export default function DeliveryInfo({
    isShippingInfoExpanded,
    toggleShippingInfo,
    onConfirmDisabledChange,
    setUserName,
    setPhoneNumber,
    setShippingAddress,
    setShippingAddressDetail,
    setShippingMemo,
}: DeliveryInfoProps) {
    const userId = useUserId();
    const [, setUser] = useState(null);
    const [address, setAddress] = useState("");
    const [addressDetail, setAddressDetail] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [phoneNumber, setPhoneNumberState] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (userId) {
                    const response = await userAPI.getUser(userId);
                    setUser(response.data);
                    setUsername(response.data.username || "");
                    setPhoneNumberState(response.data.phone_number || "");
                    setAddress(response.data.address || "");
                    setAddressDetail(response.data.address_detail || "");
                }
            } catch (error) {
                console.error("사용자 정보를 가져오는데 실패했습니다:", error);
            }
        };
        fetchUserData();
    }, [userId]);

    useEffect(() => {
        setUserName(username);
        setPhoneNumber(phoneNumber);
        setShippingAddress(address);
        setShippingAddressDetail(addressDetail);
    }, [
        username,
        phoneNumber,
        address,
        addressDetail,
        setUserName,
        setPhoneNumber,
        setShippingAddress,
        setShippingAddressDetail,
    ]);

    useEffect(() => {
        const isDisabled = !username.trim() || !phoneNumber.trim() || !address.trim();
        onConfirmDisabledChange(isDisabled);
    }, [username, phoneNumber, address, onConfirmDisabledChange]);

    const handleMemoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShippingMemo(e.target.value);
    };

    const onToggleModal = () => {
        setIsModalOpen(prev => !prev);
    };

    const handleComplete = (data: { address: string }) => {
        setAddress(data.address);
        setAddressDetail("");
        onToggleModal();
    };

    return (
        <>
            <Block.FlexBox padding="20px" justifyContent="space-between">
                <Text.TitleMenu300>배송 정보</Text.TitleMenu300>
                <Button.ToggleButton onClick={toggleShippingInfo}>
                    {isShippingInfoExpanded ? "⌃" : "⌄"}
                </Button.ToggleButton>
            </Block.FlexBox>

            {isShippingInfoExpanded && (
                <Block.FlexBox padding="20px" direction="column" gap="15px">
                    <Section>
                        <Text.Menu style={{ color: "#A6A9B8", marginBottom: "10px" }}>이름 (필수)</Text.Menu>
                        <StyledInput value={username} onChange={e => setUsername(e.target.value)} />
                    </Section>

                    <Section>
                        <Text.Menu style={{ color: "#A6A9B8", marginBottom: "10px" }}>휴대폰 번호 (필수)</Text.Menu>
                        <StyledInput value={phoneNumber} onChange={e => setPhoneNumberState(e.target.value)} />
                    </Section>

                    <Section>
                        <Text.Menu style={{ color: "#A6A9B8", marginBottom: "10px" }}>배송지 (필수)</Text.Menu>
                        <StyledInput
                            value={address}
                            onClick={onToggleModal}
                            readOnly
                            placeholder="주소를 선택해주세요"
                        />
                        <StyledInput
                            value={addressDetail}
                            onChange={e => setAddressDetail(e.target.value)}
                            placeholder="상세 주소"
                        />
                    </Section>

                    <Section>
                        <Text.Menu style={{ color: "#A6A9B8", marginBottom: "10px" }}>배송요청사항</Text.Menu>
                        <StyledInput placeholder="예) 안전 배송 부탁드려요" onChange={handleMemoChange} />
                    </Section>
                </Block.FlexBox>
            )}
            <ReactModal
                isOpen={isModalOpen}
                onRequestClose={onToggleModal}
                contentLabel="주소 검색"
                style={{
                    overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: "999" },
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
        </>
    );
}

const StyledInput = styled(Input.InfoBox)`
    margin-bottom: 10px;
    border-radius: 15px;
`;
