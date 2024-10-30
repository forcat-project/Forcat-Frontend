import { HeaderLogo, Profile } from "../../assets/svg";

type Props = {
    handleProfileClick: () => void;
};

export default function HomeHeader({ handleProfileClick }: Props) {
    return (
        <>
            <HeaderLogo width={52} />
            <Profile width={31} cursor="pointer" onClick={handleProfileClick} />
        </>
    );
}
