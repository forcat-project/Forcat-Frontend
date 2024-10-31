import axiosInstance, { QueryParams } from "../axiosInstance";

export interface CatDataParams extends QueryParams {
  name?: string;
  cat_breed_name?: string;
  cat_breed?: string;
  birth_date?: string;
  gender?: number;
  is_neutered?: number;
  weight?: string;
  profile_image?: string;
}

// Cats API
export const catAPI = {
  getCats: (userId: number) => axiosInstance.get(`/users/${userId}/cats`),
  createCat: (userId: number, catData: CatDataParams) =>
    axiosInstance.post(`/users/${userId}/cats`, catData),
  getCat: (userId: number, catId: number) =>
    axiosInstance.get(`/users/${userId}/cats/${catId}`),
  updateCat: (userId: number, catId: number, catData: CatDataParams) =>
    axiosInstance.put(`/users/${userId}/cats/${catId}`, catData),
  updateCatPartial: (userId: number, catId: number, catData: CatDataParams) =>
    axiosInstance.patch(`/users/${userId}/cats/${catId}`, catData),
  deleteCat: (userId: number, catId: number) =>
    axiosInstance.delete(`/users/${userId}/cats/${catId}`),
};
