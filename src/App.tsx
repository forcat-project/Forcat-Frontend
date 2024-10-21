import { Outlet, useLocation } from "react-router-dom";
import { Block } from "./style/ui";
import Navigator from "./components/Navigator";
import Header from "./components/Header";

function App() {
  const location = useLocation();

  let pageType: "products" | "search" | "home" | "cart" | "profile" = "home";

  switch (location.pathname) {
    case "/home":
      pageType = "home";
      break;
    case "/products":
      pageType = "products";
      break;
    case "/cart":
      pageType = "cart";
      break;
    case "/search":
      pageType = "search";
      break;
    case "/profile":
      pageType = "profile";
      break;
    default:
      pageType = "home";
      break;
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
