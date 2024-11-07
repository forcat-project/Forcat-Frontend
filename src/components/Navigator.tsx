import { useNavigate, useLocation } from "react-router-dom";
import {
  MarketDisabled,
  SearchDisabled,
  HomeDisabled,
  CartDisabled,
  ProfileDisabled,
  CatYellow,
  SearchYellow,
  HomeYellow,
  CartYellow,
  ProfileYellow,
} from "../assets/svg";
import { Block, NavContainer, Text } from "../styles/ui";
import { useUserId } from "../hooks/useUserId";

type Props = {
  isLoginPage: boolean;
  isSignupPage: boolean;
  isMarketDetailPage: boolean;
  isBuyPage: boolean;
  isPrivacyPolicyPage: boolean;
  isTermsOfUsePage: boolean;
  isUnregister1Page: boolean;
  isUnregister2Page: boolean;
  isCartPage: boolean;
  isCatAddPage: boolean;
  isPaymentsDetailPage: boolean;
};

export default function Navigator({
  isLoginPage,
  isSignupPage,
  isMarketDetailPage,
  isBuyPage,
  isPrivacyPolicyPage,
  isTermsOfUsePage,
  isUnregister1Page,
  isUnregister2Page,
  isCartPage,
  isCatAddPage,
  isPaymentsDetailPage,
}: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  const userId = useUserId();

  const handleNavigation = (path: string) => {
    // 장바구니나 프로필 페이지로 이동하려고 할 때
    if ((path === "/cart" || path === "/profile") && !userId) {
      // userId가 없으면 (로그인하지 않은 상태) 로그인 페이지로 리다이렉트
      alert("로그인이 필요합니다.");
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    navigate(path);
  };

  const navItems = [
    {
      icon:
        location.pathname === "/market" ? (
          <CatYellow width={31} />
        ) : (
          <MarketDisabled width={31} />
        ),
      label: "마켓",
      path: "/market",
      requiresAuth: false,
    },
    {
      icon: location.pathname.startsWith("/search") ? (
        <SearchYellow width={31} />
      ) : (
        <SearchDisabled width={31} />
      ),
      label: "검색",
      path: "/search",
      requiresAuth: false,
    },
    {
      icon: location.pathname.startsWith("/home") ? (
        <HomeYellow width={31} />
      ) : (
        <HomeDisabled width={31} />
      ),
      label: "홈",
      path: "/home",
      requiresAuth: false,
    },
    {
      icon: location.pathname.startsWith("/cart") ? (
        <CartYellow width={31} />
      ) : (
        <CartDisabled width={31} />
      ),
      label: "장바구니",
      path: "/cart",
      requiresAuth: true,
    },
    {
      icon: location.pathname.startsWith("/profile") ? (
        <ProfileYellow width={31} />
      ) : (
        <ProfileDisabled width={31} />
      ),
      label: "프로필",
      path: "/profile",
      requiresAuth: true,
    },
  ];

  return (
    <>
      {!isLoginPage &&
        !isSignupPage &&
        !isMarketDetailPage &&
        !isBuyPage &&
        !isPrivacyPolicyPage &&
        !isTermsOfUsePage &&
        !isUnregister1Page &&
        !isUnregister2Page &&
        !isCartPage &&
        !isCatAddPage &&
        !isPaymentsDetailPage && (
          <NavContainer>
            <Block.FlexBox>
              {navItems.map((item, index) => {
                const isActive = location.pathname.startsWith(item.path);
                const isDisabled = item.requiresAuth && !userId;

                return (
                  <Block.FlexBox
                    key={index}
                    width="100%"
                    height="100px"
                    justifyContent="center"
                    alignItems="center"
                    direction="column"
                    gap="10px"
                    pointer
                    onClick={() => handleNavigation(item.path)}
                    style={{
                      opacity: isDisabled ? 0.5 : 1,
                      cursor: isDisabled ? "default" : "pointer",
                    }}
                  >
                    {item.icon}
                    <Text.Notice200
                      style={{ color: isActive ? "#F4B647" : "#C9CBD4" }}
                    >
                      {item.label}
                    </Text.Notice200>
                  </Block.FlexBox>
                );
              })}
            </Block.FlexBox>
          </NavContainer>
        )}
    </>
  );
}
