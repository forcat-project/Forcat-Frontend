import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";

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
