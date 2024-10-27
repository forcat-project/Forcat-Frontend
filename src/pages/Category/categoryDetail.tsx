// CategoryDetail.tsx
import React, { useEffect, useState, useCallback } from "react";
import axios, { AxiosError } from "axios";
import styled from "styled-components";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { IProducts } from "../../interfaces/product";
import WithBackAndIconHeader from "../../components/Header/WithBackAndIconHeader";

export default function CategoryDetail() {
  const { category_id } = useParams<{ category_id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [products, setProducts] = useState<IProducts[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const categoryName = location.state?.categoryName || "카테고리 상세";

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  const handleScroll = useCallback(() => {
    if (isFetching || !hasMore) return;
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      setIsFetching(true);
    }
  }, [isFetching, hasMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const fetchProducts = (cursor: string | null = null) => {
    if (isFetching || !hasMore) return;
    setIsFetching(true);
    axios
      .get("http://125.189.109.17/api/products", {
        params: {
          categories: category_id,
          cursor: cursor ? decodeURIComponent(cursor) : null,
        },
      })
      .then((response) => {
        const { results, next } = response.data;
        setProducts((prevProducts) => [...prevProducts, ...results]);
        const nextCursor = next
          ? new URL(next).search
              .slice(1)
              .split("&")
              .find((param) => param.startsWith("cursor="))
          : null;
        const originalCursor = nextCursor ? nextCursor.split("=")[1] : null;
        setCursor(originalCursor);
        setHasMore(Boolean(next));
        setIsFetching(false);
      })
      .catch((error: AxiosError) => {
        setError(error);
        setIsFetching(false);
      });
  };

  useEffect(() => {
    if (category_id) {
      fetchProducts();
    }
  }, [category_id]);

  useEffect(() => {
    if (cursor && !isFetching) {
      fetchProducts(cursor);
    }
  }, [cursor]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <PageContainer>
      <HeaderContainer>
        <WithBackAndIconHeader
          title={categoryName}
          handleBackButtonClick={handleBackButtonClick}
        />
      </HeaderContainer>
      <ContentContainer>
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
                        <PriceWrapper>
                          <DiscountRate>
                            {Math.round(Number(product.discount_rate))}%
                          </DiscountRate>
                          <DiscountedPrice>
                            {Math.round(
                              product.discounted_price
                            ).toLocaleString()}
                            원
                          </DiscountedPrice>
                        </PriceWrapper>
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
            <NoProductsMessage>
              해당 카테고리에 등록된 상품이 없습니다.
            </NoProductsMessage>
          )}
        </ProductGrid>
        {isFetching && (
          <LoadingMessage>Loading more products...</LoadingMessage>
        )}
        {!hasMore && (
          <LoadingMessage>모든 상품이 로드되었습니다.</LoadingMessage>
        )}
      </ContentContainer>
    </PageContainer>
  );
}

// Styled components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: hidden;
  background-color: #ffffff;
`;

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 600px;
  background-color: #ffffff;
  z-index: 10;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ContentContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-top: 80px;
  padding-bottom: 80px;
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
  padding: 20px;
`;

const ProductCard = styled.div`
  cursor: pointer;
  padding: 10px;
  border-radius: 10px;
  overflow: hidden;
  background-color: #ffffff; /* 배경색을 흰색으로 수정 */
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
  margin-right: 5px;
`;

const PriceWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const DiscountRate = styled.span`
  color: #fa7586;
  font-weight: bold;
  margin-right: 5px;
`;

const DiscountedPrice = styled.span`
  color: #333;
  font-weight: bold;
  font-size: 16px;
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

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 14px;
  padding: 10px;
`;
