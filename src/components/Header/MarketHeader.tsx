import { Search } from "../../assets/svg";
import { HeaderContainer, Text } from "../../styles/ui";

type Props = {
    title: string;
};

export default function MarketHeader({ title }: Props) {
    return (
        <>
            <HeaderContainer>
                <Text.TitleMenu300>{title}</Text.TitleMenu300>
                <Search width={31} />
            </HeaderContainer>
        </>
    );
}
