import { HeaderLogo, Profile } from "../../assets/svg";
import { HeaderContainer } from "../../styles/ui";

type Props = {
  handleProfileClick: () => void;
};

export default function HomeHeader({ handleProfileClick }: Props) {
  return (
    <>
      <HeaderContainer>
        <HeaderLogo width={52} />
        <Profile width={31} cursor="pointer" onClick={handleProfileClick} />
      </HeaderContainer>
    </>
  );
}
