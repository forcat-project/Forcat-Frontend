import { useEffect, useState, useCallback, useRef } from "react";
import { AxiosError } from "axios";
import { IProducts } from "../../interfaces/product";
import { useNavigate } from "react-router-dom";
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
} from "../../components/Product/ProductContainer";
import ChannelTalk from "../../components/Home/channelTalk";
import { ProductQueryParams, productAPI } from "../../api/resourses/products";

export default function Market() {
  const [products, setProducts] = useState<IProducts[]>([]);
  const [error, setError] = useState<AxiosError | null>(null);
  const [cursor, setCursor] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const navigate = useNavigate();

  // MarketContainer에 대한 참조 생성
  const containerRef = useRef<HTMLDivElement | null>(null);

  // 스크롤 이벤트 처리 함수
  const handleScroll = useCallback(() => {
    if (isFetching || !hasMore || !containerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

    // 스크롤 정보를 콘솔에 출력
    console.log("scrollTop:", scrollTop);
    console.log("clientHeight:", clientHeight);
    console.log("scrollHeight:", scrollHeight);

    if (scrollTop + clientHeight >= scrollHeight - 10) {
      console.log("스크롤이 하단에 도달했습니다. 추가 데이터를 요청합니다.");
      setIsFetching(true);

      if (cursor) {
        fetchProducts(cursor); // originalCursor 값으로 API 호출
      } else {
        console.log(
          "originalCursor 값이 null이어서 더 이상 데이터를 요청하지 않습니다."
        );
      }
    }
  }, [isFetching, hasMore]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      console.log("스크롤 이벤트가 추가되었습니다.");

      return () => {
        container.removeEventListener("scroll", handleScroll);
        console.log("스크롤 이벤트가 제거되었습니다.");
      };
    }
  }, [handleScroll]);

  // API 요청 함수
  const fetchProducts = (cursor: string | undefined = undefined) => {
    if (isFetching || !hasMore) return;
    setIsFetching(true);

    const params: ProductQueryParams = {};
    if (cursor) {
      params.cursor = decodeURIComponent(cursor);
    }

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
        console.log("받은 원본 cursor:", originalCursor);

        setHasMore(Boolean(next));
        setIsFetching(false);
      })
      .catch((error: AxiosError) => {
        setError(error);
        setIsFetching(false);
      });
  };

  useEffect(() => {
    if (!isFetching && products.length === 0) {
      fetchProducts();
    }
  }, [isFetching, products.length]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // `MarketContainer`에 명시적으로 `height`와 `overflow-y` 설정
  return (
    <MarketContainer
      ref={containerRef}
      style={{ height: "80vh", overflowY: "auto" }}
    >
      <ChannelTalk />
      <ProductGrid>
        {products.map((product) => (
          <ProductCard
            key={product.product_id}
            onClick={() => navigate(`/market/${product.product_id}`)}
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
                      {Math.round(Number(product.discount_rate))}%
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
      {isFetching && <div>Loading more products...</div>}
      {!hasMore && <div>모든 상품이 로드되었습니다.</div>}
    </MarketContainer>
  );
}