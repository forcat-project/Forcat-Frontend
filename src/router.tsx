import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Market from "./pages/Market";
import Search from "./pages/Search";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import CategoryDetail from "./pages/Search/categoryDetail";
import MarketDetail from "./pages/Market/marketDetail";
import Bestseller from "./pages/Home/category/bestseller";
import MdRecommend from "./pages/Home/category/mdRecommend";
import Discount from "./pages/Home/category/discount";
import OnlyPocket from "./pages/Home/category/onlyPocket";
import Login from "./pages/Login";

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
                path: "home",
                element: <Home />,
            },
            {
                path: "home/:mdrecommend",
                element: <MdRecommend />,
            },
            {
                path: "home/:bestseller",
                element: <Bestseller />,
            },
            {
                path: "home/:discount",
                element: <Discount />,
            },
            {
                path: "home/:onlypocket",
                element: <OnlyPocket />,
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
