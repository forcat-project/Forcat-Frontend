import React, { useEffect, useState, useCallback } from "react";
import { AxiosError } from "axios";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { IProducts } from "../../interfaces/product";
import { HeaderBackArrow } from "../../assets/svg";
import { Block, Input, Text } from "../../styles/ui";
import { Search as SearchIcon } from "../../assets/svg";
import {
  MarketContainer,
  ProductGrid,
  ProductCard,
  ProductImageContainer,
  ProductImage,
  ProductDetails,
  ProductCompany,
  ProductName,
  ProductPrice,
  OriginalPrice,
  DiscountRate,
  DiscountedPrice,
  SoldoutBox,
  LoadingMessage,
} from "../../components/Product/ProductContainer";
import { ProductQueryParams, productAPI } from "../../api/resourses/products";

export default function OnlySearch() {
  const navigate = useNavigate();
  const location = useLocation(); // Access the location object
  const queryParams = new URLSearchParams(location.search);
  const initialSearchTerm = queryParams.get("q") || ""; // 쿼리에서 검색어 가져오기

  const [searchTerm, setSearchTerm] = useState(initialSearchTerm); // 검색어 상태 설정
  const [products, setProducts] = useState<IProducts[]>([]); // 검색 결과 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태
  const [cursor, setCursor] = useState<string | null>(null); // 다음 페이지 요청을 위한 cursor 상태
  const [isFetching, setIsFetching] = useState<boolean>(false); // 데이터 요청 중인지 상태
  const [hasMore, setHasMore] = useState<boolean>(true); // 더 많은 데이터가 있는지 여부
  const [popularKeywords, setPopularKeywords] = useState<string[]>([]); // 인기 검색어 상태
  const [showPopularKeywords, setShowPopularKeywords] = useState<boolean>(true); // 인기 검색어 표시 상태

  useEffect(() => {
    const keyword = location.state?.keyword;
    if (keyword) {
      handleKeywordClick(keyword); // Call handleKeywordClick with the keyword
    }
  }, [location.state]);

  useEffect(() => {
    if (initialSearchTerm) {
      handleKeywordClick(initialSearchTerm);
    }
  }, [initialSearchTerm]);

  // 인기 검색어 API 호출
  useEffect(() => {
    const fetchPopularKeywords = async () => {
      try {
        const response = await productAPI.getPopularKeywords();

        // product_ids 배열에서 각 객체의 키를 추출하여 인기 검색어 목록 생성
        const keywords = response.data.product_ids.map(
          (item: any) => Object.keys(item)[0]
        ); // 각 객체의 첫 번째 키를 키워드로 사용

        setPopularKeywords(keywords); // 추출된 키워드로 인기 검색어 상태 업데이트
      } catch (error) {
        console.error("인기 검색어를 가져오는데 실패했습니다:", error);
      }
    };
    fetchPopularKeywords();
  }, []);

  // 인기 검색어 순서대로 그룹핑하여 배열 생성
  const orderedKeywords = [];
  for (let i = 0; i < 5; i++) {
    orderedKeywords.push([popularKeywords[i], popularKeywords[i + 5]]);
  }

  const handleKeywordClick = (keyword: string) => {
    setSearchTerm(keyword); // 선택한 키워드를 검색어로 설정
    navigate(`?q=${encodeURIComponent(keyword)}`);
    setProducts([]); // 이전 검색 결과 초기화
    setCursor(null); // cursor 초기화
    setHasMore(true); // 검색을 새로 시작할 때 더 많은 데이터가 있음을 가정
    setShowPopularKeywords(false); // 검색 시 인기 검색어 숨기기
    fetchProducts(keyword); // 선택한 키워드로 API 호출
  };

  // 검색어 입력 시 상태 업데이트
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // SearchIcon 클릭 시 검색어를 가지고 API 호출
  const handleSearchBarClick = () => {
    if (searchTerm.trim()) {
      setProducts([]); // 이전 검색 결과 초기화
      navigate(`?q=${encodeURIComponent(searchTerm)}`); // 검색어를 쿼리스트링에 추가
      setCursor(null); // cursor 초기화
      setHasMore(true); // 검색을 새로 시작할 때 더 많은 데이터가 있음을 가정
      setShowPopularKeywords(false); // 검색 시 인기 검색어 숨기기
      fetchProducts(searchTerm); // 새로운 검색어로 API 호출
    }
  };

  // Enter 키 입력 시 검색 실행
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchBarClick();
    }
  };

  // API 호출 함수
  const fetchProducts = async (
    searchValue: string,
    cursorValue: string | null = null
  ) => {
    if (isFetching || !hasMore) return;
    setIsFetching(true);
    setError(null);

    try {
      const params: ProductQueryParams = { name: searchValue };
      if (cursorValue) {
        params.cursor = decodeURIComponent(cursorValue);
      }

      const response = await productAPI.getProducts(params);
      const { results, next } = response.data;
      console.log("Received results:", results); // 받은 results 값 출력
      setProducts((prevProducts) => [...prevProducts, ...results]);

      const nextCursor = next ? new URL(next).searchParams.get("cursor") : null;
      console.log("Received cursor:", nextCursor); // 서버로부터 받은 cursor 값을 콘솔에 출력
      setCursor(nextCursor); // 다음 페이지를 위한 cursor 업데이트
      setHasMore(Boolean(nextCursor)); // 더 이상 데이터가 없으면 false로 설정
    } catch (err) {
      const errorMsg = (err as AxiosError).message;
      setError(`상품을 불러오는데 실패했습니다: ${errorMsg}`);
      console.error("API Error:", err);
    } finally {
      setLoading(false);
      setIsFetching(false);
    }
  };

  // cursor 값이 변경될 때마다 추가 데이터 요청
  useEffect(() => {
    if (cursor && !isFetching) {
      fetchProducts(searchTerm, cursor); // 저장된 cursor 값으로 추가 API 호출
    }
  }, [cursor, searchTerm, isFetching]);

  // 스크롤 이벤트 처리 함수
  const handleScroll = useCallback(() => {
    if (isFetching || !hasMore) return;
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      if (cursor && searchTerm.trim()) {
        fetchProducts(searchTerm, cursor); // cursor를 사용해 추가 API 요청
      }
    }
  }, [isFetching, hasMore, cursor, searchTerm]);

  // 스크롤 이벤트 등록 및 해제
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <Container>
      <SearchHeader>
        <HeaderBackArrow
          width={24}
          onClick={() => navigate("/search")}
          cursor="pointer"
        />
        <SearchBar>
          <Input.Search
            width="100%"
            placeholder="검색어를 입력해주세요"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
          />
          <SearchIcon
            width={24}
            style={{ marginLeft: "10px", cursor: "pointer" }}
            onClick={handleSearchBarClick}
          />
        </SearchBar>
      </SearchHeader>

      {/* 인기 검색어 리스트 */}
      {showPopularKeywords && (
        <PopularKeywordsContainer>
          <Text.TitleMenu200>인기 검색어</Text.TitleMenu200>

          <PopularKeywordsList>
            {orderedKeywords.map((row, rowIndex) => (
              <KeywordRow key={rowIndex}>
                {row.map(
                  (keyword, colIndex) =>
                    keyword && (
                      <KeywordItem
                        key={colIndex}
                        onClick={() => handleKeywordClick(keyword)} // 키워드 클릭 시 검색 수행
                        style={{ cursor: "pointer" }} // 클릭 가능하게 커서 스타일 추가
                      >
                        {" "}
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
      )}

      <MarketContainer>
        {loading && products.length === 0 ? (
          <p>검색 중입니다...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <ProductGrid>
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard
                  key={product.product_id}
                  onClick={() => navigate(`/market/${product.product_id}`)}
                >
                  <ProductImageContainer>
                    <ProductImage
                      src={product.thumbnail_url}
                      alt={product.name}
                    />
                    {product.remain_count === 0 && (
                      <SoldoutBox width="100%" height="100%">
                        SOLD OUT
                      </SoldoutBox>
                    )}
                  </ProductImageContainer>
                  <ProductDetails>
                    <ProductCompany>{product.company}</ProductCompany>
                    <ProductName>{product.name}</ProductName>
                    <ProductPrice>
                      {product.discount_rate !== "0.00" ? (
                        <>
                          <OriginalPrice>
                            {Math.round(product.price).toLocaleString()}원
                          </OriginalPrice>
                          <br />
                          <DiscountRate>
                            {Math.round(Number(product.discount_rate))}%
                          </DiscountRate>
                          <DiscountedPrice>
                            {Math.round(
                              product.discounted_price
                            ).toLocaleString()}
                            원
                          </DiscountedPrice>
                        </>
                      ) : (
                        <DiscountedPrice>
                          {Math.round(product.price).toLocaleString()}원
                        </DiscountedPrice>
                      )}
                    </ProductPrice>
                  </ProductDetails>
                </ProductCard>
              ))
            ) : (
              <LoadingMessage></LoadingMessage>
            )}
          </ProductGrid>
        )}
        {isFetching && (
          <LoadingMessage>Loading more products...</LoadingMessage>
        )}
      </MarketContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding-top: 20px;
  margin-bottom: 20px;
`;

const SearchHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 16px;
  background-color: #ffffff;
  width: 100%;
  margin: 0 auto;
  position: sticky;
  top: 0; // 스크롤 시에도 상단에 고정
  z-index: 10;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  padding: 8px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 24px;
  background-color: #ffffff;
  margin-left: 10px;
`;

const PopularKeywordsContainer = styled.div`
  width: 100%;
  padding: 40px;
  background-color: #f8f8f8;
`;

const PopularKeywordsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 30px;
`;

const KeywordRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const KeywordItem = styled.div`
  width: 250px;
  height: 35px;
  display: flex;
  align-items: center;
  gap: 20px;
  padding-left: 15px;
  border-radius: 10px;
  transition: background-color 0.3s; /* 부드러운 전환 효과 */

  &:hover {
    background-color: #f6ecd7;
  }
`;
