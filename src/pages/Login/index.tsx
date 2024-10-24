import { LoginLogo } from "../../assets/svg";
import { Block, Text } from "../../style/ui";

export default function Login() {
    return (
        <>
            <Block.FlexBox direction="column" alignItems="center">
                <Text.TitleMenu100>반려인 필수!</Text.TitleMenu100>
                <Text.TitleMenu300>고양이 커머스 1등 앱</Text.TitleMenu300>
                <LoginLogo width={108} height={59} />
                <Text.TitleMenu100>SNS 계정으로 로그인</Text.TitleMenu100>
                <Text.Notice100>카카오</Text.Notice100>
            </Block.FlexBox>
        </>
    );
}
