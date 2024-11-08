import { createBrowserRouter } from "react-router-dom";
import App from "./App";

import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/home";
import MdRecommend from "./pages/home/category/mdRecommend";
import BestSeller from "./pages/home/category/bestseller";
import Discount from "./pages/home/category/discount";
import OnlyForCat from "./pages/home/category/onlyForCat";
import Market from "./pages/market";
import Search from "./pages/category";
import OnlySearch from "./pages/category/onlySearch";
import CategoryDetail from "./pages/category/categoryDetail";
import MarketDetail from "./pages/market/marketDetail";
import Cart from "./pages/cart";
import Profile from "./pages/profile";
import TermsOfUse from "./pages/profile/privacyPolicy";
import PrivacyPolicy from "./pages/profile/privacyPolicy";
import Unregister from "./pages/profile/unregister/unregister1";
import Unregister2 from "./pages/profile/unregister/unregister2";
import CheckoutPage from "./pages/payments/paymentComponent";
import SuccessPage from "./pages/payments/successPage";
import FailPage from "./pages/payments/failPage";
import Buy from "./pages/buy";
import PaymentsDetail from "./pages/payments/paymentsDetail";
import PurchaseList from "./pages/profile/purchase/purchaseList";
import CatAdd from "./pages/signup/catAdd";
import NotFound from "./pages/notFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
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

      {
        path: "purchaselist",
        element: <PurchaseList />,
      },
      {
        path: "catAdd",
        element: <CatAdd />,
      },
    ],
    errorElement: <NotFound />,
  },
]);
