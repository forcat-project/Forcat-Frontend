import { HeaderBackArrow } from "../../assets/svg";
import { Block, HeaderContainer, Text } from "../../styles/ui";

type Props = {
  title: string;
  handleBackButtonClick: () => void;
};
export default function WithOnlyBackHeader({
  title,
  handleBackButtonClick,
}: Props) {
  return (
    <>
      <HeaderContainer>
        <HeaderBackArrow
          width={24}
          onClick={handleBackButtonClick}
          cursor="pointer"
        />
        <Block.FlexBox justifyContent="center">
          <Text.TitleMenu300>{title}</Text.TitleMenu300>
        </Block.FlexBox>
      </HeaderContainer>
    </>
  );
}
