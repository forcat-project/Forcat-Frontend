import { Block, Text, Button } from "../../styles/ui";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // useNavigate 훅을 import
import { useState } from "react"; // useState 훅을 import
import ForcatModal from "../Modal/ForcatModal"; // ForcatModal 컴포넌트 import
import { Warning } from "../../assets/svg";

export default function AccountManage() {
    const navigate = useNavigate(); // useNavigate 훅을 사용
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태 관리

    return (
        <Block.FlexBox direction="column" padding="0 20px" maxWidth="600px" margin="0 auto">
            {/* 계정 관리 타이틀 */}
            <Text.TitleMenu200>계정관리</Text.TitleMenu200>

            {/* 각 메뉴 항목 */}
            <Block.FlexBox direction="column" padding="10px 0">
                {/* 이용약관 */}
                <StyledButton isDisabled={false} onClick={() => navigate("/termsofuse")}>
                    <Text.Menu>이용약관</Text.Menu>
                    <Text.TitleMenu200 pointer color="Gray">
                        {">"}
                    </Text.TitleMenu200>
                </StyledButton>

                {/* 개인정보처리방침 */}
                <StyledButton isDisabled={false} onClick={() => navigate("/privacypolicy")}>
                    <Text.Menu>개인정보처리방침</Text.Menu>
                    <Text.TitleMenu200 pointer color="Gray">
                        {">"}
                    </Text.TitleMenu200>
                </StyledButton>

                {/* 로그아웃 */}
                <StyledButton isDisabled={false} onClick={() => setIsModalOpen(true)}>
                    <Text.Menu>로그아웃</Text.Menu>
                </StyledButton>

                {/* 회원탈퇴 */}
                <StyledButton isDisabled={false} onClick={() => navigate("/unregister1")}>
                    <Text.Menu>회원탈퇴</Text.Menu>
                </StyledButton>
            </Block.FlexBox>

            {/* 로그아웃 모달 */}
            <ForcatModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} title="" width="100%" height="215px">
                {/* 모달 내용 */}
                <Block.FlexBox width="100%" height="100%" direction="column" alignItems="center" gap="26px">
                    <Warning width="24px" height="24px" />
                    <Text.TitleMenu300>로그아웃 하시겠어요?</Text.TitleMenu300>
                    <Block.FlexBox width="100%" justifyContent="center" alignItems="center" gap="12px">
                        <Button.CartButton onClick={() => setIsModalOpen(false)} isSoldOut={false}>
                            취소
                        </Button.CartButton>
                        <Button.BuyButton
                            cursor="pointer"
                            isSoldOut={false}
                            onClick={() => {
                                // 세션에서 access_token 제거
                                sessionStorage.removeItem("access_token");
                                // 로그인 페이지로 이동
                                window.location.href = "/login";
                                setIsModalOpen(false);
                            }}
                        >
                            로그아웃
                        </Button.BuyButton>
                    </Block.FlexBox>
                </Block.FlexBox>
            </ForcatModal>
        </Block.FlexBox>
    );
}

// Styled Components
const StyledButton = styled(Button.Confirm)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 30px 10px 10px 10px;
    border: none;
    background: none;
    cursor: pointer;
    height: 40px;
`;
