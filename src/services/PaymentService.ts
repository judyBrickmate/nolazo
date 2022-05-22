import { API } from "./api";

export const getListPayment = (
  startDate: string,
  endDate: string,
  page: number,
  limit: number,
  isAdminPage: boolean,
  filter?: string,
  type?: string
) => {
  const url = `/payments?from=${startDate}&to=${endDate}&isAdminPage=${isAdminPage}&page=${page}&limit=${limit}&filter={${filter}}${type}`;
  return API.get(url);
};

export const getListPaymentDetail = (id: number) => {
  const url = `/payments/${id}`;
  return API.get(url);
};

export const deletePayment = (id: number, data?: any) => {
  const url = `payments/${id}`;
  return API.delete(url, { data });
};

export const updatePayment = (id: number, data?: any) => {
  const url = `payments/${id}`;
  return API.patch(url, data);
};

export const getReservation = (
  startDate: string,
  endDate: string,
  page: number,
  limit: number,
  isAdminPage: boolean,
  filter?: string,
  type?: string
) => {
  const url = `/payments?from=${startDate}&to=${endDate}&isAdminPage=${isAdminPage}&page=${page}&limit=${limit}&filter={${filter}}&type=${type}`;
  return API.get(url);
};
