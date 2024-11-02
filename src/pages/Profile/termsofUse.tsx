import { PageWrapper } from "../../style/ui";
import styled from "styled-components";

const images = [
  "../../../public/TermsofUse/이용약관1.png",
  "../../../public/TermsofUse/이용약관2.png",
  "../../../public/TermsofUse/이용약관3.png",
  "../../../public/TermsofUse/이용약관4.png",
  "../../../public/TermsofUse/이용약관5.png",
  "../../../public/TermsofUse/이용약관6.png",
  "../../../public/TermsofUse/이용약관7.png",
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
