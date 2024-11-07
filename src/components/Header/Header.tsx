import { useLocation, matchPath } from "react-router-dom";
import HomeHeader from "./HomeHeader";
import MarketHeader from "./MarketHeader";
import ProfileHeader from "./ProfileHeader";
import WithOnlyBackHeader from "./WithOnlyBackHeader";
import WithBackAndIconHeader from "./WithBackAndIconHeader";
// import PaymentBackHeader from "./PaymentBackHeader";
import LoginBackHeader from "./LoginBackHeader";
type Props = {
  isLoginPage: boolean;
  isSignupPage: boolean;
  handleBackButtonClick: () => void;
  handlePaymentBackButtonClick: () => void;
  handleProfileClick: () => void;
  handleLoginBackButtonClick: () => void;
  handleProfileButtonClick: () => void;
  handleCartButtonClick: () => void;
};

export default function Header({
  // isLoginPage,
  isSignupPage,
  handleBackButtonClick,
  handleProfileClick,
  // handlePaymentBackButtonClick,
  handleLoginBackButtonClick,
  handleProfileButtonClick,
  handleCartButtonClick,
}: Props) {
  const location = useLocation();
  const currentPath = location.pathname;

  const pageData = [
    { path: "", title: "홈", component: HomeHeader },
    { path: "/home", title: "홈", component: HomeHeader },
    { path: "/market", title: "마켓", component: MarketHeader },
    { path: "/profile", title: "프로필", component: ProfileHeader },
    {
      path: "/market/:productId",
      title: "상품 상세",
      component: WithOnlyBackHeader,
    },
    { path: "/cart", title: "장바구니", component: WithOnlyBackHeader },
    {
      path: "home/bestseller",
      title: "베스트셀러",
      component: WithBackAndIconHeader,
    },
    {
      path: "home/discount",
      title: "최대 할인 상품",
      component: WithBackAndIconHeader,
    },
    {
      path: "home/mdrecommend",
      title: "MD 추천 상품",
      component: WithBackAndIconHeader,
    },
    {
      path: "home/onlyforcat",
      title: "오직 포캣에서만",
      component: WithBackAndIconHeader,
    },
    { path: "/buy", title: "상품 구매", component: WithOnlyBackHeader },
    {
      path: "/termsofuse",
      title: "서비스 이용약관",
      component: WithOnlyBackHeader,
    },
    {
      path: "/privacypolicy",
      title: "개인정보처리방침",
      component: WithOnlyBackHeader,
    },
    {
      path: "/unregister1",
      title: "회원탈퇴",
      component: WithOnlyBackHeader,
    },
    {
      path: "/unregister2",
      title: "회원탈퇴",
      component: WithOnlyBackHeader,
    },
    {
      path: "/purchaselist",
      title: "주문·배송",
      component: WithOnlyBackHeader,
    },
    {
      path: "/catadd",
      title: "고양이 정보 추가",
      component: WithOnlyBackHeader,
    },
    {
      path: "/orders/:userId/:orderId/details",
      title: "주문 상세",
      component: ProfileHeader,
    },
    {
      path: "/login",
      title: "",
      component: LoginBackHeader,
    },
  ];

  const currentPage = pageData.find((page) =>
    matchPath(page.path, currentPath)
  );

  if (isSignupPage || !currentPage) {
    return null;
  }

  const { component: HeaderComponent, title } = currentPage;

  return (
    <HeaderComponent
      title={title}
      handleBackButtonClick={handleBackButtonClick}
      handleProfileClick={handleProfileClick}
      // handlePaymentBackButtonClick={handlePaymentBackButtonClick}
      handleLoginBackButtonClick={handleLoginBackButtonClick}
      handleProfileButtonClick={handleProfileButtonClick}
      handleCartButtonClick={handleCartButtonClick}
    />
  );
}
