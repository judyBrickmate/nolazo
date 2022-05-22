import { API } from "./api";

export const getEventList = (
  startDate: string,
  endDate: string,
  isAdminPage: boolean,
  page: number,
  size: number = 10,
  filter?: string,
  category: string = "",
  search: string = "",
  sort: string = ""
) => {
  const url = `events?from=${startDate}&to=${endDate}&isAdminPage=${isAdminPage}&limit=${size}&page=${page}&filter={${filter}}`;
  return API.get(url);
};

export const addEventList = (data: any) => {
  const url = `events`;
  return API.post(url, data, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });
};

export const updateEventList = (id: number, data: any) => {
  const url = `events/${id}`;
  return API.patch(url, data, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });
};

export const getNoificationList = (startDate: string, endDate: string, page: number, limit: number, isAdminPage: boolean, filter?: string) => {
  const url = `notifications?from=${startDate}&to=${endDate}&isAdminPage=${isAdminPage}&limit=${limit}&page=${page}&filter={${filter}}&type=NOTICE`;
  return API.get(url);
};

export const getStoreReviewList = (
  startDate: string,
  endDate: string,
  isAdminPage: boolean,
  page: number,
  size: number = 10,
  filter?: string,
  type?: string,
  category: string = "",
  search: string = "",
  sort: string = ""
) => {
  const url = `stores/0/reviews?from=${startDate}&to=${endDate}&isAdminPage=${isAdminPage}&limit=${size}&page=${page}&filter={${filter}}&type=${type}`;
  return API.get(url);
};

export const addNoificationList = (data: any) => {
  const url = `notifications`;
  return API.post(url, data);
};

export const deleteNoificationList = (id: number) => {
  const url = `notifications/${id}`;
  return API.delete(url);
};

export const deleteStoreReview = (id: number, reviewId: number) => {
  const url = `stores/${id}/reviews/${reviewId}`;
  return API.delete(url);
};

export const getMatchReviewList = (
  startDate: string,
  endDate: string,
  isAdminPage: boolean,
  page: number,
  size: number = 10,
  filter?: string,
  type?: string,
  category: string = "",
  search: string = "",
  sort: string = ""
) => {
  const url = `stores/0/reviews?from=${startDate}&to=${endDate}&isAdminPage=${isAdminPage}&limit=${size}&page=${page}&filter={${filter}}&type=${type}`;
  return API.get(url);
};

export const deleteMatchReview = (id: number, reviewId: number) => {
  const url = `stores/${id}/reviews/${reviewId}`;
  return API.delete(url);
};
