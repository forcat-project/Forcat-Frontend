import { Outlet, useLocation, useParams } from "react-router-dom";
import { Block } from "./style/ui";
import Navigator from "./components/Navigator";
import Header from "./components/Header";
import { PageType } from "./interfaces/types"; // types.ts에서 PageType을 불러오기
import { useState, useEffect } from "react";

function App() {
  const location = useLocation();
  const { productId } = useParams();
  const [pageTitle, setPageTitle] = useState<string>("");

  // 각 페이지 타입에 따른 title 설정
  useEffect(() => {
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
        setPageTitle("검색");
        break;
      default:
        // CategoryDetail 같은 페이지는 categoryName이 직접 전달되어야 함
        if (location.pathname.startsWith("/search")) {
          const state = location.state as { categoryName?: string };
          if (state?.categoryName) {
            setPageTitle(state.categoryName);
          } else {
            setPageTitle("카테고리 상세");
          }
        }
        break;
    }
  }, [location.pathname]);

  let pageType: PageType = "home"; // PageType 타입 사용

  if (location.pathname === "/home") {
    pageType = "home";
  } else if (location.pathname === "/home/bestseller") {
    pageType = "bestseller"; // 베스트셀러 페이지
  } else if (location.pathname === "/home/discount") {
    pageType = "discount"; // 할인 페이지
  } else if (location.pathname === "/home/mdrecommend") {
    pageType = "mdRecommend"; // MD 추천 페이지
  } else if (location.pathname === "/home/onlypocket") {
    pageType = "onlyPocket"; // 오직 포켓 페이지
  } else if (location.pathname === "/market" && !productId) {
    pageType = "market";
  } else if (location.pathname.startsWith("/market") && productId) {
    pageType = "marketDetail";
  } else if (location.pathname === "/cart") {
    pageType = "cart";
  } else if (location.pathname === "/search") {
    pageType = "search";
  } else if (location.pathname.startsWith("/search")) {
    pageType = "categoryDetail";
  } else if (location.pathname === "/profile") {
    pageType = "profile";
  }

  return (
    <>
      <Block.FlexBox width="599px" height="100%" bgColor="white">
        <Outlet />
        <Header pageType={pageType} title={pageTitle} /> {/* 동적 title 전달 */}
        <Navigator />
      </Block.FlexBox>
    </>
  );
}

export default App;
