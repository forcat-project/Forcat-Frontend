import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Block, Input } from "../../styles/ui";
import { Search as SearchIcon } from "../../assets/svg";
import ChannelTalk from "../../components/Home/ChannelTalk"; // ChannelTalk import
import { categoryAPI } from "../../api/resourses/categories";

interface Category {
  category_id: number;
  name: string;
  subcategories?: Category[];
}

export default function Search() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // 검색 바 클릭 시 검색 전용 페이지로 이동
  const handlegotoonlysearch = () => {
    navigate("/search/onlysearch");
  };

  // API 호출 함수 (비동기 함수로 수정)
  const fetchCategories = async () => {
    try {
      const response = await categoryAPI.getCategories();
      setCategories(response.data); // API 응답 데이터로 카테고리 상태 업데이트
    } catch (err) {
      const errorMsg = (err as AxiosError).message;
      setError(`카테고리를 가져오는 데 실패했습니다: ${errorMsg}`);
    }
  };

  useEffect(() => {
    fetchCategories(); // 컴포넌트 마운트 시 API 호출
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container>
      {/* 검색 바 */}
      <ChannelTalk />
      <SearchBar>
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
      </SearchBar>

      {/* 카테고리 및 서브카테고리 리스트 */}
      <ContentWrapper>
        <CategoryList>
          {categories.map((category) => (
            <CategoryItem
              key={category.category_id}
              onClick={() => setSelectedCategory(category.category_id)}
              selected={category.category_id === selectedCategory}
            >
              {category.name}
            </CategoryItem>
          ))}
        </CategoryList>

        <SubcategoryList>
          {selectedCategory !== null &&
            categories
              .find((cat) => cat.category_id === selectedCategory)
              ?.subcategories?.map((subcategory) => (
                <SubcategoryItem
                  key={subcategory.category_id}
                  onClick={() => {
                    console.log(
                      `Navigating to category ID: ${subcategory.category_id}, Name: ${subcategory.name}`
                    );
                    // 서브 카테고리 ID와 이름을 CategoryDetail로 전달
                    navigate(`/search/${subcategory.category_id}`, {
                      state: { categoryName: subcategory.name },
                    });
                  }}
                >
                  {subcategory.name}
                </SubcategoryItem>
              ))}
        </SubcategoryList>
      </ContentWrapper>
    </Container>
  );
}

// 스타일드 컴포넌트
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto; // 화면 가운데 정렬
  padding-top: 20px;
`;

const SearchBar = styled.div`
  padding: 10px 16px;
  background-color: #ffffff;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const ContentWrapper = styled.div`
  display: flex;
  margin-top: 20px;
`;

const CategoryList = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 200px;
  background-color: #f8f8f8;
  height: 100vh;
  overflow-y: auto;
  color: #7e7e7e;
`;

const CategoryItem = styled.li<{ selected: boolean }>`
  padding: 15px;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? "#e0e0e0" : "transparent")};
  &:hover {
    background-color: #e0e0e0;
  }
`;

const SubcategoryList = styled.ul`
  list-style-type: none;
  padding: 0 20px;
  flex: 1;
  overflow-y: auto;
`;

const SubcategoryItem = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;
