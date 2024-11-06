import { useNavigate, useLocation } from "react-router-dom";
import {
    Market,
    MarketDisabled,
    Search,
    SearchDisabled,
    Home,
    HomeDisabled,
    Cart,
    CartDisabled,
    Profile,
    ProfileDisabled,
} from "../assets/svg";
import { Block, NavContainer, Text } from "../styles/ui";

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
}: Props) {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        {
            icon: location.pathname === "/market" ? <Market width={31} /> : <MarketDisabled width={31} />,
            label: "마켓",
            path: "/market",
        },
        {
            icon: location.pathname.startsWith("/search") ? <Search width={31} /> : <SearchDisabled width={31} />,
            label: "검색",
            path: "/search",
        },
        {
            icon: location.pathname.startsWith("/home") ? <Home width={31} /> : <HomeDisabled width={31} />,
            label: "홈",
            path: "/home",
        },
        {
            icon: location.pathname.startsWith("/cart") ? <Cart width={31} /> : <CartDisabled width={31} />,
            label: "장바구니",
            path: "/cart",
        },
        {
            icon: location.pathname.startsWith("/profile") ? <Profile width={31} /> : <ProfileDisabled width={31} />,
            label: "프로필",
            path: "/profile",
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
        !isCatAddPage && (
                    <NavContainer>
            <Block.FlexBox>
              {navItems.map((item, index) => {
                const isActive = location.pathname.startsWith(item.path);
 

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
                                        onClick={() => navigate(item.path)}
                                    >
                                        {item.icon}
                                        <Text.Notice200 style={{ color: isActive ? "#000" : "#C9CBD4" }}>
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
