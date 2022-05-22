import { API } from "./api";

export const getSettings = () => {
  const url = `/settings/app`;
  return API.get(url);
};

export const updateSettings = (data: any) => {
  const url = `/settings/app`;
  return API.put(url, data);
};

export const getPolicies = () => {
  const url = `/policies/policies`;
  return API.get(url);
};

export const setPolicies = (policyName: string, data: any) => {
  const url = `/policies/policies/${policyName}`;
  return API.put(url, data);
};
