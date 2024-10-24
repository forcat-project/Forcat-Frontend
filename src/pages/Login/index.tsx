import { BtnGoogle, BtnKakao, BtnNaver, LoginLogo } from "../../assets/svg";
import { Block, Text } from "../../style/ui";

export default function Login() {
    return (
        <>
            <Block.FlexBox direction="column" alignItems="center" justifyContent="center">
                <Text.TitleMenu100>반려인 필수!</Text.TitleMenu100>
                <Text.TitleMenu300>고양이 커머스 1등 앱</Text.TitleMenu300>
                <LoginLogo width={108} height={59} />
                <Text.TitleMenu100>SNS 계정으로 로그인</Text.TitleMenu100>
                <Block.FlexBox justifyContent="center" gap="20px">
                    <BtnKakao width={46} />
                    <BtnGoogle width={46} />
                    <BtnNaver width={46} />
                </Block.FlexBox>
            </Block.FlexBox>
        </>
    );
}
