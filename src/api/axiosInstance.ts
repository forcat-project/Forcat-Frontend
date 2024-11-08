import axios, { InternalAxiosRequestConfig } from "axios";
import { jwtDecode } from "jwt-decode";

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

const refreshTokenIfNeeded = async () => {
  const access_token = sessionStorage.getItem("access_token");
  const refresh_token = sessionStorage.getItem("refresh_token");

  if (access_token) {
    try {
      const decoded = jwtDecode(access_token);
      const currentTime = Date.now() / 1000;
      const timeLeft = decoded.exp - currentTime;

      if (timeLeft < 300) {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/refresh`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh_token }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          sessionStorage.setItem("access_token", data.access_token);
          sessionStorage.setItem("refresh_token", data.refresh_token);
          return data.access_token;
        } else {
          console.error("Failed to refresh token");
          window.location.href = "/login"; // 로그인 페이지로 리다이렉트
        }
      }
    } catch (error) {
      console.error("Error decoding or refreshing token:", error);
      window.location.href = "/login"; // 오류 발생 시 로그인 페이지로 리다이렉트
    }
  }
  return access_token;
};

// 인터셉터 설정
axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // URL이 정의되어 있고, publicPaths에 포함되지 않은 경우에만 Authorization 헤더 추가

    if (
      config.url &&
      !publicPaths.some((path) => config.url.startsWith(path))
    ) {
      let token = sessionStorage.getItem("access_token"); // sessionStorage에서 토큰 가져오기
      if (token) {
        token = await refreshTokenIfNeeded(); // 토큰 갱신 함수 호출
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
