import { useLocation, matchPath } from "react-router-dom";
import HomeHeader from "./HomeHeader";
import { Block } from "../../style/ui";
import MarketHeader from "./MarketHeader";
import ProfileHeader from "./ProfileHeader";
import WithOnlyBackHeader from "./WithOnlyBackHeader";
import WithBackAndIconHeader from "./WithBackAndIconHeader";

type Props = {
    isLoginPage: boolean;
    isSignupPage: boolean;
    handleBackButtonClick: () => void;
    handleProfileClick: () => void;
};

export default function Header({ isLoginPage, isSignupPage, handleBackButtonClick, handleProfileClick }: Props) {
    const location = useLocation();
    const currentPath = location.pathname;

    const pageData = [
        { path: "/home", title: "홈", component: HomeHeader },
        { path: "/market", title: "마켓", component: MarketHeader },
        { path: "/profile", title: "프로필", component: ProfileHeader },
        { path: "/market/:productId", title: "상품 상세", component: WithOnlyBackHeader },
        { path: "/cart", title: "장바구니", component: WithOnlyBackHeader },
        { path: "home/bestseller", title: "베스트셀러", component: WithBackAndIconHeader },
        { path: "home/discount", title: "최대 할인 상품", component: WithBackAndIconHeader },
        { path: "home/mdrecommend", title: "MD 추천 상품", component: WithBackAndIconHeader },
        { path: "home/onlyforcat", title: "오직 포캣에서만", component: WithBackAndIconHeader },
    ];

    const currentPage = pageData.find(page => matchPath(page.path, currentPath));

    if (isLoginPage || isSignupPage || !currentPage) {
        return null;
    }

    const { component: HeaderComponent, title } = currentPage;

    return (
        <Block.AbsoluteBox width="599px" height="103px" top="0" bgColor="white">
            <Block.FlexBox padding="31px 25px" justifyContent="space-between">
                <HeaderComponent
                    title={title}
                    handleBackButtonClick={handleBackButtonClick}
                    handleProfileClick={handleProfileClick}
                />
            </Block.FlexBox>
        </Block.AbsoluteBox>
    );
}
