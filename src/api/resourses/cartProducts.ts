import axiosInstance, { QueryParams } from "../axiosInstance";

export interface CartProductDataParams extends QueryParams {
  quantity: number;
}

// CartProduct API
export const cartProductAPI = {
  getCartProducts: (userId: number) =>
    axiosInstance.get(`/users/${userId}/cart/products`),
  addCartProduct: (userId: number, productData: CartProductDataParams) =>
    axiosInstance.post(`/users/${userId}/cart/products`, productData),
  updateCartProductPartial: (
    userId: number,
    productId: number,
    productData: CartProductDataParams
  ) =>
    axiosInstance.patch(
      `/users/${userId}/cart/products/${productId}`,
      productData
    ),
  deleteCartProduct: (userId: number, productId: number) =>
    axiosInstance.delete(`/users/${userId}/cart/products/${productId}`),
};
