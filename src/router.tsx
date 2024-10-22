import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Market from "./pages/Market";
import Search from "./pages/Search";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import CategoryDetail from "./pages/Search/categoryDetail";

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
        path: "search",
        element: <Search />,
      },
      {
        path: "/search/:category_id",
        element: <CategoryDetail />,
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
