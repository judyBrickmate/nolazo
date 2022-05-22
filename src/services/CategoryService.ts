import { API } from './api';

export const getCategoryList = (type: string, startDate: string, endDate: string, isAdminPage: boolean, page: number, limit: number, filter?: [string]) => {
  const url = `categories/admin?from=${startDate}&to=${endDate}&isAdminPage=${isAdminPage}&page=${page}&limit=${limit}&filter={${filter}}&type=${type}`;
  return API.get(url);
};

export const getAllCategory = (type: string) => {
  const url = `categories?type=${type}`;
  return API.get(url);
};

export const createCategory = (data: any) => {
  const url = 'categories';
  return API.post(url, data, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
};

export const updateCategory = (data: any, id: number) => {
  const url = `categories/${id}`;
  return API.patch(url, data, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
};

export const pushLocation = (data: any) => {
  const url = `categories/location`;
  return API.post(url, {
    data,
  });
};
