import { useEffect, useState } from "react";
import styled from "styled-components";
import { Block, Text } from "../../styles/ui";
import Footer from "../../components/Home/Footer";
import CategoryBox from "../../components/Home/CategoryBox";
import BannerSlider from "../../components/Home/Banner"; // BannerSlider import
import ChannelTalk from "../../components/Home/ChannelTalk"; // ChannelTalk import
import { productAPI } from "../../api/resourses/products"; // productAPI import
import { useNavigate } from "react-router-dom"; // useNavigate import
import HiddenImage from "../../components/Home/RandomPoint";

export default function Home() {
    const [popularKeywords, setPopularKeywords] = useState<string[]>([]);
    const navigate = useNavigate(); // useNavigate 훅 사용

    // 인기 검색어 API 호출
    useEffect(() => {
        const fetchPopularKeywords = async () => {
            try {
                const response = await productAPI.getPopularKeywords();
                const keywords = response.data.product_ids.map((item: any) => Object.keys(item)[0]);
                setPopularKeywords(keywords);
            } catch (error) {
                console.error("인기 검색어를 가져오는데 실패했습니다:", error);
            }
        };
        fetchPopularKeywords();
    }, []);

    // 인기 검색어 순서대로 그룹핑하여 배열 생성
    const orderedKeywords: string[][] = [];
    for (let i = 0; i < 5; i++) {
        orderedKeywords.push([popularKeywords[i], popularKeywords[i + 5]]);
    }

    // 인기 검색어 클릭 시 검색 페이지로 이동
    const handleKeywordClick = (keyword: string) => {
        navigate("/search/onlysearch", { state: { keyword } }); // 선택된 키워드를 함께 이동
    };

    return (
        <>
            <HiddenImage />
            <ChannelTalk />
            <Block.FlexBox
                width="100%"
                height="100vh"
                padding="80px 0 0 0"
                direction="column"
                gap="20px"
                style={{ overflow: "scroll", scrollbarWidth: "none" }}
            >
                {/* 배너 슬라이더 컴포넌트 */}
                <Block.FlexBox width="100%">
                    <BannerSlider />
                </Block.FlexBox>

                <Block.FlexBox direction="column" gap="30px">
                    <CategoryBox
                        categoryId={null}
                        categoryName="⏰ 지금 놓치면 안 될 최대 할인 상품"
                        morePagePath="/home/discount"
                        ordering="-discount_rate"
                    />

                    <CategoryBox
                        categoryId={null}
                        categoryName="🔥 가장 많이 팔리는 베스트셀러 상품"
                        morePagePath="/home/bestseller"
                        ordering="-purchase_count"
                    />
                    <CategoryBox
                        categoryId={68}
                        categoryName="✨ MD가 자신 있게 추천하는 특별한 상품"
                        morePagePath="/home/mdrecommend"
                    />

                    {/* 인기 검색어 리스트 */}
                    <PopularKeywordsContainer>
                        <Text.TitleMenu200>🔎 주간 인기 검색어</Text.TitleMenu200>
                        <PopularKeywordsList>
                            {orderedKeywords.map((row, rowIndex) => (
                                <KeywordRow key={rowIndex}>
                                    {row.map(
                                        (keyword, colIndex) =>
                                            keyword && (
                                                <KeywordItem
                                                    key={colIndex}
                                                    onClick={() => handleKeywordClick(keyword)} // 키워드 클릭 시 검색 페이지로 이동
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    <Block.FlexBox width="10px" justifyContent="center">
                                                        <Text.Menu200 color="Yellow">
                                                            {rowIndex + 1 + colIndex * 5}{" "}
                                                        </Text.Menu200>
                                                    </Block.FlexBox>
                                                    <Text.Menu200 color="Gray600">{keyword}</Text.Menu200>
                                                </KeywordItem>
                                            )
                                    )}
                                </KeywordRow>
                            ))}
                        </PopularKeywordsList>
                    </PopularKeywordsContainer>
                    <CategoryBox categoryId={67} categoryName="💛 오직 포캣에서만!" morePagePath="/home/onlyforcat" />
                </Block.FlexBox>

                {/* 푸터 컴포넌트 */}
                <Footer />
            </Block.FlexBox>
        </>
    );
}

// 스타일 정의
const PopularKeywordsContainer = styled.div`
    padding: 30px;
    background-color: #f8f8f8;
`;

const PopularKeywordsList = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    gap: 2px;
`;

const KeywordRow = styled.div`
    display: flex;
    gap: 30px;
`;

const KeywordItem = styled.div`
    width: 250px;
    height: 35px;
    display: flex;
    align-items: center;
    gap: 20px;
    /* border: 1px solid #e8e8e8; */
    padding-left: 15px;
    border-radius: 10px;
    transition: background-color 0.3s; /* 부드러운 전환 효과 */

    &:hover {
        background-color: #f6ecd7;
    }
`;
