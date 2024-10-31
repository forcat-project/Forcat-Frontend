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

export const ChoiceModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export  const ChoiceModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const ChoiceModalHeader = styled.div`
  margin-bottom: 20px;
`;

export const ChoiceModalTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
`;

export const ChoiceModalBody = styled.div`
  margin-bottom: 20px;
  color: #666;
`;

export const ChoiceModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

export const ChoiceModalButton = styled.button<{ variant: 'primary' | 'secondary' }>`
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  border: 1px solid ${props => props.variant === 'primary' ? '#F4B647' : '#E8E8E8'};
  background-color: ${props => props.variant === 'primary' ? '#F4B647' : 'white'};
  color: ${props => props.variant === 'primary' ? 'white' : '#666'};

  &:hover {
    background-color: ${props => props.variant === 'primary' ? 'orange' : '#f5f5f5'};
  }
`;