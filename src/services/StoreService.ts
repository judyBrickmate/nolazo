import { API } from "./api";

export const getStoreList = (startDate: string, endDate: string, isAdminPage: boolean, page: number, limit: number, filter?: string, category: string = "", search: string = "", sort: string = "") => {
  const url = `stores?from=${startDate}&to=${endDate}&isAdminPage=${isAdminPage}&limit=${limit}&page=${page}&filter={${filter}}`;
  return API.get(url);
};

export const getStoreDetail = (id: number) => {
  const url = `stores/${id}`;
  return API.get(url);
};
export const addStoreProduct = (id: number, data: any) => {
  const url = `stores/${id}/products`;
  return API.post(url, data);
};
export const updateStoreProduct = (id: number, productId: number, data: any) => {
  const url = `stores/${id}/products/${productId}`;
  return API.put(url, data);
};
export const deleteStoreProduct = (id: number, productId: number) => {
  const url = `stores/${id}/products/${productId}`;
  return API.delete(url);
};
export const updateWishList = (data: any) => {
  const url = `users/${data.id}/wishlist/${data.type}/${data.wishlistId}`;
  return API.patch(url, { action: data.data });
};

export const getStoreReview = (id: number, page: number, size: number = 10, category: string = "", search: string = "", sort: string = "") => {
  const url = `stores/${id}/reviews?limit=${size}&page=${page}${category}${search}${sort}`;
  return API.get(url);
};

export const getReviewStoreById = (idStore: number, idReview: number) => {
  const url = `stores/${idStore}/reviews/${idReview}`;
  return API.get(url);
};

export const addStoreReview = (body: any, id: any) => {
  const url = `stores/${id}/reviews`;
  return API.post(url, body, {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateStoreReview = (body: any, id: any, reviewId: string) => {
  const url = `stores/${id}/reviews/${reviewId}`;
  return API.patch(url, body, {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteStoreReview = (id: any, reviewId: string) => {
  const url = `stores/${id}/reviews/${reviewId}`;
  return API.delete(url);
};

export const createStore = (body: any) => {
  const url = "stores";
  return API.post(url, body, {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  });
};

export const uploadImage = (image: any) => {
  const url = "upload";
  const formData: any = new FormData();

  formData.append("imageType", "STORE_IMAGES");
  formData.append("image", image);
  return API.post(url, formData, {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  });
};

export const uploadFile = (body: any) => {
  const url = "upload/document";
  return API.post(url, body, {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  });
};
