import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { IProducts } from "../../interfaces/product";

export default function OnlySearch() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query") || ""; // 쿼리 파라미터에서 검색어 추출
  const [searchTerm, setSearchTerm] = useState(query); // 검색어 상태 설정
  const [products, setProducts] = useState<IProducts[]>([]); // 검색 결과 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태
  const [cursor, setCursor] = useState<string | null>(null); // 다음 페이지 요청을 위한 cursor 상태
  const [isFetching, setIsFetching] = useState<boolean>(false); // 데이터 요청 중인지 상태
  const [hasMore, setHasMore] = useState<boolean>(true); // 더 많은 데이터가 있는지 여부

  // 페이지 새로고침 시 query를 null로 설정
  useEffect(() => {
    if (query) {
      // query가 있을 경우 URL을 초기화
      navigate("/search", { replace: true }); // 검색어를 초기화한 URL로 이동
      setSearchTerm(""); // 검색어 초기화
      setProducts([]); // 이전 검색 결과도 초기화
    }
  }, [navigate]);

  // API 호출 함수
  const fetchProducts = async (
    searchValue: string,
    cursorValue: string | null = null
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://125.189.109.17/api/products", {
        params: { name: searchValue, cursor: cursorValue },
      });
      console.log("API Response:", response.data.results); // API 응답 데이터 확인
      setProducts((prevProducts) => [
        ...prevProducts,
        ...response.data.results,
      ]); // 이전 결과에 새로운 결과 추가
      const nextCursor = response.data.next
        ? new URL(response.data.next).searchParams.get("cursor")
        : null;
      setCursor(nextCursor); // 다음 페이지를 위한 cursor 업데이트
      setHasMore(Boolean(nextCursor)); // 더 이상 데이터가 없으면 false로 설정
    } catch (err) {
      setError("상품을 불러오는데 실패했습니다.");
      console.error("API Error:", err);
    } finally {
      setLoading(false);
      setIsFetching(false); // 데이터 요청 완료 후 상태 해제
    }
  };

  // 페이지 로드 및 검색어 변경 시 첫 API 요청 (name만 사용)
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query") || "";
    setSearchTerm(query);
    setProducts([]); // 검색어가 변경되면 이전 결과를 초기화
    if (query.trim()) {
      fetchProducts(query); // 검색어 있을 경우 API 호출
    }
  }, [location.search]); // location.search가 변경될 때마다 실행

  // 스크롤 이벤트 처리 함수
  const handleScroll = useCallback(() => {
    if (isFetching || !hasMore) return;
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      setIsFetching(true);
      if (cursor && searchTerm.trim()) {
        fetchProducts(searchTerm, cursor); // cursor를 사용해 추가 API 요청
      }
    }
  }, [isFetching, hasMore, cursor, searchTerm]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // 상품 클릭 시 marketDetail 페이지로 이동
  const handleProductClick = (productId: number) => {
    navigate(`/market/${productId}`); // 해당 상품의 product_id로 marketDetail 페이지로 이동
  };

  return (
    <MarketContainer>
      {loading && products.length === 0 ? (
        <p>검색 중입니다...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <ProductGrid>
          {products.map((product) => (
            <ProductCard
              key={product.product_id}
              onClick={() => handleProductClick(product.product_id)}
            >
              <ProductImageContainer>
                <ProductImage src={product.thumbnail_url} alt={product.name} />
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
                        {Math.round(product.price).toLocaleString()}원{" "}
                      </OriginalPrice>
                      <br />
                      <DiscountRate>
                        {Math.round(
                          Number(product.discount_rate)
                        ).toLocaleString()}
                        %
                      </DiscountRate>
                      <DiscountedPrice>
                        {Math.round(product.discounted_price).toLocaleString()}
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
          ))}
        </ProductGrid>
      )}
      {isFetching && <p>추가 상품을 불러오는 중입니다...</p>}
    </MarketContainer>
  );
}

// Styled components
const MarketContainer = styled.div`
  flex: 1;
  margin-top: 103px;
  margin-bottom: 93px;
  overflow-y: scroll;
  padding: 20px;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SearchTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 18px;
  color: #333;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const ProductCard = styled.div`
  cursor: pointer;
  padding: 10px;
  border-radius: 10px;
  overflow: hidden;
  transition: box-shadow 0.3s, transform 0.3s;
  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    transform: scale(1.05);
  }
`;

const ProductImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  overflow: hidden;
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  transition: transform 0.3s;
  ${ProductCard}:hover & {
    transform: scale(1.1);
  }
`;

const ProductDetails = styled.div`
  text-align: left;
  margin-top: 10px;
`;

const ProductCompany = styled.div`
  color: #999;
  font-size: 12px;
  margin-top: 5px;
  font-weight: bold;
`;

const ProductName = styled.div`
  margin: 10px 0;
  font-size: 14px;
`;

const ProductPrice = styled.div`
  font-size: 14px;
  color: #333;
  font-weight: bold;
`;

const OriginalPrice = styled.span`
  text-decoration: line-through;
  color: #999;
  margin-right: 10px;
`;

const DiscountRate = styled.span`
  color: #fa7586;
  margin-right: 10px;
  font-weight: bold;
`;

const DiscountedPrice = styled.span`
  color: #333;
  font-weight: bold;
`;

const SoldoutBox = styled.div<{ width?: string; height?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 18px;
  font-weight: bold;
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "100%"};
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
`;
