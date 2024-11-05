import { Cart, HeaderBackArrow } from "../../assets/svg";
import { Text } from "../../style/ui";

type Props = {
    title: string;
    handleBackButtonClick: () => void;
};
export default function WithBackAndIconHeader({ title, handleBackButtonClick }: Props) {
    return (
        <>
            <HeaderBackArrow width={24} onClick={handleBackButtonClick} />
            <Text.TitleMenu300>{title}</Text.TitleMenu300>
            <Cart width={21} />
        </>
    );
}
