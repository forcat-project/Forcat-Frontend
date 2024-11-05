import { Search } from "../../assets/svg";
import { Text } from "../../style/ui";

type Props = {
    title: string;
};

export default function MarketHeader({ title }: Props) {
    return (
        <>
            <Text.TitleMenu300>{title}</Text.TitleMenu300>
            <Search width={31} />
        </>
    );
}
