import { IUser } from "../../interfaces/product";
import axiosInstance from "../axiosInstance";

export interface UserDataParams {
  username: string;
  nickname: string;
  profile_picture: string;
  phone_number: string;
  address: string;
  address_detail: string;
}

// Users API
export const userAPI = {
  signup: (userData: IUser) => axiosInstance.post("/users/sign-up", userData),
  getUser: (userId: number) => axiosInstance.get(`/users/${userId}`),
  updateUser: (userId: number, userData: IUser) =>
    axiosInstance.put(`/users/${userId}`, userData),
  updateUserPartial: (userId: number, userData: IUser) =>
    axiosInstance.patch(`/users/${userId}`, userData),
  deleteUser: (userId: number) => axiosInstance.delete(`/users/${userId}`), // 회원가입 시 테스트를 위한 임시 api
};
