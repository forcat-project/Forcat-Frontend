import { HeaderBackArrow, HeaderLogo, Home, Profile } from "../../assets/svg";
import { Block, Text } from "../../style/ui";

type PageType = "products" | "search" | "home" | "cart" | "profile";

interface HeaderProps {
  pageType: PageType;
}

export default function Header({ pageType }: HeaderProps) {
  return (
    <>
      <Block.AbsoluteBox width="599px" height="103px" top="0">
        <Block.FlexBox padding="31px 25px" justifyContent="space-between">
          {pageType === "home" && (
            <>
              <HeaderLogo width={52} />
              <Profile width={31} />
            </>
          )}

          {pageType === "cart" && (
            <>
              <HeaderBackArrow width={24} />
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

          {pageType === "products" && <h1>쇼핑몰 페이지 헤더</h1>}
        </Block.FlexBox>
      </Block.AbsoluteBox>
    </>
  );
}
