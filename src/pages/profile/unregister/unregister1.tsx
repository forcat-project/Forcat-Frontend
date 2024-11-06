import { PageWrapper, Text, Block, Button } from "../../../styles/ui";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // useNavigate 훅 import

export default function Unregister() {
    const navigate = useNavigate(); // useNavigate 훅 사용

    return (
        <PageWrapper>
            <ContentWrapper>
                <StyledImage src="/unregister/unregister.jpg" alt="탈퇴 이미지" />
                <Text.TitleMenu300 style={{ color: "#F4B647", marginBottom: "10px" }}>
                    포캣을 탈퇴하신다니 슬퍼요
                </Text.TitleMenu300>
                <Text.TitleMenu300>정말 포캣을 탈퇴하시겠습니까?</Text.TitleMenu300>
            </ContentWrapper>
            <Block.AbsoluteBox
                bottom="1%"
                // left="0%"
                zIndex="3"
                style={{ width: "100%", display: "flex", justifyContent: "center" }}
            >
                <Block.FlexBox width="100%" height="93px" justifyContent="center" alignItems="center" gap="12px">
                    <Button.CartButton onClick={() => navigate("/unregister2")} isSoldOut={false}>
                        <Text.TitleMenu200 color="Yellow">확인</Text.TitleMenu200>
                    </Button.CartButton>
                    <Button.BuyButton cursor="pointer" isSoldOut={false} onClick={() => navigate("/home")}>
                        <Text.TitleMenu200 color="White">계속 이용할게요</Text.TitleMenu200>
                    </Button.BuyButton>
                </Block.FlexBox>
            </Block.AbsoluteBox>
        </PageWrapper>
    );
}

// Styled Components
const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh; // 화면 중앙에 정렬하기 위해 전체 높이 설정
`;

const StyledImage = styled.img`
    max-width: 100%;
    width: 100px;
    margin-bottom: 40px;
`;
