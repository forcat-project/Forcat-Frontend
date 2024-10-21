import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Market from "./pages/Market";
import Search from "./pages/Search";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";

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
                path: "products",
                element: <Market />,
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
