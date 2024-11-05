import { PageWrapper } from "../../styles/ui";
import styled from "styled-components";

// 이미지 배열을 설정합니다.
const images = [
    "/PrivacyPolicy/PrivacyPolicy1.png",
    "/PrivacyPolicy/PrivacyPolicy2.png",
    "/PrivacyPolicy/PrivacyPolicy3.png",
    "/PrivacyPolicy/PrivacyPolicy4.png",
    "/PrivacyPolicy/PrivacyPolicy5.png",
    "/PrivacyPolicy/PrivacyPolicy6.png",
    "/PrivacyPolicy/PrivacyPolicy7.png",
    "/PrivacyPolicy/PrivacyPolicy8.png",
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
