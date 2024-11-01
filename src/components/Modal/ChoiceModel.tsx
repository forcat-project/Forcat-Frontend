// ChoiceMoal.tsx
import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
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

const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
  margin-bottom: 20px;
`;

const ModalTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
`;

const ModalBody = styled.div`
  margin-bottom: 20px;
  color: #666;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const ModalButton = styled.button<{ variant: 'primary' | 'secondary' }>`
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

interface ModalComponentProps {
  title: string;
  bodyText: string;
  onPrimaryAction: () => void;
  onSecondaryAction: () => void;
  primaryButtonText: string;
  secondaryButtonText: string;
}

const ChoiceModal: React.FC<ModalComponentProps> = ({ 
  title, 
  bodyText, 
  onPrimaryAction, 
  onSecondaryAction, 
  primaryButtonText, 
  secondaryButtonText 
}) => {
  return (
    <ModalOverlay onClick={onSecondaryAction}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
        </ModalHeader>
        <ModalBody>
          {bodyText}
        </ModalBody>
        <ModalFooter>
          <ModalButton onClick={onSecondaryAction} variant="secondary">
            {secondaryButtonText}
          </ModalButton>
          <ModalButton onClick={onPrimaryAction} variant="primary">
            {primaryButtonText}
          </ModalButton>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ChoiceModal;