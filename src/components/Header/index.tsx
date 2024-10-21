type PageType = "products" | "search" | "home" | "cart" | "profile";

interface HeaderProps {
    pageType: PageType;
}

export default function Header({ pageType }: HeaderProps) {
    return (
        <>
            {pageType === "products" && <h1>쇼핑몰 페이지 헤더</h1>}
            {pageType === "search" && <h1>검색 페이지 헤더</h1>}
            {pageType === "home" && <h1>홈 페이지 헤더</h1>}
            {pageType === "cart" && <h1>장바구니 페이지 헤더</h1>}
            {pageType === "profile" && <h1>프로필 페이지 헤더</h1>}
        </>
    );
}
