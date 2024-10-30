import { useState } from "react";
import useFocus from "../../hooks/useFocus";
import { Block, Input, Text } from "../../style/ui";
import ForcatModal from "../Modal/ForcatModal";

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
                title="모달타이틀"
            >
                내용
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
