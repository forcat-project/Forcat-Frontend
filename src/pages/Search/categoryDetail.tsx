import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
import styled from "styled-components";

// 상품 정보 인터페이스 정의
interface Product {
  product_id: number;
  name: string;
  price: number;
  thumbnail_url: string;
  discounted_price: number;
  discount_rate: string;
}

// 카테고리 디테일 인터페이스 정의
interface CategoryDetail {
  category_id: number;
  name: string;
}

export default function CategoryDetail() {
  const { category_id } = useParams<{ category_id: string }>(); // URL에서 category_id 추출
  const [products, setProducts] = useState<Product[]>([]);
  const [cursor, setCursor] = useState<string | null>(null); // 다음 API 요청을 위한 cursor
  const [error, setError] = useState<AxiosError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true); // 더 많은 데이터가 있는지 여부

  // API 호출 함수
  const fetchProducts = (cursor: string | null = null) => {
    setIsLoading(true);
    axios
      .get("http://125.189.109.17/api/products", {
        params: {
          name: null, // 상품 이름은 null로 설정
          cursor: cursor, // 초기에는 null
          categories: category_id, // 카테고리 ID를 params에 추가
        },
      })
      .then((response) => {
        const { results, next } = response.data;

        // 기존 상품 목록에 새로운 상품 추가
        setProducts((prevProducts) => [...prevProducts, ...results]);

        // 다음 cursor 값을 설정 (없으면 null)
        setCursor(next ? next : null);
        setHasMore(!!next); // 더 이상 데이터가 없으면 false로 설정
        setIsLoading(false);
      })
      .catch((error: AxiosError) => {
        setError(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (category_id) {
      fetchProducts(); // category_id가 변경될 때마다 API 호출
    }
  }, [category_id]);

  // 상품 목록을 더 불러오는 함수 (무한 스크롤)
  const loadMoreProducts = () => {
    if (hasMore && !isLoading) {
      fetchProducts(cursor); // 저장된 cursor를 사용하여 다음 상품 불러오기
    }
  };

  if (isLoading && products.length === 0) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Container>
      {products.length > 0 ? (
        <ProductList>
          {products.map((product) => (
            <ProductItem key={product.product_id}>
              <ProductImage src={product.thumbnail_url} alt={product.name} />
              <ProductName>{product.name}</ProductName>
              <ProductPrice>
                {product.discount_rate !== "0.00" ? (
                  <>
                    <OriginalPrice>{Math.round(product.price)}원</OriginalPrice>
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
            </ProductItem>
          ))}
        </ProductList>
      ) : (
        <NoProductsMessage>
          해당 카테고리에 등록된 상품이 없습니다.
        </NoProductsMessage>
      )}
      {hasMore && !isLoading && (
        <LoadMoreButton onClick={loadMoreProducts}>더보기</LoadMoreButton>
      )}
    </Container>
  );
}

// Styled components
const Container = styled.div`
  padding: 20px;
`;

const ProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const ProductItem = styled.div`
  text-align: center;
`;

const ProductImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
`;

const ProductName = styled.div`
  margin-top: 10px;
  font-size: 14px;
`;

const ProductPrice = styled.div`
  font-size: 14px;
  color: #333;
  margin-top: 5px;
`;

const OriginalPrice = styled.span`
  text-decoration: line-through;
  color: #999;
  margin-right: 5px;
`;

const DiscountRate = styled.span`
  color: red;
  margin-right: 5px;
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

const LoadMoreButton = styled.button`
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  background-color: #333;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #555;
  }
`;
