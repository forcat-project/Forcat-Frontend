// CheckoutPage.styles.ts
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  overflow: auto;
  width: 100%;
`;

export const MaxWidthContainer = styled.div`
  max-width: 500px;
  width: 100%;
`;

export const ButtonWrapper = styled.div`
  padding: 0 24px;
`;

export const Button = styled.button`
  padding: 11px 22px;
  border: none;
  border-radius: 8px;
  background-color: #f2f4f6;
  color: #4e5968;
  font-weight: 600;
  font-size: 17px;
  cursor: pointer;

  &.primary {
    background-color: #f4b647;
    color: #f9fcff;
  }
`;

export const CheckableLabel = styled.label`
  display: flex;
  align-items: center;
`;

export const Title = styled.h2`
  margin-top: 32px;
  margin-bottom: 0;
  color: #191f28;
  font-weight: bold;
  font-size: 24px;
  text-align: center;
`;

export const Description = styled.p`
  margin-top: 8px;
  color: #4e5968;
  font-size: 17px;
  font-weight: 500;
  text-align: center;
`;

export const ResponseSection = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-size: 20px;

  .response-label {
    font-weight: 600;
    color: #333d48;
    font-size: 17px;
  }

  .response-text {
    font-weight: 500;
    color: #4e5968;
    font-size: 17px;
    padding-left: 16px;
    word-break: break-word;
    text-align: right;
  }
`;