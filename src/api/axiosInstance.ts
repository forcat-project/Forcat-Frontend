import axios, { InternalAxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 인증이 필요 없는 API 경로 목록
const publicPaths: string[] = [
  "/users/sign-up",
  "/categories",
  "/oauth/kakao",
  "/products",
];

// 인터셉터 설정
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // URL이 정의되어 있고, publicPaths에 포함되지 않은 경우에만 Authorization 헤더 추가

    if (
      config.url &&
      !publicPaths.some((path) => config.url.startsWith(path))
    ) {
      const token = sessionStorage.getItem("access_token"); // sessionStorage에서 토큰 가져오기
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        // 로그인 페이지로 리다이렉트
        window.location.href = "/login";
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// CartProduct API
export const cartProductAPI = {
  getCartProducts: (userId: string) =>
    axiosInstance.get(`/users/${userId}/cart/products`),
  addCartProduct: (userId: string, productData: any) =>
    axiosInstance.post(`/users/${userId}/cart/products`, productData),
  updateCartProduct: (userId: string, productId: string, productData: any) =>
    axiosInstance.put(
      `/users/${userId}/cart/products/${productId}`,
      productData
    ),
  updateCartProductPartial: (
    userId: string,
    productId: string,
    productData: any
  ) =>
    axiosInstance.patch(
      `/users/${userId}/cart/products/${productId}`,
      productData
    ),
  deleteCartProduct: (userId: string, productId: string) =>
    axiosInstance.delete(`/users/${userId}/cart/products/${productId}`),
};

// Categories API
export const categoryAPI = {
  getCategories: () => axiosInstance.get("/categories"),
  getCategory: (categoryId: string) =>
    axiosInstance.get(`/categories/${categoryId}`),
};

// OAuth API
export const oauthAPI = {
  getKakaoAuth: () => axiosInstance.get("/oauth/kakao"),
};

// Points API
export const pointAPI = {
  createPoint: (pointData: any) => axiosInstance.post("/points", pointData),
  getRandomPoint: () => axiosInstance.get("/points/random-point"),
};

// Upload API
export const uploadAPI = {
  uploadFile: (fileData: any) => axiosInstance.post("/upload", fileData),
};

export default axiosInstance;

export interface QueryParams {
  [key: string]: string | number | boolean | undefined | null;
}
