import { useNavigate } from "react-router-dom";
import { Block, Img, Margin, Text } from "../styles/ui";

export default function NotFound() {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate("/home");
    };
    return (
        <>
            <Block.FlexBox
                width="100%"
                height="100%"
                justifyContent="center"
                alignItems="center"
                bgColor="white"
                direction="column"
            >
                <Block.FlexBox padding="0 0 50px 110px">
                    <Img.AngledIcon width="500px" height="350px" src="/404.PNG" alt="not found" />
                </Block.FlexBox>
                <Text.TitleMenu300 color="Warning">페이지를 찾을 수 없어요!</Text.TitleMenu300>
                <Margin direction="column" size={10} />
                <Text.Menu pointer onClick={handleGoHome}>
                    홈으로 돌아가기
                </Text.Menu>
            </Block.FlexBox>
        </>
    );
}
