import { useNavigate, useLocation } from "react-router-dom";
import {
  Cart,
  CartDisabled,
  Home,
  HomeDisabled,
  Market,
  MarketDisabled,
  Profile,
  ProfileDisabled,
  Search,
  SearchDisabled,
} from "../../assets/svg";
import { Block, Text } from "../../style/ui";

export default function Navigator() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      icon:
        location.pathname === "/market" ? (
          <Market width={31} />
        ) : (
          <MarketDisabled width={31} />
        ),
      label: "마켓",
      path: "/market",
    },
    {
      icon:
        location.pathname === "/search" ? (
          <Search width={31} />
        ) : (
          <SearchDisabled width={31} />
        ),
      label: "검색",
      path: "/search",
    },
    {
      icon:
        location.pathname === "/home" ? (
          <Home width={31} />
        ) : (
          <HomeDisabled width={31} />
        ),
      label: "홈",
      path: "/home",
    },
    {
      icon:
        location.pathname === "/cart" ? (
          <Cart width={31} />
        ) : (
          <CartDisabled width={31} />
        ),
      label: "장바구니",
      path: "/cart",
    },
    {
      icon:
        location.pathname === "/profile" ? (
          <Profile width={31} />
        ) : (
          <ProfileDisabled width={31} />
        ),
      label: "프로필",
      path: "/profile",
    },
  ];

  return (
    <Block.AbsoluteBox
      width="599px"
      height="103px"
      bottom="0"
      style={{ boxShadow: "rgba(0, 0, 0, 0.15) 0px 0px 50px 0px" }}
    >
      <Block.FlexBox>
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;

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
    </Block.AbsoluteBox>
  );
}
