import { useEffect, useState, useCallback } from "react";
import axios, { AxiosError } from "axios";
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
} from "../../components/Product/ProductContainer"; // 공통 Styled Components 가져오기
import ChannelTalk from "../../components/Home/channelTalk"; // ChannelTalk import

export default function Market() {
  const [products, setProducts] = useState<IProducts[]>([]);
  const [error, setError] = useState<AxiosError | null>(null);
  const [cursor, setCursor] = useState<string | null>(null); // 다음 API 요청을 위한 cursor 상태
  const [isFetching, setIsFetching] = useState<boolean>(false); // 데이터 요청 중인지 상태
  const [hasMore, setHasMore] = useState<boolean>(true); // 더 많은 데이터가 있는지 여부
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

  // API 요청 함수
  const fetchProducts = (cursor: string | null = null) => {
    if (isFetching || !hasMore) return; // 중복 요청 방지 및 데이터 끝 체크
    setIsFetching(true); // 데이터 요청 상태 설정
    axios
      .get("https://forcat.store/api/products", {
        params: {
          name: null,
          categories: null,
          cursor: cursor ? decodeURIComponent(cursor) : null, // 이중 인코딩 방지
        },
      })
      .then((response) => {
        const { results, next } = response.data;
        console.log("받은 results:", results); // 받은 results 값 출력
        // 기존 상품에 새로운 상품 추가
        setProducts((prevProducts) => [...prevProducts, ...results]);
        // 다음 cursor 값을 설정 (URL 쿼리 파라미터에서 추출)
        const nextCursor = next
          ? new URL(next).search
              .slice(1)
              .split("&")
              .find((param) => param.startsWith("cursor="))
          : null;
        const originalCursor = nextCursor ? nextCursor.split("=")[1] : null;
        setCursor(originalCursor); // 다음 API 요청을 위한 cursor 저장
        console.log("받은 원본 cursor:", originalCursor); // 저장된 cursor 출력
        setHasMore(Boolean(next)); // 더 이상 데이터가 없으면 false로 설정
        setIsFetching(false); // 데이터 요청 완료
      })
      .catch((error: AxiosError) => {
        setError(error);
        setIsFetching(false);
        console.error("통신 실패:", error.message);
      });
  };

  // 컴포넌트가 마운트되었을 때 처음 API 호출
  useEffect(() => {
    if (!isFetching && products.length === 0) {
      fetchProducts(); // 처음 로딩 시 API 호출
    }
  }, []); // 빈 배열로 설정하여 컴포넌트가 처음 마운트될 때만 실행

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
    <MarketContainer>
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
