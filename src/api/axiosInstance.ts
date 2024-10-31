import axios from "axios";

/**
 * @description Axios 인스턴스를 생성
 * 목적 : 쿠키 기반 인증을 사용하여 요청을 보내기 위함
 */

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true, // 요청 시 쿠키를 자동으로 포함하도록
});

export default axiosInstance;
