import { PageWrapper } from "../../styles/ui";
import styled from "styled-components";

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
