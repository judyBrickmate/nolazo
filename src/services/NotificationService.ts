import { API } from "./api";

export const getNotification = (
  startDate: string,
  endDate: string,
  page: number,
  limit: number,
  isAdminPage: boolean,
  filter?: string,
  type?: string
) => {
  const url = `/notifications?from=${startDate}&to=${endDate}&isAdminPage=${isAdminPage}&page=${page}&limit=${limit}&filter={${filter}}`;
  return API.get(url);
};
