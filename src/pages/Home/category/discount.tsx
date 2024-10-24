import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import styled from "styled-components";
import { Block, Text } from "../../../style/ui";
import { useNavigate } from "react-router-dom";
import { IProducts } from "../../../interfaces/product";

export default function Discount() {
  const [products, setProducts] = useState<IProducts[]>([]);
  const [error, setError] = useState<AxiosError | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://125.189.109.17/api/products", {
        params: {
          categories: 1, // 최대 할인 카테고리 ID
          ordering: "-discount_rate", // 할인율 기준으로 정렬
        },
      })
      .then((response) => {
        setProducts(response.data.results);
      })
      .catch((error: AxiosError) => {
        setError(error);
      });
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Block.FlexBox direction="column" width="100%">
      <Text.TitleMenu200>지금 놓치면 안 될 최대 할인 상품</Text.TitleMenu200>
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

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 20px;
`;

const ProductCard = styled.div`
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;
