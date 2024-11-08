import { ICat } from "../../interfaces/product";
import axiosInstance from "../axiosInstance";

// Cats API
export const catAPI = {
    getCats: (userId: number) => axiosInstance.get(`/users/${userId}/cats`),
    createCat: (userId: number, catData: ICat) => axiosInstance.post(`/users/${userId}/cats`, catData),
    getCat: (userId: number, catId: number) => axiosInstance.get(`/users/${userId}/cats/${catId}`),
    updateCat: (userId: number, catId: number, catData: ICat) =>
        axiosInstance.put(`/users/${userId}/cats/${catId}`, catData),
    updateCatPartial: (userId: number, catId: number, catData: ICat) =>
        axiosInstance.patch(`/users/${userId}/cats/${catId}`, catData),
    deleteCat: (userId: number, catId: number) => axiosInstance.delete(`/users/${userId}/cats/${catId}`),
};
