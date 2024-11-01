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
  product: {
    thumbnail_url: string;
    name: string;
    company: string;
    discount_rate: number;
    discounted_price: number;
    price: number;
  };
  count: number;
  isProductInfoExpanded: boolean;
  toggleProductInfo: () => void;
}
