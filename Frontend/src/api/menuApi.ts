import axios from "axios";
import type {
  ApiResponse,
  Menu,
  Item,
  CreateItemPayload,
  CreateMenuPayload
} from "../types";

const BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";


const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" }
});

const handleResponse = async <T>(promise: Promise<{ data: ApiResponse<T> }>): Promise<T> => {
  const res = await promise;

  if(!res.data.success || !res.data.data === undefined){
     throw new Error(res.data.message || "Something went wrong");
  }
  return res.data.data;
};



export const fetchMenus = () => {
  return handleResponse<Menu[]>(api.get("/menus"));
};

export const createMenu = (data: CreateMenuPayload) => {
  return handleResponse<Menu>(api.post("/menus", data));
};

export const deleteMenu = (id: string) => {
  return handleResponse<null>(api.delete(`/menus/${id}`));
};



export const fetchItems = (menuId: string) => {
  return handleResponse<Item[]>(
    api.get(`/items?menuId=${menuId}`)
  );
};

export const createItem = (data: CreateItemPayload) => {
  return handleResponse<Item>(api.post("/items", data));
};

export const deleteItem = (id: string) => {
  return handleResponse<null>(api.delete(`/items/${id}`));
};