import { useEffect, useState } from "react";
import React from "react";
import Modal from "react-modal";
import UserProfile from "../../assets/svg/UserProfile";
import { Block, Text, Button } from "../../styles/ui";
import UserEdit from "../../pages/profile/userEdit";
import { useUserId } from "../../hooks/useUserId";

import { User } from "../../interfaces/info";
import { userAPI } from "../../api/resourses/users";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

interface UserInfoProps {
    onReload: () => void;
}
export default function UserInfo({ onReload }: UserInfoProps) {
    const [user, setUser] = useState<User | null>(null);
    const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const userId = useUserId();

    useEffect(() => {
        const fetchUserData = async () => {
            // userId가 null인 경우 로그인 페이지로 리다이렉트
            if (userId === null) {
                alert("로그인이 필요합니다.");
                navigate("/login");
                return;
            }

            try {
                const response = await userAPI.getUser(Number(userId));
                setUser(response.data);
            } catch (error) {
                console.error("사용자 정보를 가져오는데 실패했습니다:", error);
            }
        };

        fetchUserData();
    }, [userId, navigate]);

    // userId가 null이면 아무것도 렌더링하지 않음
    if (userId === null) return null;

    const toggleEditModal = () => {
        setEditModalOpen(!isEditModalOpen);
    };

    return (
        <Block.FlexBox direction="column" padding="20px" bgColor="white">
            <Block.FlexBox direction="row" justifyContent="space-between" alignItems="center">
                <Block.FlexBox direction="row" alignItems="center">
                    <Block.FlexBox width="70px" height="70px">
                        {user?.profile_picture ? (
                            <img
                                src={user.profile_picture}
                                alt="User Profile"
                                width="70"
                                height="70"
                                style={{ borderRadius: "50%" }}
                            />
                        ) : (
                            <UserProfile />
                        )}
                    </Block.FlexBox>
                    <Block.FlexBox margin="0 0 0 20px">
                        <Text.TitleMenu300>{user?.nickname}</Text.TitleMenu300>
                    </Block.FlexBox>
                </Block.FlexBox>

                <Button.EditButton onClick={toggleEditModal}>
                    <Text.Mini>편집</Text.Mini>
                </Button.EditButton>
            </Block.FlexBox>
            {/* 생선 포인트 UI 추가 */}
            <Block.FlexBox direction="row" alignItems="center" style={{ marginLeft: "10px" }}>
                <Text.TitleMenu300 style={{ marginRight: "10px" }}>🎣</Text.TitleMenu300>
                <Text.Notice100 color="Gray" style={{ marginRight: "10px" }}>
                    모은 생선 포인트
                </Text.Notice100>
                <Text.TitleMenu300>{user?.points} P</Text.TitleMenu300>
            </Block.FlexBox>
            <Modal
                isOpen={isEditModalOpen}
                onRequestClose={toggleEditModal}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    },
                    content: {
                        border: "none",
                        background: "transparent",
                        padding: 0,
                        inset: "auto",
                        maxWidth: "400px",
                        width: "90%",
                        borderRadius: "8px",
                        overflow: "visible",
                    },
                }}
            >
                {user && <UserEdit user={user} onClose={toggleEditModal} onReload={onReload} />}
            </Modal>
        </Block.FlexBox>
    );
}
