import axiosInstance, { QueryParams } from "../axiosInstance";

export interface UserDataParams extends QueryParams {
  username: string;
  nickname: string;
  phone_number?: string;
  address?: string;
  profile_picture?: string;
  address_detail?: string;
  kakao_id?: string;
  google_id?: string;
  naver_id?: string;
}

// Users API
export const userAPI = {
  signup: (userData: UserDataParams) =>
    axiosInstance.post("/users/sign-up", userData),
  getUser: (userId: number) => axiosInstance.get(`/users/${userId}`),
  updateUser: (userId: number, userData: UserDataParams) =>
    axiosInstance.put(`/users/${userId}`, userData),
  updateUserPartial: (userId: number, userData: UserDataParams) =>
    axiosInstance.patch(`/users/${userId}`, userData),
};
