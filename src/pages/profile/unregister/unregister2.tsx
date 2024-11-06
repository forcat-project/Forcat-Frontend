import { PageWrapper, Text, Block, Button, ContentWrapper, Margin } from "../../../styles/ui";
import styled from "styled-components";
import { Checked, Unchecked, Warning } from "../../../assets/svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ForcatModal from "../../../components/Modal/ForcatModal";
import { userAPI } from "../../../api/resourses/users"; // userAPI 임포트
import { useUserId } from "../../../hooks/useUserId"; // useUserId 훅 가져오기

export default function Unregister2() {
    const [isChecked, setIsChecked] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가
    const navigate = useNavigate();
    const userId = useUserId(); // 유저 ID 가져오기

    // 토글 함수
    const toggleCheck = () => {
        setIsChecked(prev => !prev);
    };

    const openModal = () => {
        if (isChecked) {
            setIsModalOpen(true); // 체크된 경우 모달 열기
        }
    };

    // 탈퇴 함수
    const handleUnregister = async () => {
        try {
            if (userId) {
                await userAPI.deleteUser(userId);
                alert("탈퇴가 완료되었습니다.");
                navigate("/home"); // 탈퇴 후 홈 페이지로 이동
            } else {
                console.error("유저 ID가 유효하지 않습니다.");
            }
        } catch (error) {
            console.error("탈퇴에 실패했습니다.", error);
            alert("탈퇴에 실패했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <PageWrapper>
            <ContentWrapper>
                <Block.FlexBox direction="column" gap="20px" padding="0 20px">
                    <Block.FlexBox direction="column" gap="5px">
                        <Text.TitleMenu300>
                            <Text.TitleMenu300 color="Warning">잠깐! </Text.TitleMenu300> 꼭 확인해주세요.
                        </Text.TitleMenu300>
                        <Text.TitleMenu100>탈퇴하시면 소중한 기록을 더이상 볼 수 없어요.</Text.TitleMenu100>
                    </Block.FlexBox>

                    <Text.Menu200 color="Warning">모든 정보와 데이터가 삭제되면 복구가 불가능해요!</Text.Menu200>
                    <Block.FlexBox justifyContent="center" margin="150px 0 80px 0">
                        <StyledImage src="/unregister/unregister.jpg" alt="탈퇴 이미지" />
                    </Block.FlexBox>
                    <Margin direction="column" size={20} />

                    <Text.TitleMenu200>회원 탈퇴 안내</Text.TitleMenu200>

                    <InfoList>
                        <Text.Mini>탈퇴 이후 데이터 삭제로 인해 고객센터 대응에 어려움이 있을 수 있어요.</Text.Mini>
                        <Text.Mini>
                            상품 배송 전 탈퇴할 경우 구매 정보가 삭제되어 배송이 어려우니 신중히 선택해 주세요.
                        </Text.Mini>
                        <Text.Mini>
                            포캣 탈퇴 후 재가입 하더라도 탈퇴 전 보유하고 있던 쿠폰, 생선 포인트, <br />
                            이벤트 진행 내역 등 모든 정보는 삭제되어 복구가 불가능해요.
                        </Text.Mini>
                        <Text.Mini>
                            포캣 서비스 이용에 불편이 있어 탈퇴를 결정하셨다면, 포캣 채널톡으로 불편사항을 말씀해
                            주세요.
                        </Text.Mini>
                    </InfoList>

                    <AgreementBox onClick={toggleCheck}>
                        <Block.FlexBox alignItems="center" gap="12px">
                            {isChecked ? <Checked width={18} height={18} /> : <Unchecked width={18} height={18} />}{" "}
                            <Text.Menu color="Gray600">안내사항을 모두 확인하였습니다.</Text.Menu>
                        </Block.FlexBox>
                    </AgreementBox>
                </Block.FlexBox>
            </ContentWrapper>
            <Block.AbsoluteBox
                bottom="1%"
                padding="0 20px"
                zIndex="3"
                style={{ width: "100%", display: "flex", justifyContent: "center" }}
            >
                <Block.FlexBox width="100%" height="93px" justifyContent="center" alignItems="center" gap="12px">
                    <Button.CartButton onClick={openModal} isSoldOut={!isChecked}>
                        탈퇴 동의
                    </Button.CartButton>
                    <Button.BuyButton cursor="pointer" isSoldOut={false} onClick={() => navigate("/home")}>
                        계속 이용할게요
                    </Button.BuyButton>
                </Block.FlexBox>
            </Block.AbsoluteBox>

            {/* ForcatModal */}
            <ForcatModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} title="" width="100%" height="200px">
                {/* 모달 내용 */}
                <Block.FlexBox direction="column" alignItems="center">
                    <Warning width="40px" height="40px" style={{ marginBottom: "15px" }} />
                    <Text.TitleMenu300>정말 포캣을 탈퇴하시겠어요?</Text.TitleMenu300>
                    <Block.FlexBox width="100%" height="93px" justifyContent="center" alignItems="center" gap="12px">
                        <Button.CartButton onClick={handleUnregister} isSoldOut={false}>
                            포캣 탈퇴
                        </Button.CartButton>
                        <Button.BuyButton cursor="pointer" isSoldOut={false} onClick={() => setIsModalOpen(false)}>
                            취소
                        </Button.BuyButton>
                    </Block.FlexBox>
                </Block.FlexBox>
            </ForcatModal>
        </PageWrapper>
    );
}

const InfoList = styled.ul`
    list-style-type: none;
    padding: 0;
    color: #555;
    font-size: 14px;
    line-height: 1.5;
    text-align: left;
    max-width: 600px;
    li {
        margin-bottom: 10px;
    }
`;

const AgreementBox = styled.div`
    height: 30px;
    position: fixed;
    bottom: 100px;
    cursor: pointer;
`;

const StyledImage = styled.img`
    /* max-width: 100%; */
    /* height: 300px; */
    width: 300px;
    margin-bottom: 20px;
`;
