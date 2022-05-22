import { API } from "./api";
import { dataUpdateAdmin } from "./types";

export const login = (identityKey: any, password: any) => {
  console.log("identityKey", identityKey);

  const url = "auth/sign-in-admin";
  return API.post(url, {
    identityKey: identityKey,
    password,
  });
};

export const getListUser = (
  startDate: string,
  endDate: string,
  page: number,
  limit: number,
  isAdminPage: boolean,
  filter?: string,
  member?: string
) => {
  const url = `/users?from=${startDate}&to=${endDate}&isAdminPage=${isAdminPage}&page=${page}&limit=${limit}&filter={${filter}}&member=${member}`;
  return API.get(url);
};

export const getListUserMatch = (
  id: number,
  startDate: string,
  endDate: string,
  page: number,
  limit: number,
  isAdminPage: boolean,
  filter?: string,
  member?: string
) => {
  const url = `/users/${id}/matchings?from=${startDate}&to=${endDate}&isAdminPage=${isAdminPage}&page=${page}&limit=${limit}&filter={${filter}}&member=${member}`;
  return API.get(url);
};

export const getStoreReview = (
  id: number,
  type: string,
  startDate: string,
  endDate: string,
  isAdminPage: boolean,
  page: number,
  limit: number,
  filter?: string,
  search?: string
) => {
  const url = `/users/${id}/reviews/${type}?from=${startDate}&to=${endDate}&isAdminPage=${isAdminPage}&page=${page}&limit=${limit}&filter={${filter}}`;
  return API.get(url);
};

export const getUserById = (id: number) => {
  const url = `/users/${id}`;
  return API.get(url);
};

export const updateUser = async (data: dataUpdateAdmin, id: number) => {
  const url = `/users/${id}`;
  const bodyData = {
    role: data.role,
    password: data.password,
    name: data.name,
    email: data.email,
    phone: data.phone,
  };

  // let dataBody = new FormData();
  // dataBody.append('role', data.role);
  // dataBody.append('password', data.password);
  // dataBody.append('name', data.name);
  // dataBody.append('phone', data.phone);
  // dataBody.append('email', data.email);
  // if (!!image?.uri) {
  //   let avatar = {
  //     uri: isIos ? image.uri.replace('file://', '') : image.uri,
  //     fileName: image.fileName,
  //     name: image.fileName,
  //     path: isIos ? image.uri.replace('file://', '') : image.uri,
  //     size: image.fileSize,
  //     type: isIos ? `${image.uri.split('.').pop()}` : image.type,
  //     height: image.height,
  //     width: image.width,
  //   };
  //   dataBody.append('avatar', avatar);
  // }
  return API.patch(url, bodyData);
};

export const getUserOrderList = (
  id: number,
  startDate: string,
  endDate: string,
  page: number,
  limit: number,
  isAdminPage: boolean,
  filter: string
) => {
  const url = `/users/${id}/payments?from=${startDate}&to=${endDate}&isAdminPage=${isAdminPage}&page=${page}&limit=${limit}&filter={${filter}}`;
  return API.get(url);
};

export const getMatchReview = (
  id: number,
  type: string,
  startDate: string,
  endDate: string,
  isAdminPage: boolean,
  page: number,
  limit: number,
  filter?: string,
  search?: string
) => {
  const url = `/users/${id}/reviews/${type}?from=${startDate}&to=${endDate}&isAdminPage=${isAdminPage}&page=${page}&limit=${limit}&filter={${filter}}`;
  return API.get(url);
};

export const createAdminUser = (data: any) => {
  const url = "/users";
  return API.post(url, data);
};

export const deleteAdminUser = (id: number) => {
  const url = `/users/${id}`;
  return API.delete(url);
};

export const getInquiriesList = (
  id: number,
  startDate: string,
  endDate: string,
  page: number,
  limit: number,
  isAdminPage: boolean
) => {
  const url = `/users/${id}/inquiries?from=${startDate}&to=${endDate}&isAdminPage=${isAdminPage}&page=${page}&limit=${limit}`;
  return API.get(url);
};

export const submitAnswer = (id: number, inquiryId: number, answer: string) => {
  const url = `users/${id}/inquiries/${inquiryId}`;
  return API.patch(url, { answer: answer });
};
