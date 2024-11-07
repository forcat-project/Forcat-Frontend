import { HeaderBackArrow } from "../../assets/svg";
import { Block, HeaderContainer, Text } from "../../styles/ui";

type Props = {
  title: string;
  handlePaymentBackButtonClick: () => void;
};
export default function PaymentBackHeader({
  title,
  handlePaymentBackButtonClick,
}: Props) {
  return (
    <>
      <HeaderContainer>
        <HeaderBackArrow
          width={24}
          onClick={handlePaymentBackButtonClick}
          cursor="pointer"
        />
        <Block.FlexBox justifyContent="center">
          <Text.TitleMenu300>{title}</Text.TitleMenu300>
        </Block.FlexBox>
      </HeaderContainer>
    </>
  );
}
