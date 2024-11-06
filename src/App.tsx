import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Block } from "./styles/ui";
import Navigator from "./components/Navigator";
import Header from "./components/Header/Header";
import useScrollRestoration from "./hooks/useScrollRestoration"; // 커스텀 훅 import

function App() {
    const navigate = useNavigate();
    const location = useLocation();

    const isMarketDetailPage = /^\/market\/\d+$/.test(location.pathname);
    const isLoginPage = location.pathname.startsWith("/login");
    const isSignupPage = location.pathname.startsWith("/signup");
    const isBuyPage = location.pathname.startsWith("/buy");
    const isPrivacyPolicyPage = location.pathname.startsWith("/privacypolicy");
    const isTermsOfUsePage = location.pathname.startsWith("/termsofuse");
    const isUnregister1Page = location.pathname.startsWith("/unregister1");
    const isUnregister2Page = location.pathname.startsWith("/unregister2");
    const isCartPage = location.pathname.startsWith("/cart");

    const handleBackButtonClick = () => {
        navigate(-1);
        useScrollRestoration();
    };

    const handleProfileClick = () => {
        navigate("/profile");
    };

    return (
        <>
            <Block.FlexBox bgColor="white">
                <Header
                    isLoginPage={isLoginPage}
                    isSignupPage={isSignupPage}
                    handleBackButtonClick={handleBackButtonClick}
                    handleProfileClick={handleProfileClick}
                />
                <Block.FlexBox>
                    <Outlet />
                </Block.FlexBox>

                <Navigator
                    isLoginPage={isLoginPage}
                    isSignupPage={isSignupPage}
                    isMarketDetailPage={isMarketDetailPage}
                    isBuyPage={isBuyPage}
                    isPrivacyPolicyPage={isPrivacyPolicyPage}
                    isTermsOfUsePage={isTermsOfUsePage}
                    isUnregister1Page={isUnregister1Page}
                    isUnregister2Page={isUnregister2Page}
                    isCartPage={isCartPage}
                />
            </Block.FlexBox>
        </>
    );
}

export default App;
