import React, { useEffect, useState, useCallback } from "react";
import axios, { AxiosError } from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IProducts } from "../../interfaces/product";
import { HeaderBackArrow } from "../../assets/svg";
import { Input } from "../../style/ui";
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

export default function OnlySearch() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 설정
  const [products, setProducts] = useState<IProducts[]>([]); // 검색 결과 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태
  const [cursor, setCursor] = useState<string | null>(null); // 다음 페이지 요청을 위한 cursor 상태
  const [isFetching, setIsFetching] = useState<boolean>(false); // 데이터 요청 중인지 상태
  const [hasMore, setHasMore] = useState<boolean>(true); // 더 많은 데이터가 있는지 여부

  // 검색어 입력 시 상태 업데이트
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // SearchIcon 클릭 시 검색어를 가지고 API 호출
  const handleSearchBarClick = () => {
    if (searchTerm.trim()) {
      setProducts([]); // 이전 검색 결과 초기화
      setCursor(null); // cursor 초기화
      setHasMore(true); // 검색을 새로 시작할 때 더 많은 데이터가 있음을 가정
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
      const response = await axios.get("http://125.189.109.17/api/products", {
        params: {
          name: searchValue,
          cursor: cursorValue ? decodeURIComponent(cursorValue) : null,
        },
      });
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
          onClick={() => navigate(-1)}
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

      <MarketContainer style={{ marginTop: "-10px" }}>
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
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 20px;
`;

const SearchHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background-color: #ffffff;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
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
