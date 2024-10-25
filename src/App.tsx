import { Outlet, useLocation } from "react-router-dom";
import { Block } from "./style/ui";
import Navigator from "./components/Navigator";
import Header from "./components/Header/Header";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const isMarketDetailPage = /^\/market\/\d+$/.test(location.pathname);
  const isLoginPage = location.pathname.startsWith("/login");
  const isSignupPage = location.pathname.startsWith("/signup");

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <>
      <Block.FlexBox width="599px" height="100%" bgColor="white">
        <Header
          isLoginPage={isLoginPage}
          isSignupPage={isSignupPage}
          handleBackButtonClick={handleBackButtonClick}
          handleProfileClick={handleProfileClick}
        />
        <Outlet />
        <Navigator
          isLoginPage={isLoginPage}
          isSignupPage={isSignupPage}
          isMarketDetailPage={isMarketDetailPage}
        />
      </Block.FlexBox>
    </>
  );
}

export default App;
