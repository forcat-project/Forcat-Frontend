import { useEffect, useState } from "react";
import styled from "styled-components";
import { Block } from "../../style/ui";
import Footer from "../../components/Home/Footer";
import CategoryBox from "../../components/Home/CategoryBox";
import BannerSlider from "../../components/Home/banner"; // BannerSlider import
import ChannelTalk from "../../components/Home/channelTalk"; // ChannelTalk import
import { productAPI } from "../../api/resourses/products"; // productAPI import
import { Text } from "../../style/ui";
export default function Home() {
  const [popularKeywords, setPopularKeywords] = useState<string[]>([]);
  const [showPopularKeywords] = useState<boolean>(true);

  // 인기 검색어 API 호출
  useEffect(() => {
    const fetchPopularKeywords = async () => {
      try {
        const response = await productAPI.getPopularKeywords();
        const keywords = response.data.product_ids.map(
          (item: any) => Object.keys(item)[0]
        );
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

  return (
    <>
      <ChannelTalk />
      <Block.FlexBox
        width="100%"
        margin="89px 0 93px 0"
        direction="column"
        justifyContent="space-between"
        gap="40px"
        style={{ overflow: "scroll", scrollbarWidth: "none" }}
      >
        {/* 배너 슬라이더 컴포넌트 */}
        <Block.FlexBox width="100%">
          <BannerSlider />
        </Block.FlexBox>

        {/* 각 카테고리 상품 리스트 */}
        <Text.TitleMenu200
          style={{ marginLeft: "20px", marginBottom: "-30px" }}
        >
          🔎 포캣 인기검색어
        </Text.TitleMenu200>
        <Block.FlexBox direction="column" gap="40px">
          {/* 인기 검색어 리스트 */}
          {showPopularKeywords && (
            <PopularKeywordsContainer>
              <PopularKeywordsTitle>인기 검색어</PopularKeywordsTitle>
              <PopularKeywordsList>
                {orderedKeywords.map((row, rowIndex) => (
                  <KeywordRow key={rowIndex}>
                    {row.map(
                      (keyword, colIndex) =>
                        keyword && (
                          <KeywordItem
                            key={colIndex}
                            onClick={() => {}} // 키워드 클릭 시 검색 수행
                            style={{ cursor: "pointer" }}
                          >
                            <Rank>{rowIndex + 1 + colIndex * 5}</Rank>
                            <Keyword>{keyword}</Keyword>
                          </KeywordItem>
                        )
                    )}
                  </KeywordRow>
                ))}
              </PopularKeywordsList>
            </PopularKeywordsContainer>
          )}
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
          <CategoryBox
            categoryId={67}
            categoryName="💛 오직 포캣에서만!"
            morePagePath="/home/onlyforcat"
          />
        </Block.FlexBox>

        {/* 푸터 컴포넌트 */}
        <Footer />
      </Block.FlexBox>
    </>
  );
}

// 스타일 정의
const PopularKeywordsContainer = styled.div`
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 8px;
  margin: 10px 20px;
`;

const PopularKeywordsTitle = styled.h3`
  margin-bottom: 25px;
  font-weight: bold;
`;

const PopularKeywordsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const KeywordRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const KeywordItem = styled.div`
  display: flex;
  align-items: center;
  width: 45%;
`;

const Rank = styled.span`
  font-weight: bold;
  color: black;
  margin-right: 20px;
  font-size: 12px;
  min-width: 15px;
`;

const Keyword = styled.span`
  color: #333;
  font-weight: normal;
  font-size: 12px;
`;
