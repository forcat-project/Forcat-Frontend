import { FooterLogo } from "../../assets/svg";
import { Block, Text } from "../../styles/ui";

export default function Footer() {
    const companyInfo = [
        { key: "회사명", value: "(주)엘지유플러스" },
        { key: "주소", value: "서울특별시 용산구 한강대로 32" },
        { key: "대표이사", value: "황현식" },
        { key: "사업자등록번호", value: "220-81-39938" },
        { key: "통신판매신고", value: "제2015-서울용산-00481호" },
        { key: "이메일", value: "cs@forCat.co.kr" },
        { key: "전화번호", value: "070-4080-0101" },
    ];

    return (
        <>
            <Block.FlexBox
                width="100%"
                height="446px"
                direction="column"
                padding="44px 25px 31px 25px"
                margin="30px 0 95px 0"
                bgColor="#f3f3f6"
                gap="40px"
            >
                <Block.FlexBox direction="column" gap="20px">
                    <FooterLogo width={36} />
                    <Text.Notice100 color="Gray">
                        이용약관 | <Text.Notice200 color="Gray">개인정보처리방침</Text.Notice200> |{" "}
                        <Text.Notice200 color="Gray">위치정보이용약관</Text.Notice200>{" "}
                    </Text.Notice100>
                </Block.FlexBox>
                <Block.FlexBox width="300px">
                    <Block.FlexBox direction="column" gap="10px">
                        {companyInfo.map((info, index) => (
                            <Text.Notice100 key={index} color="Gray">
                                {info.key}
                            </Text.Notice100>
                        ))}
                    </Block.FlexBox>

                    <Block.FlexBox direction="column" gap="10px">
                        {companyInfo.map((info, index) => (
                            <Text.Notice100 key={index} color="Gray">
                                {info.value}
                            </Text.Notice100>
                        ))}
                    </Block.FlexBox>
                </Block.FlexBox>
            </Block.FlexBox>
        </>
    );
}
