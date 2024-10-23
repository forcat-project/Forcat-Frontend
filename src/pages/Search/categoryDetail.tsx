import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios, { AxiosError } from "axios";
import styled from "styled-components";
import Header from "../../components/Header"; // Header 컴포넌트를 import
import { IProducts } from "../../interfaces/product";

export default function CategoryDetail() {
  const { category_id } = useParams<{ category_id: string }>();
  const location = useLocation();

  // location.state에서 categoryName을 가져오고, 만약 없으면 빈 문자열로 설정
  const initialCategoryName =
    (location.state as { categoryName: string })?.categoryName || "";

  console.log("Category ID:", category_id);
  console.log("Category Name from location.state:", initialCategoryName);

  const [categoryName, setCategoryName] = useState<string>(initialCategoryName);
  const [products, setProducts] = useState<IProducts[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    if (category_id) {
      // 만약 categoryName이 아직 설정되지 않았다면 fetchProductsAndCategoryName 호출
      if (!categoryName) {
        fetchCategoryName();
      }
      fetchProductsAndCategoryName();
    }
  }, [category_id, categoryName]);

  const fetchCategoryName = () => {
    // 카테고리 ID로 카테고리 이름을 가져오는 API 호출 (예시)
    axios
      .get(`http://125.189.109.17/api/categories/${category_id}`)
      .then((response) => {
        setCategoryName(response.data.name); // 받아온 이름을 상태로 설정
      })
      .catch((error: AxiosError) => {
        setError(error);
      });
  };

  const fetchProductsAndCategoryName = (cursor: string | null = null) => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    axios
      .get("http://125.189.109.17/api/products", {
        params: {
          categories: category_id,
          cursor: cursor,
        },
      })
      .then((response) => {
        const { results, next } = response.data;
        setProducts((prevProducts) => [...prevProducts, ...results]);
        setCursor(next ? next : null);
        setHasMore(!!next);
        setIsLoading(false);
      })
      .catch((error: AxiosError) => {
        setError(error);
        setIsLoading(false);
      });
  };

  if (isLoading && products.length === 0) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      {/* categoryName을 Header에 전달 */}
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
      </Container>
    </>
  );
}

// 스타일드 컴포넌트는 그대로 유지

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

const NoProductsMessage = styled.div`
  color: #999;
  text-align: center;
  font-size: 16px;
  margin-top: 20px;
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
