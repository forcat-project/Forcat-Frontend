import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Market from "./pages/Market";

import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import CategoryDetail from "./pages/Category/categoryDetail";
import MarketDetail from "./pages/Market/marketDetail";
import MdRecommend from "./pages/Home/category/mdRecommend";
import Discount from "./pages/Home/category/discount";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OnlySearch from "./pages/Category/onlySearch";
import OnlyForCat from "./pages/Home/category/onlyForCat";
import Search from "./pages/Category";
import BestSeller from "./pages/Home/category/bestseller";

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
        ],
    },
]);
