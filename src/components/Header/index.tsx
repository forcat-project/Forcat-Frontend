import { useNavigate } from "react-router-dom";
import {
  Cart,
  HeaderBackArrow,
  HeaderLogo,
  Home,
  Profile,
  Search as SearchIcon, // Search 아이콘
} from "../../assets/svg";
import { Block, Text, Input } from "../../style/ui";
import { PageType } from "../../interfaces/types";

interface HeaderProps {
  pageType: PageType;
  title?: string; // title을 옵셔널하게 정의
}

export default function Header({ pageType, title }: HeaderProps) {
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  return (
    <>
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
              <SearchIcon width={31} />
            </>
          )}

          {pageType === "search" && (
            <>
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
                />
                <SearchIcon width={24} style={{ marginLeft: "10px" }} />
              </Block.FlexBox>
            </>
          )}

          {pageType === "marketDetail" && (
            <>
              <HeaderBackArrow
                width={24}
                onClick={handleBackButtonClick}
                cursor="pointer"
              />
              <Text.TitleMenu300> 상품 상세 </Text.TitleMenu300>
              <Cart width={21} style={{ visibility: "hidden" }} />
            </>
          )}
          {pageType === "categoryDetail" && (
            <>
              <HeaderBackArrow
                width={24}
                onClick={handleBackButtonClick}
                cursor="pointer"
              />
              <Text.TitleMenu300
                style={{
                  color: "black",
                  fontSize: "20px",
                }}
              >
                {title || ""}
              </Text.TitleMenu300>
              <Cart width={21} style={{ visibility: "hidden" }} />
            </>
          )}

          {pageType === "bestseller" && (
            <>
              <HeaderBackArrow
                width={24}
                onClick={handleBackButtonClick}
                cursor="pointer"
              />
              <Text.TitleMenu300>
                🔥 가장 많이 팔리는 베스트셀러 상품
              </Text.TitleMenu300>
              <Cart width={21} style={{ visibility: "hidden" }} />
            </>
          )}

          {pageType === "discount" && (
            <>
              <HeaderBackArrow
                width={24}
                onClick={handleBackButtonClick}
                cursor="pointer"
              />
              <Text.TitleMenu300>
                ⏰ 지금 놓치면 안 될 최대 할인 상품
              </Text.TitleMenu300>
              <Cart width={21} style={{ visibility: "hidden" }} />
            </>
          )}
          {pageType === "mdRecommend" && (
            <>
              <HeaderBackArrow
                width={24}
                onClick={handleBackButtonClick}
                cursor="pointer"
              />
              <Text.TitleMenu300>
                ✨ MD가 자신 있게 추천하는 특별한 상품
              </Text.TitleMenu300>
              <Cart width={21} style={{ visibility: "hidden" }} />
            </>
          )}

          {pageType === "onlyPocket" && (
            <>
              <HeaderBackArrow
                width={24}
                onClick={handleBackButtonClick}
                cursor="pointer"
              />
              <Text.TitleMenu300> 💛 오직 포켓에서만! </Text.TitleMenu300>
              <Cart width={21} style={{ visibility: "hidden" }} />
            </>
          )}
        </Block.FlexBox>
      </Block.AbsoluteBox>
    </>
  );
}
