export interface User {
  id: number;
  username: string;
  nickname: string;
  profile_picture: string;
  phone_number: string;
  address: string;
  address_detail: string;
  points: number;
}

export interface Cat {
  cat_id: number;
  name: string;
  cat_breed: number;
  cat_breed_name: string;
  days_since_birth?: number;
  gender: number; // 0: 여아, 1: 남아
  is_neutered?: number;
  weight: string;
  profile_image: string;
  birth_date?: string;
}

export interface ProductInfoProps {
  products: {
    product_id: string;
    thumbnail_url: string;
    name: string;
    company: string;
    discounted_price: number;
    discount_rate: number;
    count: number; // 상품 수량
    product_status: null;
  }[];
  isProductInfoExpanded: boolean;
  toggleProductInfo: () => void;
}

export interface PointInfoProps {
  inputValue: string;
  setInputValue: (value: string) => void;
}
