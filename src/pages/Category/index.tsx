import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Block, Input } from "../../style/ui";
import { Search as SearchIcon } from "../../assets/svg";

interface Category {
    category_id: number;
    name: string;
    subcategories?: Category[];
}

export default function Search() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [error, setError] = useState<AxiosError | null>(null);
    const navigate = useNavigate();

    const handlegotoonlysearch = () => {
        navigate("/search/onlysearch"); // 검색 바 클릭 시 검색전용 페이지로 이동
    };

    // API 호출 함수
    const fetchCategories = () => {
        axios
            .get("http://125.189.109.17/api/categories")
            .then(response => {
                setCategories(response.data);
            })
            .catch((error: AxiosError) => {
                setError(error);
            });
    };

    useEffect(() => {
        fetchCategories(); // 컴포넌트 마운트 시 API 호출
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
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
            <Container>
                <CategoryList>
                    {categories.map(category => (
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
                            .find(cat => cat.category_id === selectedCategory)
                            ?.subcategories?.map(subcategory => (
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
            </Container>
        </>
    );
}

// 스타일드 컴포넌트는 그대로 유지

// 스타일드 컴포넌트
const Container = styled.div`
    display: flex;
    margin-top: 100px;
    box-sizing: border-box;
`;

const CategoryList = styled.ul`
    list-style-type: none;
    padding: 0;
    width: 200px;
    background-color: #f8f8f8;
    height: 765px;
    overflow-y: auto;
    color: #7e7e7e;
`;

const CategoryItem = styled.li<{ selected: boolean }>`
    padding: 15px;
    cursor: pointer;
    background-color: ${props => (props.selected ? "#e0e0e0" : "transparent")};
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
