import axiosInstance from "../axiosInstance";

// Categories API
export const categoryAPI = {
  getCategories: () => axiosInstance.get("/categories"),
  getCategory: (categoryId: number) =>
    axiosInstance.get(`/categories/${categoryId}`),
};
