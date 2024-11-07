import { HeaderBackArrow } from "../../assets/svg";
import { Block, HeaderContainer, Text } from "../../styles/ui";

type Props = {
  title: string;
  handleLoginBackButtonClick: () => void;
};
export default function LoginBackHeader({
  title,
  handleLoginBackButtonClick,
}: Props) {
  return (
    <>
      <HeaderContainer>
        <HeaderBackArrow
          width={24}
          onClick={handleLoginBackButtonClick}
          cursor="pointer"
        />
        <Block.FlexBox justifyContent="center">
          <Text.TitleMenu300>{title}</Text.TitleMenu300>
        </Block.FlexBox>
      </HeaderContainer>
    </>
  );
}
