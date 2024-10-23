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
