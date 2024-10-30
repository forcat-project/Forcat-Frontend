import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { IProducts } from "../../../interfaces/product";
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
} from "../../../components/Product/ProductContainer"; // 공통 Styled Components 가져오기
import { BASE_URL } from "../../../api/constants";

export default function MdRecommend() {
  const [products, setProducts] = useState<IProducts[]>([]);
  const [error, setError] = useState<AxiosError | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/products`, {
        params: {
          categories: 68, // MD 추천 카테고리 ID
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
    </MarketContainer>
  );
}
