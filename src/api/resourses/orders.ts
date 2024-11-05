// src/api/resources/orders.ts
import axiosInstance from "../axiosInstance";
import { AxiosResponse } from "axios";
import { IResponseData } from "../../interfaces/product"; // IResponseData import

export interface CreateOrderRequest {
    userId: number;
    orderId: string;
    amount: number;
    userName: string;
    originalAmount: number;
    paymentMethod: string;
    shippingAddress: string;
    shippingAddressDetail: string;
    phoneNumber: string;
    shippingMemo?: string;
    pointsUsed?: number;
    products: Array<{
        product_id: number;
        quantity: number;
        product_name: string;
        price: number;
        discount_rate: number;
        product_company: string;
        product_image: string;
    }>;
}

export interface CreateOrderResponse {
    status: string;
    orderId?: string;
    error?: string;
}

// Orders API
export const orderAPI = {
    // 주문 생성
    createOrder: (orderData: CreateOrderRequest): Promise<AxiosResponse<CreateOrderResponse>> =>
        axiosInstance.post(`/users/${orderData.userId}/orders/`, orderData),

    // 주문 조회 - IResponseData로 반환 타입 수정
    getOrder: (userId: number, orderId: string): Promise<AxiosResponse<IResponseData>> =>
        axiosInstance.get(`/users/${userId}/orders/${orderId}`),

    // 결제 확인
    confirmPayment: (paymentData: { paymentKey: string; orderId: string; amount: number }) =>
        axiosInstance.post("/payments/confirm", paymentData),
};
