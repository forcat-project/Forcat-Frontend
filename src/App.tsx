import { Outlet } from "react-router-dom";

function App() {
  const location = useLocation();

  let pageType: "market" | "search" | "home" | "cart" | "profile" = "home";

  switch (location.pathname) {
    case "/home":
      pageType = "home";
      break;
    case "/market":
      pageType = "market";
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
