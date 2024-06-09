import { HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';

export interface sortOption {
  name: string;
  // value: string;
}

export interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

export interface Options {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  observe?: 'body';
  context?: HttpContext;
  params?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  transferCache?:
    | {
        includeHeaders?: string[];
      }
    | boolean;
}

export interface Data {
  products: Product[] | { [key: string]: Product[] };
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export interface Product {
  _id: string;
  idCategory: idCategory;
  title: string;
  price: number;
  salePrice: number;
  background: string;
  thumbnails: string[];
  qty: number;
  rating: number;
  viewed: number;
  size: string[];
  purchased: number;
  description: string;
  updationDate?: string;
  creationDate?: string;
  status?: string;
  variants: Variant[];
}

export interface User {
  _id: string;
  email: string;
  password: string;
  phone: string;
  name: string;
  role: string;
  status: string;
  note: string;
  addresses: string;
  lastLogin?: string;
  date?: string;
}

export interface Variant {
  id: string;
  title?: string;
  price?: number;
  salePrice?: number;
  background?: string;
  qty: number;
  updationDate?: string;
  creationDate?: string;
}

export interface CartProduct {
  _id: string;
  title: string;
  price: number;
  background: string;
  salePrice: number;
  qty: number;
}

export interface ShippingMethod {
  name: string;
  price: number;
  selected: boolean;
}

export interface Category {
  _id: string;
  name: string;
  categoryId: string;
  children: string[];
  description?: string;
  updationDate?: string;
  creationDate?: string;
  products?: Product[];
}

export interface idCategory {
  parent: string;
  children: string;
}

export interface PaginationParams {
  [key: string]:
    | string
    | number
    | boolean
    | ReadonlyArray<string | number | boolean>;
  page: number;
  limit: number;
}

export interface Bill {
  _id: string;
  idUser: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  addressDetail: string;
  shippingFee: number;
  products: CartProduct[];
  shippingMethod: ShippingMethod;
  paymentMethod: string;
  total: number;
  subTotal: number;
  status: string;
  paymentStatus: string;
  deliveryStatus: string;
  note: string;
  date: string;
}

export interface SidebarOption {
  name: string;
  icon: string;
  route?: string;
  type?: string;
  handler?: () => void;
}
