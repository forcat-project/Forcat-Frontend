import { Cart, HeaderBackArrow } from "../../assets/svg";
import { HeaderContainer, Text } from "../../styles/ui";

type Props = {
    title: string;
    handleBackButtonClick: () => void;
};
export default function WithBackAndIconHeader({ title, handleBackButtonClick }: Props) {
    return (
        <>
            <HeaderContainer>
                <HeaderBackArrow width={24} onClick={handleBackButtonClick} cursor="pointer" />
                <Text.TitleMenu300>{title}</Text.TitleMenu300>
                <Cart width={21} cursor="pointer" />
            </HeaderContainer>
        </>
    );
}
