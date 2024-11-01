import styled from "styled-components";

export const StyledModal = styled.div`
  background: white;
  position: fixed; /* 모달을 화면의 정중앙에 고정 */
  top: 20%; /* 상단에서 약간 떨어진 위치로 설정 */
  left: 50%;
  transform: translate(-50%, -20%); /* 가운데 정렬 */
  width: 90%;
  max-width: 400px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  overflow-y: hidden; /* 내부 스크롤 방지 */
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 10px;
  margin-bottom: 10px;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #666;
  cursor: pointer;
`;

export const SaveButton = styled.button`
  background: none;
  border: none;
  color: #f4b647; /* 텍스트 색상 주황색 */
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin-bottom: 8px;
  background-color: #f9f9f9;
`;

export const ProfileImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledTextButton = styled.button`
  background: none;
  border: none;
  color: orange;
  cursor: pointer;
`;
