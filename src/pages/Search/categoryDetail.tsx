import React, { useEffect, useState, useCallback } from "react";
import axios, { AxiosError } from "axios";
import styled from "styled-components";
import { useParams, useLocation } from "react-router-dom";
import Header from "../../components/Header"; // Header 컴포넌트 import
import { IProducts } from "../../interfaces/product";

export default function CategoryDetail() {
  const { category_id } = useParams<{ category_id: string }>();
  const location = useLocation();

  // location.state에서 categoryName을 가져오고, 만약 없으면 빈 문자열로 설정
  const initialCategoryName =
    (location.state as { categoryName: string })?.categoryName || "";

  const [categoryName, setCategoryName] = useState<string>(initialCategoryName);
  const [products, setProducts] = useState<IProducts[]>([]);
  const [cursor, setCursor] = useState<string | null>(null); // 다음 API 요청을 위한 cursor 상태
  const [error, setError] = useState<AxiosError | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false); // 데이터 요청 중인지 상태
  const [hasMore, setHasMore] = useState<boolean>(true); // 더 많은 데이터가 있는지 여부

  // 스크롤 이벤트 처리 함수
  const handleScroll = useCallback(() => {
    if (isFetching || !hasMore) return;
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      // 페이지 하단에 도달하면 추가 데이터를 요청
      setIsFetching(true);
    }
  }, [isFetching, hasMore]);

  // 스크롤 이벤트 리스너 추가 및 제거
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // 카테고리 이름을 불러오는 API 호출
  const fetchCategoryName = () => {
    axios
      .get(`http://125.189.109.17/api/categories/${category_id}`)
      .then((response) => {
        setCategoryName(response.data.name); // 받아온 이름을 상태로 설정
      })
      .catch((error: AxiosError) => {
        setError(error);
      });
  };

  // 제품 목록 불러오는 API 호출
  const fetchProducts = (cursor: string | null = null) => {
    if (isFetching || !hasMore) return;

    setIsFetching(true); // 데이터 요청 상태 설정
    axios
      .get("http://125.189.109.17/api/products", {
        params: {
          categories: category_id,
          cursor: cursor ? decodeURIComponent(cursor) : null,
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

  useEffect(() => {
    if (category_id) {
      if (!categoryName) {
        fetchCategoryName(); // 카테고리 이름 불러오기
      }
      fetchProducts(); // 첫 제품 목록 호출
    }
  }, [category_id, categoryName]);

  // cursor 값이 변경될 때마다 추가 데이터 요청
  useEffect(() => {
    if (cursor && !isFetching) {
      fetchProducts(cursor); // 저장된 cursor 값으로 추가 API 호출
    }
  }, [cursor]);

  // 데이터가 로드 중이거나 없을 때
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Header pageType="categoryDetail" title={categoryName} />
      <Container>
        {products.length > 0 ? (
          <ProductGrid>
            {products.map((product) => (
              <ProductCard key={product.product_id}>
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
                          {Math.round(product.price)}원
                        </OriginalPrice>
                        <br />
                        <DiscountRate>
                          {Math.round(Number(product.discount_rate))}%
                        </DiscountRate>
                        <DiscountedPrice>
                          {Math.round(product.discounted_price)}원
                        </DiscountedPrice>
                      </>
                    ) : (
                      <DiscountedPrice>
                        {Math.round(product.price)}원
                      </DiscountedPrice>
                    )}
                  </ProductPrice>
                </ProductDetails>
              </ProductCard>
            ))}
          </ProductGrid>
        ) : (
          <NoProductsMessage>
            해당 카테고리에 등록된 상품이 없습니다.
          </NoProductsMessage>
        )}
        {isFetching && <div>Loading more products...</div>}
        {!hasMore && <div>모든 상품이 로드되었습니다.</div>}
      </Container>
    </>
  );
}

// Styled components 유지

const Container = styled.div`
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
  transition: box-shadow 0.3s;
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const ProductImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: auto;
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
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

const NoProductsMessage = styled.div`
  color: #999;
  text-align: center;
  font-size: 16px;
  margin-top: 20px;
`;
