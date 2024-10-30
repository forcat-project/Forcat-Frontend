export interface ICategory {
    category_id?: number;
    name: string;
}

export interface IProduct {
    product_id: number;
    categories?: ICategory[];
    discounted_price?: number;
    name: string;
    thumbnail_url: string;
    company?: string;
    description_image_url?: string;
    price: number;
    discount_rate?: string;
    remain_count?: number;
    purchase_count?: number;
}

export interface IProducts {
    product_id: number;
    thumbnail_url: string;
    name: string;
    price: number;
    discount_rate: string;
    discounted_price: number;
    company: string;
    remain_count: number;
}

export interface IUser {
    username: string;
    nickname: string;
    profile_picture?: string;
    phone_number?: string;
    address?: string;
    address_detail?: string;
    kakao_id?: string;
    google_id?: string;
    naver_id?: string;
}

export interface ICat {
    name: string;
    cat_breed: number;
    cat_breed_name?: string;
    birth_date: string;
    gender: number;
    is_neutered: number;
    weight: string;
    profile_image?: string;
    days_since_birth?: string;
}

export interface IInputData {
    name: string;
    address: string;
    address_detail: string;
    nickname: string;
    catName: string;
    catBreed: string;
    birthDate: string;
    catGender: string;
    isNeutered: string;
    catWeight: string;
    [key: string]: string;
}
