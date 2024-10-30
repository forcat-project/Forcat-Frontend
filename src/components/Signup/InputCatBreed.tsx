import { useState } from "react";
import useFocus from "../../hooks/useFocus";
import { Block, Input, Text } from "../../style/ui";
import ForcatModal from "../Modal/ForcatModal";
import { Search } from "../../assets/svg";

export default function InputCatBreed() {
    const { isFocused, handleFocus, handleBlur } = useFocus();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleBreedSelectButtonClick = () => {
        setIsModalOpen(true);
    };

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
