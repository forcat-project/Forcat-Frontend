import { useNavigate } from "react-router-dom";
import { Cart, HeaderBackArrow, HeaderLogo, Home, Profile, Search } from "../../assets/svg";
// import Search from "../../pages/Search";
import { Block, Text } from "../../style/ui";

type PageType = "market" | "search" | "home" | "cart" | "profile" | "marketDetail";

interface HeaderProps {
    pageType: PageType;
}

export default function Header({ pageType }: HeaderProps) {
    const navigate = useNavigate();
    const handleBackButtonClick = () => {
        navigate(-1);
    };

    return (
        <>
            <Block.AbsoluteBox width="599px" height="103px" top="0" bgColor="white">
                <Block.FlexBox padding="31px 25px" justifyContent="space-between" alignItems="center">
                    {pageType === "home" && (
                        <>
                            <HeaderLogo width={52} />
                            <Profile width={31} />
                        </>
                    )}

                    {pageType === "cart" && (
                        <>
                            <HeaderBackArrow width={24} onClick={handleBackButtonClick} />
                            <Text.TitleMenu300> 장바구니 </Text.TitleMenu300>
                            <Home width={21} />
                        </>
                    )}

                    {pageType === "profile" && (
                        <>
                            <Text.TitleMenu300> 프로필 </Text.TitleMenu300>
                            <Profile width={31} />
                        </>
                    )}

                    {pageType === "market" && (
                        <>
                            <Text.TitleMenu300> 마켓 </Text.TitleMenu300>
                            <Search width={31} />
                        </>
                    )}

                    {pageType === "marketDetail" && (
                        <>
                            <HeaderBackArrow width={24} onClick={handleBackButtonClick} cursor="pointer" />
                            <Text.TitleMenu300> 상품 상세 </Text.TitleMenu300>
                            <Cart width={21} style={{ visibility: "hidden" }} />
                        </>
                    )}
                </Block.FlexBox>
            </Block.AbsoluteBox>
        </>
    );
}
