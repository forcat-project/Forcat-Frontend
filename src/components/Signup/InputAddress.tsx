import { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import ReactModal from "react-modal";
import { Block, Button, Input, Text } from "../../styles/ui";
import { useRecoilState } from "recoil";
import { inputState, userState } from "../../store/atoms";
import useFocus from "../../hooks/useFocus";

ReactModal.setAppElement("#root");

export default function InputAddress() {
    const [userInfo, setUserInfo] = useRecoilState(userState);
    const [, setInputData] = useRecoilState(inputState);
    const [isOpen, setIsOpen] = useState(false);
    const [detail, setDetail] = useState("");

    const onToggleModal = () => {
        setIsOpen(prev => !prev);
    };

    const handleAddressChange = (data: { address: string }) => {
        if (data && data.address) {
            setUserInfo(prev => ({
                ...prev,
                address: data.address,
            }));
            setInputData(prev => ({
                ...prev,
                address: data.address,
            }));
            onToggleModal();
        } else {
            alert("주소를 다시 검색해주세요.");
        }
    };

    const handleAddressDetailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const addressDetail = event.target.value;
        setDetail(addressDetail);

        if (addressDetail === "") {
            setUserInfo(prev => ({
                ...prev,
                address_detail: "",
            }));
            setInputData(prev => ({
                ...prev,
                address_detail: "",
            }));
        } else {
            setUserInfo(prev => ({
                ...prev,
                address_detail: addressDetail,
            }));
            setInputData(prev => ({
                ...prev,
                address_detail: addressDetail,
            }));
        }
        console.log("Current detail:", addressDetail);
        console.log("User Info:", userInfo);
    };

    useEffect(() => {
        console.log("유저정보", userInfo);
    }, [userInfo]);

    const { isFocused, handleFocus, handleBlur } = useFocus();

    return (
        <>
            <Block.FlexBox direction="column" gap="16px">
                <Text.FocusedMenu isFocused={isFocused}>주소</Text.FocusedMenu>
                <Block.FlexBox gap="20px">
                    <Input.AddressBox
                        width="100%"
                        placeholder="예) 서울특별시 강서구 마곡중앙8로 71"
                        value={userInfo.address}
                        onClick={handleFocus}
                        onBlur={handleBlur}
                        disabled
                    />
                    <Button.Select onClick={onToggleModal}>주소 찾기</Button.Select>
                    <ReactModal
                        isOpen={isOpen}
                        onRequestClose={onToggleModal}
                        contentLabel="주소 검색"
                        style={{
                            overlay: {
                                zIndex: "999",
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
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
                        <DaumPostcode onComplete={handleAddressChange} />
                    </ReactModal>
                </Block.FlexBox>
                <Input.AddressBox
                    width="100%"
                    height="50px"
                    placeholder="상세 주소를 입력해주세요"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    value={detail}
                    onChange={handleAddressDetailChange}
                />
            </Block.FlexBox>
        </>
    );
}
