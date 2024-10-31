import { useEffect, useState } from "react";
import { KAKAO_LOGIN_URL } from "../../api/constants";
import { BtnGoogle, BtnKakao, BtnNaver, LoginLogo } from "../../assets/svg";
import { Block, Img, Text } from "../../style/ui";
import { setCookie } from "../../api/cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserId } from "../../hooks/useUserId";

export default function Login() {
    const handleKakaoLoginClick = () => {
        window.location.href = `${KAKAO_LOGIN_URL}`;
    };

    const navigate = useNavigate();
    const location = useLocation();

    const userId = useUserId();
    const [isCheckingUser, setIsCheckingUser] = useState(true);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const accessToken = queryParams.get("access_token");

        if (accessToken) {
            setCookie("access_token", accessToken, { path: "/", maxAge: 3600 });

            if (userId !== null) {
                navigate("/home");
            } else {
                navigate("/signup");
            }
        } else {
            console.log("로그인이 필요합니다.");
            navigate("/login");
        }

        setIsCheckingUser(false);
    }, [userId, location.search]);

    if (isCheckingUser) return <div>로딩 중...</div>;

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
