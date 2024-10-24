import { Outlet, useLocation, useParams } from "react-router-dom";
import { Block } from "./style/ui";
import Navigator from "./components/Navigator";
import Header from "./components/Header";
import { PageType } from "./interfaces/types";
import { useState, useEffect } from "react";

function App() {
  const location = useLocation();
  const { productId, category_id } = useParams(); // category_id 파라미터도 추가
  const [pageTitle, setPageTitle] = useState<string>("");

  useEffect(() => {
    console.log("Current pathname:", location.pathname);
    console.log("Page Type:", pageType);

    // 카테고리 상세일 때 categoryName을 설정
    if (location.pathname.startsWith("/search/") && category_id) {
      const state = location.state as { categoryName?: string };
      if (state?.categoryName) {
        setPageTitle(state.categoryName); // 상태에 categoryName이 있으면 설정
      } else {
        setPageTitle("카테고리 상세"); // 기본값
      }
    } else {
      switch (location.pathname) {
        case "/home":
          setPageTitle("Home");
          break;
        case "/home/bestseller":
          setPageTitle("베스트셀러");
          break;
        case "/home/discount":
          setPageTitle("최대 할인 상품");
          break;
        case "/home/mdrecommend":
          setPageTitle("MD 추천 상품");
          break;
        case "/home/onlypocket":
          setPageTitle("오직 포켓에서만");
          break;
        case "/market":
          setPageTitle("마켓");
          break;
        case "/cart":
          setPageTitle("장바구니");
          break;
        case "/search":
          setPageTitle("검색어를 입력해주세요");
          break;
        case "/search/onlysearch":
          setPageTitle("검색");
          break;
        default:
          setPageTitle("카테고리 상세");
          break;
      }
    }
  }, [location.pathname, category_id]); // category_id도 의존성에 추가

  let pageType: PageType = "home";

  if (location.pathname === "/home") {
    pageType = "home";
  } else if (location.pathname === "/home/bestseller") {
    pageType = "bestseller";
  } else if (location.pathname === "/home/discount") {
    pageType = "discount";
  } else if (location.pathname === "/home/mdrecommend") {
    pageType = "mdRecommend";
  } else if (location.pathname === "/home/onlypocket") {
    pageType = "onlyPocket";
  } else if (location.pathname === "/market" && !productId) {
    pageType = "market";
  } else if (location.pathname.startsWith("/market") && productId) {
    pageType = "marketDetail";
  } else if (location.pathname === "/cart") {
    pageType = "cart";
  } else if (location.pathname === "/search" && !category_id) {
    pageType = "search";
  } else if (location.pathname === "/search/onlysearch") {
    pageType = "onlySearch";
  } else if (location.pathname.startsWith("/search/") && category_id) {
    pageType = "categoryDetail"; // category_id가 있을 경우 카테고리 상세 페이지
  } else if (location.pathname === "/profile") {
    pageType = "profile";
  }

  return (
    <>
      <Block.FlexBox width="599px" height="100%" bgColor="white">
        <Outlet />
        <Header pageType={pageType} title={pageTitle} />
        <Navigator />
      </Block.FlexBox>
    </>
  );
}

export default App;
