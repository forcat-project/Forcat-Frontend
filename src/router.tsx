import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Market from "./pages/Market";
import Search from "./pages/Search";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import MarketDetail from "./pages/Market/marketDetail";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "home",
                element: <Home />,
            },
            {
                path: "market",
                element: <Market />,
            },
            {
                path: "market/:productId",
                element: <MarketDetail />,
            },
            {
                path: "search",
                element: <Search />,
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
