import { PageWrapper } from "../../style/ui";
import styled from "styled-components";

// 이미지 배열을 설정합니다.
const images = [
  "../../../public/PrivacyPolicy/개인정보처리방침1.png",
  "../../../public/PrivacyPolicy/개인정보처리방침2.png",
  "../../../public/PrivacyPolicy/개인정보처리방침3.png",
  "../../../public/PrivacyPolicy/개인정보처리방침4.png",
  "../../../public/PrivacyPolicy/개인정보처리방침5.png",
  "../../../public/PrivacyPolicy/개인정보처리방침6.png",
  "../../../public/PrivacyPolicy/개인정보처리방침7.png",
  "../../../public/PrivacyPolicy/개인정보처리방침8.png",
];

export default function TermsOfUse() {
  return (
    <PageWrapper>
      {images.map((src, index) => (
        <Image key={index} src={src} alt={`개인정보처리방침 ${index + 1}`} />
      ))}
    </PageWrapper>
  );
}

const Image = styled.img`
  width: 100%;
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
`;
