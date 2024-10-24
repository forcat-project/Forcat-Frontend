import { KAKAO_LOGIN_URL } from "../../api/constants";
import { BtnGoogle, BtnKakao, BtnNaver, LoginLogo } from "../../assets/svg";
import { Block, Text } from "../../style/ui";

export default function Login() {
    const handleKakaoLoginClick = () => {
        console.log(KAKAO_LOGIN_URL);
        window.location.href = `${KAKAO_LOGIN_URL}`;
    };
    return (
        <>
            <Block.FlexBox direction="column" alignItems="center" justifyContent="center">
                <Text.TitleMenu100>반려인 필수!</Text.TitleMenu100>
                <Text.TitleMenu300>고양이 커머스 1등 앱</Text.TitleMenu300>
                <LoginLogo width={108} height={59} />
                <Text.TitleMenu100 color="Gray">간편 로그인</Text.TitleMenu100>
                <Block.FlexBox justifyContent="center" gap="20px">
                    <BtnKakao onClick={handleKakaoLoginClick} width={46} cursor="pointer" />
                    <BtnGoogle width={46} />
                    <BtnNaver width={46} />
                </Block.FlexBox>
            </Block.FlexBox>
        </>
    );
}
