import { PageWrapper } from "../../style/ui";
import styled from "styled-components";

// 이미지 파일을 import합니다.
import privacyPolicy1 from "../../../public/PrivacyPolicy/개인정보처리방침1.png";
import privacyPolicy2 from "../../../public/PrivacyPolicy/개인정보처리방침2.png";
import privacyPolicy3 from "../../../public/PrivacyPolicy/개인정보처리방침3.png";
import privacyPolicy4 from "../../../public/PrivacyPolicy/개인정보처리방침4.png";
import privacyPolicy5 from "../../../public/PrivacyPolicy/개인정보처리방침5.png";
import privacyPolicy6 from "../../../public/PrivacyPolicy/개인정보처리방침6.png";
import privacyPolicy7 from "../../../public/PrivacyPolicy/개인정보처리방침7.png";
import privacyPolicy8 from "../../../public/PrivacyPolicy/개인정보처리방침8.png";

// 이미지 배열을 설정합니다.
const images = [
  privacyPolicy1,
  privacyPolicy2,
  privacyPolicy3,
  privacyPolicy4,
  privacyPolicy5,
  privacyPolicy6,
  privacyPolicy7,
  privacyPolicy8,
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
