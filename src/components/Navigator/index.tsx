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
import { Block, Button, Text } from "../../style/ui";

export default function Navigator() {
    const navigate = useNavigate();
    const location = useLocation();

    const isMarket = /^\/market\/\d+$/.test(location.pathname);

    const handleCartButtonClick = () => {
        navigate("/cart");
    };

    const handleBuyButtonClick = () => {
        // 구매하기 페이지로 연결 필요
    };

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
        <Block.AbsoluteBox
            width="599px"
            height="93px"
            bottom="0"
            bgColor="white"
            style={{ boxShadow: "rgba(0, 0, 0, 0.15) 0px 0px 50px 0px" }}
        >
            <Block.FlexBox>
                {!isMarket &&
                    navItems.map((item, index) => {
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

                {isMarket && (
                    <Block.FlexBox
                        width="100%"
                        height="93px"
                        justifyContent="center"
                        alignItems="center"
                        gap="12px"
                        pointer
                    >
                        <Button.CartButton onClick={handleCartButtonClick}>장바구니</Button.CartButton>
                        <Button.BuyButton onClick={handleBuyButtonClick}>구매하기</Button.BuyButton>
                    </Block.FlexBox>
                )}
            </Block.FlexBox>
        </Block.AbsoluteBox>
    );
}
