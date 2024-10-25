import { HeaderBackArrow } from "../../assets/svg";
import { Block, Text } from "../../style/ui";

type Props = {
    title: string;
    handleBackButtonClick: () => void;
};
export default function WithOnlyBackHeader({ title, handleBackButtonClick }: Props) {
    return (
        <>
            <HeaderBackArrow width={24} onClick={handleBackButtonClick} />
            <Block.FlexBox justifyContent="center">
                <Text.TitleMenu300>{title}</Text.TitleMenu300>
            </Block.FlexBox>
        </>
    );
}
