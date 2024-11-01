import axiosInstance, { QueryParams } from "../axiosInstance";

export interface ProductQueryParams extends QueryParams {
  name?: string;
  categories?: number;
  limit?: number;
  cursor?: string;
  ordering?: string;
}

// Products API
export const productAPI = {
  getProducts: (params?: ProductQueryParams) =>
    axiosInstance.get("/products", { params }),
  getPopularKeywords: () => axiosInstance.get("/products/popular-keywords"),
  getProduct: (productId: string) =>
    axiosInstance.get(`/products/${productId}`),
};
