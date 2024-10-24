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
import { useState } from "react"; // useState 추가

interface HeaderProps {
  pageType: PageType;
  title?: string; // title을 옵셔널하게 정의
}

export default function Header({ pageType, title }: HeaderProps) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 추가

  const handleBackButtonClick = () => {
    navigate(-1); // 뒤로가기 처리
  };

  const handleProfileClick = () => {
    navigate("/login");
  };

  const handlegotoonlysearch = () => {
    navigate("/search/onlysearch"); // 검색 바 클릭 시 검색전용 페이지로 이동
  };

  // 검색어 입력 시 상태 업데이트
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    console.log("Header input changed:", e.target.value); // 입력된 값 콘솔 출력
  };

  // SearchIcon 클릭 시 검색어를 가지고 OnlySearch 페이지로 이동
  const handleSearchBarClick = () => {
    console.log("Search bar clicked with search term:", searchTerm); // 클릭 시 검색어 콘솔 출력
    if (searchTerm.trim()) {
      navigate(`/search/onlysearch?query=${searchTerm}`); // 검색어를 쿼리 파라미터로 전달
    }
  };

  // Enter 키 입력 시 검색 실행
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log("Enter key pressed with search term:", searchTerm); // Enter 입력 시 검색어 콘솔 출력
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
                <Text.TitleMenu300> 장바구니 </Text.TitleMenu300>
                <Home width={21} />
              </>
            )}

            {pageType === "profile" && (
              <>
                <Text.TitleMenu300> 프로필 </Text.TitleMenu300>
                <Profile
                  width={31}
                  onClick={handleProfileClick}
                  cursor="pointer"
                />
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
                    onClick={handlegotoonlysearch} // 클릭 시 페이지 이동
                    readOnly // 입력 불가능하게 설정 (검색 전용 페이지로 이동하므로)
                  />
                  <SearchIcon width={24} style={{ marginLeft: "10px" }} />
                </Block.FlexBox>
              </>
            )}

            {pageType === "onlySearch" && (
              <>
                <HeaderBackArrow
                  width={24}
                  onClick={() => navigate(-1)}
                  cursor="pointer"
                />
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
                    value={searchTerm} // 입력된 값
                    onChange={handleInputChange} // 입력값 업데이트
                    onKeyPress={handleKeyPress} // Enter 키 이벤트 처리
                  />
                  <SearchIcon
                    width={24}
                    style={{ marginLeft: "10px", cursor: "pointer" }}
                    onClick={handleSearchBarClick}
                  />
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
                <Text.TitleMenu300>베스트셀러</Text.TitleMenu300>
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
                <Text.TitleMenu300>최대 할인 상품</Text.TitleMenu300>
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
                <Text.TitleMenu300>MD 추천 상품</Text.TitleMenu300>
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
                <Text.TitleMenu300> 오직 포켓에서만 </Text.TitleMenu300>
                <Cart width={21} style={{ visibility: "hidden" }} />
              </>
            )}
          </Block.FlexBox>
        </Block.AbsoluteBox>
      )}
    </>
  );
}
