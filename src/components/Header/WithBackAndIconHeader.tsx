import { Cart, HeaderBackArrow } from "../../assets/svg";
import { HeaderContainer, Text } from "../../styles/ui";

type Props = {
  title: string;
  handleBackButtonClick: () => void;
  handleCartButtonClick: () => void;
};

export default function WithBackAndIconHeader({
  title,
  handleBackButtonClick,
  handleCartButtonClick,
}: Props) {
  return (
    <HeaderContainer>
      <HeaderBackArrow
        width={24}
        onClick={handleBackButtonClick}
        cursor="pointer"
      />
      <Text.TitleMenu300>{title}</Text.TitleMenu300>
      <Cart width={21} cursor="pointer" onClick={handleCartButtonClick} />
    </HeaderContainer>
  );
}
