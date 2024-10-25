import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Cart, HeaderBackArrow, HeaderLogo, Home, Profile, Search as SearchIcon } from "../../assets/svg";
import { Block, Text, Input } from "../../style/ui";
import { useState, useEffect } from "react";
import { PageType } from "../../interfaces/types";

const pageMappings: Record<string, { title: string; type: PageType }> = {
    "/home": { title: "Home", type: "home" },
    "/home/bestseller": { title: "베스트셀러", type: "bestseller" },
    "/home/discount": { title: "최대 할인 상품", type: "discount" },
    "/home/mdrecommend": { title: "MD 추천 상품", type: "mdRecommend" },
    "/home/onlypocket": { title: "오직 포켓에서만", type: "onlyPocket" },
    "/market": { title: "마켓", type: "market" },
    "/cart": { title: "장바구니", type: "cart" },
    "/search": { title: "검색어를 입력해주세요", type: "search" },
    "/search/onlysearch": { title: "검색", type: "onlySearch" },
    "/profile": { title: "프로필", type: "profile" },
};

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const { productId, category_id } = useParams();
    const [searchTerm, setSearchTerm] = useState("");
    const [pageTitle, setPageTitle] = useState<string>("");
    const [pageType, setPageType] = useState<PageType>("home");
    const path = location.pathname;
    const { locationState } = location.state || {};

    useEffect(() => {
        if (pageMappings[path]) {
            setPageTitle(pageMappings[path].title);
            setPageType(pageMappings[path].type);
        } else if (path.startsWith("/search/") && category_id) {
            const state = locationState as { categoryName?: string };
            setPageTitle(state?.categoryName || "카테고리 상세");
            setPageType("categoryDetail");
        } else if (path.startsWith("/market") && productId) {
            setPageTitle("상품 상세");
            setPageType("marketDetail");
        } else {
            setPageTitle("카테고리 상세");
            setPageType("categoryDetail");
        }
    }, [path, category_id, productId, locationState]);

    const handleBackButtonClick = () => navigate(-1);
    const handleProfileClick = () => navigate("/login");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchBarClick = () => {
        if (searchTerm.trim()) {
            navigate(`/search/onlysearch?query=${searchTerm}`);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearchBarClick();
        }
    };

    const isLoginPage = location.pathname.startsWith("/login");
    const isSignupPage = location.pathname.startsWith("/signup");

    return (
        <>
            {!isLoginPage && !isSignupPage && (
                <Block.AbsoluteBox width="599px" height="103px" top="0" bgColor="white">
                    <Block.FlexBox padding="31px 25px" justifyContent="space-between">
                        {pageType === "home" && (
                            <>
                                <HeaderLogo width={52} />
                                <Profile width={31} />
                            </>
                        )}

                        {pageType === "cart" && (
                            <>
                                <HeaderBackArrow width={24} onClick={handleBackButtonClick} />
                                <Text.TitleMenu300>{pageTitle}</Text.TitleMenu300>
                                <Home width={21} />
                            </>
                        )}

                        {pageType === "profile" && (
                            <>
                                <Text.TitleMenu300>{pageTitle}</Text.TitleMenu300>
                                <Profile width={31} onClick={handleProfileClick} cursor="pointer" />
                            </>
                        )}

                        {pageType === "market" && (
                            <>
                                <Text.TitleMenu300>{pageTitle}</Text.TitleMenu300>
                                <SearchIcon width={31} />
                            </>
                        )}

                        {["search", "onlySearch"].includes(pageType) && (
                            <>
                                {pageType === "onlySearch" && (
                                    <HeaderBackArrow width={24} onClick={handleBackButtonClick} />
                                )}
                                <Block.FlexBox
                                    width="100%"
                                    padding="8px 16px"
                                    border="1px solid #e0e0e0"
                                    borderRadius="24px"
                                    alignItems="center"
                                >
                                    <Input.Search
                                        width="100%"
                                        placeholder="검색어를 입력해주세요"
                                        value={pageType === "onlySearch" ? searchTerm : ""}
                                        onChange={handleInputChange}
                                        onKeyDown={handleKeyPress}
                                        readOnly={pageType === "search"}
                                    />
                                    <SearchIcon
                                        width={24}
                                        style={{ marginLeft: "10px", cursor: "pointer" }}
                                        onClick={handleSearchBarClick}
                                    />
                                </Block.FlexBox>
                            </>
                        )}

                        {[
                            "marketDetail",
                            "categoryDetail",
                            "bestseller",
                            "discount",
                            "mdRecommend",
                            "onlyPocket",
                        ].includes(pageType) && (
                            <>
                                <HeaderBackArrow width={24} onClick={handleBackButtonClick} />
                                <Text.TitleMenu300>{pageTitle}</Text.TitleMenu300>
                                <Cart width={21} style={{ visibility: "hidden" }} />
                            </>
                        )}
                    </Block.FlexBox>
                </Block.AbsoluteBox>
            )}
        </>
    );
}
