import { useEffect, useState, useCallback } from "react";
import { AxiosError } from "axios";
import styled from "styled-components";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { IProducts } from "../../interfaces/product";
import WithBackAndIconHeader from "../../components/Header/WithBackAndIconHeader";

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
} from "../../components/Product/ProductContainer"; // 공통 Styled Components 가져오기
import { ProductQueryParams, productAPI } from "../../api/resourses/products";
import { Block } from "../../styles/ui";

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
  const handleCartButtonClick = () => {
    navigate("/cart");
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

    const params: ProductQueryParams = { categories: Number(category_id) };
    if (cursor) {
      params.cursor = decodeURIComponent(cursor);
    }

    setIsFetching(true);
    productAPI
      .getProducts(params)
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
    <Block.FlexBox padding="170px 0 0 0">
      <PageContainer>
        <HeaderContainer>
          <WithBackAndIconHeader
            title={categoryName}
            handleBackButtonClick={handleBackButtonClick}
            handleCartButtonClick={handleCartButtonClick}
          />
        </HeaderContainer>
        <MarketContainer>
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
              <LoadingMessage>
                해당 카테고리에 등록된 상품이 없습니다.
              </LoadingMessage>
            )}
          </ProductGrid>
          {isFetching && (
            <LoadingMessage>Loading more products...</LoadingMessage>
          )}
        </MarketContainer>
      </PageContainer>
    </Block.FlexBox>
  );
}

// 기존의 다른 Styled Components는 그대로 유지
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
  overflow: hidden;
  /* background-color: #ffffff; */
`;

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 89px;
  max-width: 600px;
  background-color: #ffffff;
  z-index: 10;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
