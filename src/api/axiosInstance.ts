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
        alert("로그인이 필요합니다.")
        window.location.href = "/login";
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// OAuth API
export const oauthAPI = {
  getKakaoAuth: () => axiosInstance.get("/oauth/kakao"),
};

// Upload API
export const uploadAPI = {
  uploadFile: (fileData: any) => axiosInstance.post("/upload", fileData),
};

export default axiosInstance;

export interface QueryParams {
  [key: string]: string | number | boolean | undefined | null;
}
