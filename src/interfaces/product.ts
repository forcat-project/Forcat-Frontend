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
  cat_breed: null;
  cat_breed_name?: string;
  birth_date: string;
  gender: number | null;
  is_neutered: number | null;
  weight: string;
  profile_image?: string;
  days_since_birth?: string;
}

export interface IInputData {
  name: string;
  phoneNumber: string;
  address: string;
  address_detail: string;
  nickname: string;
  catName: string;
  catBreed: number | null;
  birthDate: string;
  catGender: number | null;
  isNeutered: number | null;
  catWeight: string;
}

// export interface IAmount {
//     currency: string;
//     value: number;
//   }

// 상품 상세 페이지 데이터 PaymentsDetail.tsx 사용
export interface IResponseData {
  order_info: {
    order_date: string;
    user_name: string;
    phone_number: string;
    shipping_address: string;
    shipping_address_detail: string;
    shipping_memo: string;
    status: string;
    total_amount: number;
    points_used: number;
    original_amount: number;
    payment_method: string;
    shipping_status: string;
    products: {
      product_id: number;
      product_name: string;
      product_image: string;
      discounted_price: number;
      discount_rate: number;
      product_company: string;
      price: number;
      quantity: number;
    }[];
  };
}

// 주문 상품 인터페이스 PaymentComponent.tsx 사용
export interface IOrderProduct {
  product_id: number;
  product_name: string;
  price: number;
  quantity: number;
  product_company: string;
  product_status: string;
  product_image: string;
  discount_rate: number;
}

// 주문 생성 데이터 PaymentComponent.tsx 사용
export interface ICreateOrderRequest {
  orderId: string;
  amount: number;
  originalAmount: number;
  userId: number;
  userName: string;
  phoneNumber: string;
  shippingAddress: string;
  shippingAddressDetail: string;
  paymentMethod: string;
  shippingMemo: string;
  pointsUsed: number;
  products: IOrderProduct[];
}

// 결제 성공 페이지 데이터 SuccessPage.tsx 사용
export interface ResponseData {
  status: string;
  data: Record<string, unknown>;
  user_id: string;
  order_id: string;
}

// 결제 성공 페이지 데이터 SuccessPage.tsx 사용
export interface PaymentData {
  paymentKey: string | null;
  orderId: string | null;
  amount: string | null;
}
