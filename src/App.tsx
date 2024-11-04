import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Block } from "./style/ui";
import Navigator from "./components/Navigator";
import Header from "./components/Header/Header";
import useScrollRestoration from "./hooks/useScrollRestoration"; // 커스텀 훅 import

function App() {
    const navigate = useNavigate();
    const location = useLocation();

    const isMarketDetailPage = /^\/market\/\d+$/.test(location.pathname);
    const isLoginPage = location.pathname.startsWith("/login");
    const isSignupPage = location.pathname.startsWith("/signup");
    const isCartPage = location.pathname.startsWith("/cart");

    useScrollRestoration(); // 페이지 전환 시 스크롤 복원

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
                    isCartPage={isCartPage}
                />
            </Block.FlexBox>
        </>
    );
}

export default App;
