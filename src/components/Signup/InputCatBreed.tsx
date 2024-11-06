import { useState } from "react";
import useFocus from "../../hooks/useFocus";
import { Block, Input, Text } from "../../styles/ui";
import ForcatModal from "../Modal/ForcatModal";
import { Search } from "../../assets/svg";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { catState, inputState } from "../../store/atoms";
import axiosInstance from "../../api/axiosInstance";

interface CatBreed {
    breed_type: string;
    category_id: number;
}

export default function InputCatBreed() {
    const { isFocused, handleFocus, handleBlur } = useFocus();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [catBreeds, setCatBreeds] = useState<CatBreed[]>([]);
    const [catInfo, setCatInfo] = useRecoilState(catState);
    const [, setInputData] = useRecoilState(inputState);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const handleWantChoiceButtonClick = () => {
        setIsModalOpen(true);
        if (catBreeds.length === 0) {
            const fetchData = async () => {
                try {
                    const response = await axiosInstance.get(`/cat-breed`);
                    console.log(response);
                    setCatBreeds(response.data);
                } catch (error) {
                    console.log("동물 정보 가져오기 실패");
                }
            };
            fetchData();
        }
    };

    const handleSelectBreedClick = (breed: CatBreed) => {
        setCatInfo(prev => ({
            ...prev,
            cat_breed_name: breed.breed_type,
            cat_breed: breed.category_id,
        }));
        setInputData(prev => ({
            ...prev,
            catBreed: breed.category_id,
        }));
        setIsModalOpen(false);
    };

    const filteredCatBreeds = catBreeds.filter(breed =>
        breed.breed_type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <ForcatModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                width="100%"
                height="700px"
                title="묘종을 검색해주세요"
            >
                <Block.AbsoluteBox
                    padding="0 20px"
                    style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                >
                    <Block.FlexBox
                        width="100%"
                        height="43px"
                        borderRadius="19px"
                        padding="0 0 0 20px"
                        margin="20px 0 10px 0"
                        border="1px solid #E8E8E8"
                        justifyContent="center"
                        alignItems="center"
                        bgColor="#F8F8F8"
                    >
                        <Search width={21} height={21} />
                        <Input.Search
                            placeholder="검색어를 입력해주세요"
                            style={{ backgroundColor: "#F8F8F8" }}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </Block.FlexBox>

                    <ScrollableFlexBox direction="column" padding="20px 0">
                        {filteredCatBreeds.map((breed, index) => (
                            <HoverableFlexBox key={index} onClick={() => handleSelectBreedClick(breed)}>
                                <Text.Menu>{breed.breed_type}</Text.Menu>
                            </HoverableFlexBox>
                        ))}
                    </ScrollableFlexBox>
                </Block.AbsoluteBox>
            </ForcatModal>

            <Block.FlexBox direction="column" gap="20px">
                <Text.FocusedMenu isFocused={isFocused}>묘종</Text.FocusedMenu>
                <Input.InfoBox
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="선택해주세요"
                    value={catInfo.cat_breed_name || ""}
                    readOnly
                    onClick={handleWantChoiceButtonClick}
                    pointer
                />
            </Block.FlexBox>
        </>
    );
}

const HoverableFlexBox = styled(Block.FlexBox)`
    width: 100%;
    height: 40px;
    align-items: center;
    padding: 15px;
    border-radius: 10px;
    cursor: pointer;

    &:hover {
        background-color: #e8e8e8;
    }
`;

const ScrollableFlexBox = styled(Block.FlexBox)`
    overflow-y: auto;
    scrollbar-width: none;
    max-height: 453px;
    &::-webkit-scrollbar {
        display: none;
    }
`;
