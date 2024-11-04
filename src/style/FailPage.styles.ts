// SuccessPage.styles.ts
import styled from "styled-components";

export const Container = styled.div`
  width: 600px;
  margin: 0 auto;
  text-align: center;
`;

export const BoxSection = styled.div`
  width: 600px;
  text-align: center;
  margin: 20px auto;
`;

export const Image = styled.img`
  width: 100px;
`;

export const Grid = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 16px;

  &.title {
    margin-top: 50px;
  }
`;

export const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;

  &.primary {
    background-color: #4e96f2;
    color: white;
  }

  &.secondary {
    background-color: #e8f3ff;
    color: #1b64da;
  }

  margin: 0 10px;
`;