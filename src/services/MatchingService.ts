import { API } from "./api";

export const getMatchingList = (
  startDate: string,
  endDate: string,
  page: number,
  limit: number,
  isAdminPage: boolean,
  filter?: string,
  type?: string
) => {
  const url = `/matchings?from=${startDate}&to=${endDate}&isAdminPage=${isAdminPage}&page=${page}&limit=${limit}&filter={${filter}}`;
  return API.get(url);
};

export const getListMessage = (
  idMatching: any,
  page: number,
  size: number = 10,
  filter: string
) => {
  const url = `matchings/${idMatching}/messages?limit=${size}&page=${page}&filter={type=${filter}}`;
  return API.get(url);
};

export const getMatchingDetail = (id: number) => {
  const url = `matchings/${id}`;
  return API.get(url);
};

export const getReason = () => {
  const url = "matchings/reasons";
  return API.get(url);
};

export const sendMessage = (matchingId: number, message: any) => {
  const url = `matchings/${matchingId}/messages`;
  return API.post(url, message);
};

export const addMatching = (body: any) => {
  const url = "matchings";
  return API.post(url, body, {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteMatching = (id: number) => {
  const url = `matchings/${id}`;
  return API.delete(url);
};
