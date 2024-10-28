import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil";
import { useEffect } from "react";
import InputUserName from "../../components/Signup/InputUserName";
import { Block, Button, Text } from "../../style/ui";

export default function Signup() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const userName = searchParams.get("nickname") || "";
    let userProfile = searchParams.get("profile_image") || "";

    if (userProfile && userProfile.startsWith("$")) {
        userProfile = userProfile.substring(1);
    }

    const [userInfo, setUserInfo] = useRecoilState(userState);

    useEffect(() => {
        setUserInfo(prev => ({
            ...prev,
            nickname: userName || prev.nickname,
            profile_picture: userProfile || prev.profile_picture,
        }));
    }, [userName, userProfile, setUserInfo]);

    console.log(userInfo);

    return (
        <>
            <Block.FlexBox direction="column" alignItems="center" justifyContent="space-between" padding="0 0 23px 0">
                <InputUserName userName={userName} />

                <Button.Confirm>
                    <Text.TitleMenu300 color="White">확인</Text.TitleMenu300>
                </Button.Confirm>
            </Block.FlexBox>
        </>
    );
}
