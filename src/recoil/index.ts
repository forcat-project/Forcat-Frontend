import { atom } from "recoil";
import { IProduct, IUser } from "../interfaces/product";

export const exampleState = atom({
    key: "exampleState",
    default: "",
});

export const productState = atom<IProduct>({
    key: "productState",
    default: {
        product_id: 0,
        categories: [],
        discounted_price: 0,
        name: "",
        thumbnail_url: "",
        company: "",
        description_image_url: "",
        price: 0,
        discount_rate: "",
        remain_count: 0,
        purchase_count: 0,
    },
});

export const userState = atom<IUser>({
    key: "userState",
    default: {
        username: "",
        nickname: "",
        profile_picture: "",
        phone_number: "",
        address: "",
        address_detail: "",
        kakao_id: "",
        google_id: "",
        naver_id: "",
    },
});
