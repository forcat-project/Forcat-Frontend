import { PageWrapper } from "../../style/ui";
import styled from "styled-components";

<<<<<<< HEAD
const images = [
  "/TermsofUse/TermsofUse1.png",
  "/TermsofUse/TermsofUse2.png",
  "/TermsofUse/TermsofUse3.png",
  "/TermsofUse/TermsofUse4.png",
  "/TermsofUse/TermsofUse5.png",
  "/TermsofUse/TermsofUse6.png",
  "/TermsofUse/TermsofUse7.png",
  "/TermsofUse/TermsofUse8.png",
  "/TermsofUse/TermsofUse9.png",
  "/TermsofUse/TermsofUse10.png",
  "/TermsofUse/TermsofUse11.png",
=======
// 이미지 파일을 import합니다.
import termsofUse1 from "../../../public/TermsofUse/이용약관1.png";
import termsofUse2 from "../../../public/TermsofUse/이용약관2.png";
import termsofUse3 from "../../../public/TermsofUse/이용약관3.png";
import termsofUse4 from "../../../public/TermsofUse/이용약관4.png";
import termsofUse5 from "../../../public/TermsofUse/이용약관5.png";
import termsofUse6 from "../../../public/TermsofUse/이용약관6.png";
import termsofUse7 from "../../../public/TermsofUse/이용약관7.png";

// 이미지 배열을 설정합니다.
const images = [
  termsofUse1,
  termsofUse2,
  termsofUse3,
  termsofUse4,
  termsofUse5,
  termsofUse6,
  termsofUse7,
>>>>>>> fdcb618 (feat: 서비스이용약관 구현)
];

export default function TermsOfUse() {
  return (
    <PageWrapper>
      {images.map((src, index) => (
        <Image key={index} src={src} alt={`이용약관 ${index + 1}`} />
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
