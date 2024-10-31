import { useEffect } from "react";
import { KAKAO_LOGIN_URL } from "../../api/constants";
import { BtnGoogle, BtnKakao, BtnNaver, LoginLogo } from "../../assets/svg";
import { Block, Text } from "../../style/ui";
import { getCookie } from "../../api/cookie";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const handleKakaoLoginClick = () => {
        window.location.href = `${KAKAO_LOGIN_URL}`;
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (getCookie("access_token") && getCookie("access_token") !== "undefined") {
            navigate("/profile");
        }
    }, []);

    return (
        <>
            <Block.FlexBox direction="column" alignItems="center" justifyContent="center" gap="34px">
                <Text.TitleMenu100>반려인 필수!</Text.TitleMenu100>
                <Text.TitleMenu300>고양이 커머스 1등 앱</Text.TitleMenu300>
                <LoginLogo width={108} height={59} />

                <Block.FlexBox width="100%" height="450px" bgColor="black">
                    이미지
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
