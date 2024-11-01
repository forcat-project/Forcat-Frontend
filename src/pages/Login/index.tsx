import { useEffect } from "react";
import { KAKAO_LOGIN_URL } from "../../api/constants";
import { BtnGoogle, BtnKakao, BtnNaver, LoginLogo } from "../../assets/svg";
import { Block, Img, Text } from "../../style/ui";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserId } from "../../hooks/useUserId";

export default function Login() {
    const handleKakaoLoginClick = () => {
        window.location.href = `${KAKAO_LOGIN_URL}`;
    };

    const navigate = useNavigate();
    const location = useLocation();

    const userId = useUserId();
    console.log("login ::::::::::::::::::::", userId);

    useEffect(() => {
        if (userId === null) {
            console.log("유저 아이디 없음! ~!~!!!!!!!!!!");
            navigate("/signup");
        } else {
            // navigate("/home");
            console.log("dddd");
        }
    }, [userId, location.search]);

    return (
        <>
            <Block.FlexBox direction="column" alignItems="center" justifyContent="center" gap="34px">
                <Text.TitleMenu100>반려인 필수!</Text.TitleMenu100>
                <Text.TitleMenu300>고양이 커머스 1등 앱</Text.TitleMenu300>
                <LoginLogo width={108} height={59} />

                <Block.FlexBox width="100%" height="450px" justifyContent="center" alignItems="center">
                    <Img.AngledIcon width="412px" height="340px" src="forcat_main_img.PNG" alt="포캣" />
                </Block.FlexBox>

                <Text.Notice100 color="Gray">SNS 계정으로 빠르게 시작해보세요!</Text.Notice100>
                <Block.FlexBox justifyContent="center" gap="45px">
                    <BtnKakao onClick={handleKakaoLoginClick} width={46} cursor="pointer" />
                    <BtnGoogle width={46} />
                    <BtnNaver width={46} />
                </Block.FlexBox>
            </Block.FlexBox>
        </>
    );
}
