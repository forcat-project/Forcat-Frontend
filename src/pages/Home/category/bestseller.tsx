import React, { useEffect, useState, useCallback } from "react";
import axios, { AxiosError } from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IProducts } from "../../../interfaces/product";

export default function Bestseller() {
  const [products, setProducts] = useState<IProducts[]>([]);
  const [error, setError] = useState<AxiosError | null>(null);
  const [cursor, setCursor] = useState<string | null>(null); // cursor 상태 관리
  const [isFetching, setIsFetching] = useState<boolean>(false); // 데이터 요청 상태
  const [hasMore, setHasMore] = useState<boolean>(true); // 더 많은 데이터 여부 확인
  const navigate = useNavigate();

  // 스크롤 이벤트 처리 함수
  const handleScroll = useCallback(() => {
    if (isFetching || !hasMore) return;
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      // 페이지 하단에 도달하면 추가 데이터를 요청
      setIsFetching(true);
    }
  }, [isFetching, hasMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // 제품 목록 불러오는 API 호출
  const fetchProducts = (cursor: string | null = null) => {
    if (isFetching || !hasMore) return;

    setIsFetching(true); // 데이터 요청 상태 설정
    axios
      .get("http://125.189.109.17/api/products", {
        params: {
          categories: null, // categories는 null
          ordering: "-purchase_count", // 구매 횟수 기준으로 정렬
          cursor: cursor ? decodeURIComponent(cursor) : null, // cursor 값으로 페이지 처리
        },
      })
      .then((response) => {
        const { results, next } = response.data;
        setProducts((prevProducts) => [...prevProducts, ...results]); // 기존 제품에 새로운 제품 추가
        const nextCursor = next
          ? new URL(next).search
              .slice(1)
              .split("&")
              .find((param) => param.startsWith("cursor="))
          : null;
        const originalCursor = nextCursor ? nextCursor.split("=")[1] : null;
        setCursor(originalCursor); // 다음 API 요청을 위한 cursor 저장
        setHasMore(Boolean(next)); // 더 이상 데이터가 없으면 false로 설정
        setIsFetching(false); // 데이터 요청 완료
      })
      .catch((error: AxiosError) => {
        setError(error);
        setIsFetching(false);
      });
  };

  // 첫 로딩 시 제품 목록 호출
  useEffect(() => {
    fetchProducts(); // 첫 데이터 호출
  }, []);

  // cursor 값이 변경될 때마다 추가 데이터 요청
  useEffect(() => {
    if (cursor && !isFetching) {
      fetchProducts(cursor); // 저장된 cursor 값으로 추가 API 호출
    }
  }, [cursor]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <MarketContainer>
      <ProductGrid>
        {products.map((product) => (
          <ProductCard
            key={product.product_id}
            onClick={() => navigate(`/market/${product.product_id}`)} // 상품 클릭 시 상세 페이지로 이동
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
                      {Math.round(product.price).toLocaleString()}원
                    </OriginalPrice>
                    <br />
                    <DiscountRate>
                      {Math.round(
                        Number(product.discount_rate)
                      ).toLocaleString()}
                      %
                    </DiscountRate>
                    <DiscountedPrice>
                      {Math.round(product.discounted_price).toLocaleString()}원
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
      {isFetching && <LoadingMessage>Loading more products...</LoadingMessage>}
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

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const ProductCard = styled.div`
  cursor: pointer;
  padding: 10px;
  border-radius: 10px;
  overflow: hidden; /* 이미지 확대 시 카드 밖으로 넘치지 않도록 설정 */
  transition: box-shadow 0.3s, transform 0.3s; /* 부드러운 전환 효과 추가 */
  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* hover 시 그림자 강화 */
    transform: scale(1.05); /* hover 시 카드 확대 */
  }
`;

const ProductImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  overflow: hidden; /* 이미지 확대 시 잘림 방지 */
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  transition: transform 0.3s; /* 부드러운 전환 효과 추가 */
  ${ProductCard}:hover & {
    transform: scale(1.1); /* hover 시 이미지 확대 */
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
  font-size: 12px;
`;

const ProductPrice = styled.div`
  font-size: 14px;
  color: #333;
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

const LoadingMessage = styled.div`
  text-align: center;
  color: #999;
  font-size: 16px;
  margin-top: 20px;
`;

const EndOfListMessage = styled.div`
  text-align: center;
  color: #999;
  font-size: 16px;
  margin-top: 20px;
`;
