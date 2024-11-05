import { atom } from "recoil";
import { ICat, IInputData, IProduct, IUser } from "../interfaces/product";

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

export const catState = atom<ICat>({
    key: "catState",
    default: {
        name: "",
        cat_breed: null, // 고양이 품종 숫자
        cat_breed_name: "", // 고양이 품종 이름
        birth_date: "",
        gender: null,
        is_neutered: null, // 중성화 여부
        weight: "",
        profile_image: "",
        days_since_birth: "",
    },
});

export const inputState = atom<IInputData>({
    key: "inputState",
    default: {
        name: "",
        phoneNumber: "",
        address: "",
        address_detail: "",
        nickname: "",
        catName: "",
        catBreed: null,
        birthDate: "",
        catGender: null,
        isNeutered: null,
        catWeight: "",
    },
});
