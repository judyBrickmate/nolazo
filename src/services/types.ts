import { PaymentType } from '../utils';

export interface dataUpdateAdmin {
  role: string;
  name: string;
  password: string;
  phone: string;
  email: string;
}

export interface createPayment {
  name: string;
  email: string;
  phone: string;
  type: PaymentType;
  originalPrice: number;
  price: number;
  amount?: number;
  storeId?: number;
  matchingId: number;
}
