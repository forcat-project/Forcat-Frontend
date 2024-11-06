import { Profile } from "../../assets/svg";
import { Text } from "../../styles/ui";

type Props = {
    title: string;
    handleProfileClick: () => void;
};

export default function ProfileHeader({ title, handleProfileClick }: Props) {
    return (
        <>
            <Text.TitleMenu300>{title}</Text.TitleMenu300>
            <Profile width={31} onClick={handleProfileClick} cursor="pointer" />
        </>
    );
}
