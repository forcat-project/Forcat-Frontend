import { useEffect, useState, ChangeEvent } from "react"; // 'ChangeEvent'를 import합니다.
import { Block, Text, Button, Input } from "../../style/ui";
import styled, { keyframes } from "styled-components"; // keyframes를 import합니다.
import axiosInstance from "../../api/axiosInstance"; // axios 인스턴스를 import합니다.

export default function PointInfo() {
  const [points, setPoints] = useState<number>(0); // 포인트 상태를 관리하는 변수
  const [inputValue, setInputValue] = useState<string>(""); // 입력값 상태를 관리하는 변수
  const [alertMessage, setAlertMessage] = useState<string>(""); // 알림 메시지를 관리하는 변수
  const [shake, setShake] = useState<boolean>(false); // 진동 효과 상태

  // 사용자 ID를 가정합니다.
  const userId = 5;

  useEffect(() => {
    // 사용자 포인트를 가져오는 비동기 함수
    const fetchUserPoints = async () => {
      try {
        if (userId) {
          const response = await axiosInstance.get(`/users/${userId}`);
          const { points } = response.data;
          setPoints(points);
        }
      } catch (error) {
        console.error("사용자 포인트를 가져오는데 실패했습니다:", error);
      }
    };

    fetchUserPoints();
  }, [userId]);

  // 입력값이 변경될 때 호출되는 함수
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // 입력된 값이 사용 가능한 포인트보다 큰지 확인
    if (Number(value) > points) {
      setAlertMessage("사용가능한 포인트를 초과하였습니다");
      setShake(true); // 진동 효과를 활성화합니다.
      setInputValue("");

      // 5초 후에 알림 메시지를 숨기고 진동 효과를 제거합니다.
      setTimeout(() => {
        setAlertMessage("");
        setInputValue(""); // 입력값을 0으로 설정합니다.
        setShake(false); // 진동 효과를 비활성화합니다.
      }, 5000);
    }
  };

  // 전액 사용 버튼 클릭 시 호출되는 함수
  const handleAllInClick = () => {
    setInputValue(points.toString());
  };

  return (
    <PointContainer>
      <Text.TitleMenu300>포인트 사용</Text.TitleMenu300>
      <Text.Menu style={{ color: "#A6A9B8", marginTop: "20px" }}>
        포인트
      </Text.Menu>
      <Block.FlexBox
        alignItems="center"
        style={{ marginTop: "5px", gap: "12px" }}
      >
        <StyledInput
          className={shake ? "shake" : ""} // 진동 효과를 위한 클래스 추가
          placeholder="0"
          value={inputValue}
          onChange={handleInputChange} // 입력값이 변경될 때 호출
        />
        <Button.PointAllin onClick={handleAllInClick}>
          전액사용
        </Button.PointAllin>
      </Block.FlexBox>

      {/* 보유 포인트 표시 */}
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

      {/* 알림 메시지 */}
      {alertMessage && <AlertMessage>{alertMessage}</AlertMessage>}
    </PointContainer>
  );
}

// 스타일드 컴포넌트
const PointContainer = styled(Block.FlexBox)`
  padding: 20px;
  margin-left: 10px; /* 왼쪽 마진 추가 */
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
    animation: ${shakeAnimation} 0.3s ease; // 진동 효과 애니메이션
  }
`;

const AlertMessage = styled.div`
  font-size: 12px;
  color: red;
  margin-top: 10px;
`;
