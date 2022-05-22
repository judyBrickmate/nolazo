export const USER_TOKEN = 'USER_TOKEN';
export const USER_ROLE = 'USER_ROLE';

export const setItem = (key: string, value: string) => {
  window.localStorage.setItem(key, value);
};

export const setItemRole = (key: string, value: string) => {
  window.localStorage.setItem(key, value);
};

export const getItem = (key: string) => {
  const value = window.localStorage.getItem(key);
  return value === null ? '' : value;
};

export const setToken = (value: any) => {
  setItem(USER_TOKEN, value);
};

export const setUserRole = (value: any) => {
  setItemRole(USER_ROLE, value);
};

export const clearToken = () => setToken('');

export const getToken = () => getItem(USER_TOKEN);
