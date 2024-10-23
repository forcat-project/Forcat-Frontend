import { Outlet, useLocation, useParams } from "react-router-dom";
import { Block } from "./style/ui";
import Navigator from "./components/Navigator";
import Header from "./components/Header";

function App() {
  const location = useLocation();
  const { productId } = useParams();
  console.log("Current Path:", location.pathname);
  console.log("Product ID:", productId);

  let pageType:
    | "market"
    | "search"
    | "home"
    | "cart"
    | "profile"
    | "marketDetail"
    | "categoryDetail" = "home";

  if (location.pathname === "/home") {
    pageType = "home";
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
        <Header pageType={pageType} />
        <Navigator />
      </Block.FlexBox>
    </>
  );
}

export default App;
