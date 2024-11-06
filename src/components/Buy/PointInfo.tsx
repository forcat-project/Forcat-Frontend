import { useEffect, useState, ChangeEvent } from "react";
import { Block, Text, Button, Input } from "../../styles/ui";
import styled, { keyframes } from "styled-components";
import { userAPI } from "../../api/resourses/users"; // userAPI 임포트
import { PointInfoProps } from "../../interfaces/info";
import { useUserId } from "../../hooks/useUserId"; // useUserId 훅 임포트

export default function PointInfo({ inputValue, setInputValue }: PointInfoProps) {
    const [points, setPoints] = useState<number>(0);
    const [alertMessage, setAlertMessage] = useState<string>("");
    const [shake, setShake] = useState<boolean>(false);
    const userId = useUserId(); // useUserId 훅 사용

    useEffect(() => {
        const fetchUserPoints = async () => {
            try {
                if (userId) {
                    const response = await userAPI.getUser(userId); // userAPI 사용
                    const { points } = response.data;
                    setPoints(points);
                }
            } catch (error) {
                console.error("사용자 포인트를 가져오는데 실패했습니다:", error);
            }
        };

        fetchUserPoints();
    }, [userId]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        // 문자가 입력되면 차단
        if (isNaN(Number(value))) {
            return;
        }

        setInputValue(value);

        if (Number(value) > points) {
            setAlertMessage("사용가능한 포인트를 초과하였습니다");
            setShake(true);
            setInputValue("");

            setTimeout(() => {
                setAlertMessage("");
                setShake(false);
            }, 5000);
        }
    };

    const handleAllInClick = () => {
        setInputValue(points.toString());
    };

    return (
        <PointContainer>
            <Text.TitleMenu300>포인트 사용</Text.TitleMenu300>
            <Text.Menu style={{ color: "#A6A9B8", marginTop: "20px" }}>포인트</Text.Menu>
            <Block.FlexBox alignItems="center" style={{ marginTop: "5px", gap: "12px" }}>
                <StyledInput
                    className={shake ? "shake" : ""}
                    placeholder="0"
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <Button.PointAllin onClick={handleAllInClick}>전액사용</Button.PointAllin>
            </Block.FlexBox>

            <Text.Notice200
                style={{
                    marginTop: "8px",
                    color: "#333",
                    alignSelf: "flex-end",
                    marginRight: "20px",
                }}
            >
                보유: {points}P
            </Text.Notice200>

            {alertMessage && <AlertMessage>{alertMessage}</AlertMessage>}
        </PointContainer>
    );
}

const PointContainer = styled(Block.FlexBox)`
    padding: 20px;
    margin-left: 10px;
    flex-direction: column;
`;

const shakeAnimation = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
`;

const StyledInput = styled(Input.InfoBox)`
    flex: 1;
    height: 40px;
    border-radius: 8px;
    padding: 10px 14px;
    font-size: 14px;
    border: 1px solid #d9d9d9;
    color: #000000;

    &.shake {
        animation: ${shakeAnimation} 0.3s ease;
    }
`;

const AlertMessage = styled.div`
    font-size: 12px;
    color: red;
    margin-top: 10px;
`;
