import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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
