import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import MdRecommend from "./pages/Home/category/mdRecommend";
import BestSeller from "./pages/Home/category/bestseller";
import Discount from "./pages/Home/category/discount";
import OnlyForCat from "./pages/Home/category/onlyForCat";
import Market from "./pages/Market";
import Search from "./pages/Category";
import OnlySearch from "./pages/Category/onlySearch";
import CategoryDetail from "./pages/Category/categoryDetail";
import MarketDetail from "./pages/Market/marketDetail";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import TermsOfUse from "./pages/Profile/termsofUse";
import PrivacyPolicy from "./pages/Profile/privacyPolicy";
import Unregister from "./pages/Profile/unregister/unregister1";
import Unregister2 from "./pages/Profile/unregister/unregister2";
import CheckoutPage from "./pages/Payments/PaymentComponent";
import SuccessPage from "./pages/Payments/SuccessPage";
import FailPage from "./pages/Payments/FailPage";
import Buy from "./pages/Buy";
import PaymentsDetail from "./pages/Payments/PaymentsDetail";
import PurchaseList from "./pages/Profile/purchase/purchaseList";
import CatAdd from "./pages/Signup/catAdd";

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

      {
        path: "purchaselist",
        element: <PurchaseList />,
      },
      {
        path: "catAdd",
        element: <CatAdd />,
      },
    ],
  },
]);
