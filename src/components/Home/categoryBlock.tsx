// categoryBlock.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import styled from "styled-components";
import { Block, Text } from "../../style/ui";
import { IProducts } from "../../interfaces/product";

interface CategoryBlockProps {
  categoryId: number;
  categoryName: string;
  morePagePath: string;
}

export default function CategoryBlock({
  categoryId,
  categoryName,
  morePagePath,
}: CategoryBlockProps) {
  const [products, setProducts] = useState<IProducts[]>([]);
  const [error, setError] = useState<AxiosError | null>(null);
  const navigate = useNavigate();

  // 카테고리 상품 상위 3개 불러오기
  useEffect(() => {
    const params: any = {
      categories: categoryId,
      limit: 3, // 상위 3개만 가져오기
    };

    // 카테고리 이름이 "가장 많이 팔리는 베스트셀러 상품"일 때 ordering 파라미터 추가
    if (categoryName === "🔥 가장 많이 팔리는 베스트셀러 상품") {
      params.ordering = "-purchase_count"; // -purchase_count로 정렬
    }

    axios
      .get("http://125.189.109.17/api/products", { params })
      .then((response) => {
        setProducts(response.data.results.slice(0, 3)); // 상위 3개만 표시
      })
      .catch((error: AxiosError) => {
        setError(error); // 오류가 발생하면 상태에 오류를 설정
      });
  }, [categoryId, categoryName]);

  // 오류가 발생하면 오류 메시지를 표시
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Block.FlexBox direction="column" width="100%" padding="0 15px">
      <Block.FlexBox justifyContent="space-between" alignItems="center">
        <Text.TitleMenu200>{categoryName}</Text.TitleMenu200>
        <MoreButton onClick={() => navigate(morePagePath)}>더보기</MoreButton>
      </Block.FlexBox>
      <ProductGrid>
        {products.map((product) => (
          <ProductCard
            key={product.product_id}
            onClick={() => navigate(`/market/${product.product_id}`)} // 상품 클릭 시 상세 페이지로 이동
          >
            <ProductImage src={product.thumbnail_url} alt={product.name} />
            <Text.Menu>{product.name}</Text.Menu>
            <Text.Menu>{product.price}원</Text.Menu>
            {product.discount_rate !== "0.00" && (
              <Text.Discount>{product.discount_rate}% 할인</Text.Discount>
            )}
          </ProductCard>
        ))}
      </ProductGrid>
    </Block.FlexBox>
  );
}

// 스타일 컴포넌트 정의
const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 1행에 3개씩 배치 */
  gap: 10px;
  margin-top: 20px;
`;

const ProductCard = styled.div`
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  &:hover {
    transform: scale(1.05); /* hover 시 약간 확대 */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* hover 시 그림자 */
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

const MoreButton = styled.button`
  background-color: transparent;
  border: none;
  color: #939292;
  cursor: pointer;
  font-size: 14px;
  /* text-decoration: underline; */
`;
