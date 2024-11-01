import { useEffect, useState } from "react";
import useFocus from "../../hooks/useFocus";
import { Block, Input, Text } from "../../style/ui";
import ForcatModal from "../Modal/ForcatModal";
import { Search } from "../../assets/svg";
import { useUserId } from "../../hooks/useUserId";
import axiosInstance from "../../api/axiosInstance";

export default function InputCatBreed() {
    const { isFocused, handleFocus, handleBlur } = useFocus();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleBreedSelectButtonClick = () => {
        setIsModalOpen(true);
    };
    const userId = useUserId();
    console.log("inputCatBreed ::::::::::::::::::::", userId);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(`/users/${userId}/cats`);
                console.log(response);
            } catch (error) {
                console.log("동물 정보 가져오기 실패");
            }
        };

        if (userId !== null) {
            fetchData();
        } else {
            console.log("유저아이디 받아오기 실패!!!", userId);
        }
    }, [userId]);

    return (
        <>
            <ForcatModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                width="599px"
                height="700px"
                title="묘종을 검색해주세요"
            >
                <Block.AbsoluteBox style={{ display: "flex", justifyContent: "center" }}>
                    <Block.FlexBox
                        width="560px"
                        height="43px"
                        borderRadius="19px"
                        padding="0 0 0 20px"
                        margin="20px 0 0 0"
                        border="1px solid #E8E8E8"
                        justifyContent="center"
                        alignItems="center"
                        bgColor="#F8F8F8"
                    >
                        <Search width={21} height={21} />
                        <Input.Search
                            placeholder="검색어를 입력해주세요"
                            border="1px solid red"
                            style={{ backgroundColor: "#F8F8F8" }}
                        />
                    </Block.FlexBox>
                </Block.AbsoluteBox>
            </ForcatModal>
            <Block.FlexBox direction="column" gap="20px">
                <Text.FocusedMenu isFocused={isFocused}>묘종</Text.FocusedMenu>
                <Input.InfoBox
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="선택해주세요"
                    onClick={handleBreedSelectButtonClick}
                />
            </Block.FlexBox>
        </>
    );
}
