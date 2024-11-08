import { Search } from "../../assets/svg";
import { HeaderContainer, Text } from "../../styles/ui";

type Props = {
  title: string;
  handleProfileButtonClick: () => void;
};

export default function MarketHeader({
  title,
  handleProfileButtonClick,
}: Props) {
  return (
    <HeaderContainer>
      <Text.TitleMenu300>{title}</Text.TitleMenu300>
      <Search width={31} cursor="pointer" onClick={handleProfileButtonClick} />
    </HeaderContainer>
  );
}
