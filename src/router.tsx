import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/login_temp";
import Signup from "./pages/signup_temp";
import Home from "./pages/home_temp";
import MdRecommend from "./pages/home_temp/category/mdRecommend";
import BestSeller from "./pages/home_temp/category/bestseller";
import Discount from "./pages/home_temp/category/discount";
import OnlyForCat from "./pages/home_temp/category/onlyForCat";
import Market from "./pages/market_temp";
import Search from "./pages/category_temp";
import OnlySearch from "./pages/category_temp/onlySearch";
import CategoryDetail from "./pages/category_temp/categoryDetail";
import MarketDetail from "./pages/market_temp/marketDetail";
import Cart from "./pages/cart_temp";
import Profile from "./pages/profile_temp";
import TermsOfUse from "./pages/profile_temp/privacyPolicy";
import PrivacyPolicy from "./pages/profile_temp/privacyPolicy";
import Unregister from "./pages/profile_temp/unregister/unregister1";
import Unregister2 from "./pages/profile_temp/unregister/unregister2";
import CheckoutPage from "./pages/payments_temp/paymentComponent";
import SuccessPage from "./pages/payments_temp/successPage";
import FailPage from "./pages/payments_temp/failPage";
import Buy from "./pages/buy_temp";
import PaymentsDetail from "./pages/payments_temp/paymentsDetail";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "signup",
                element: <Signup />,
            },
            {
                path: "home",
                element: <Home />,
            },
            {
                path: "home/mdrecommend",
                element: <MdRecommend />,
            },
            {
                path: "home/bestseller",
                element: <BestSeller />,
            },
            {
                path: "home/discount",
                element: <Discount />,
            },
            {
                path: "home/onlyforcat",
                element: <OnlyForCat />,
            },
            {
                path: "market",
                element: <Market />,
            },
            {
                path: "search",
                element: <Search />,
            },
            {
                path: "search/onlysearch", // 새로운 경로 추가
                element: <OnlySearch />,
            },
            {
                path: "search/:category_id",
                element: <CategoryDetail />,
            },
            {
                path: "market/:productId",
                element: <MarketDetail />,
            },
            {
                path: "cart",
                element: <Cart />,
            },
            {
                path: "profile",
                element: <Profile />,
            },
            {
                path: "termsofuse",
                element: <TermsOfUse />,
            },

            {
                path: "privacypolicy",
                element: <PrivacyPolicy />,
            },
            {
                path: "unregister1",
                element: <Unregister />,
            },
            {
                path: "unregister2",
                element: <Unregister2 />,
            },
            {
                path: "payments",
                element: <CheckoutPage />,
            },
            {
                path: "success",
                element: <SuccessPage />,
            },
            {
                path: "fail",
                element: <FailPage />,
            },
            {
                path: "orders/:userId/:orderId/details",
                element: <PaymentsDetail />,
            },
            {
                path: "buy",
                element: <Buy />,
            },
        ],
    },
]);
