import axios from "axios";
const api = axios.create({
  baseURL: "https://dummyjson.com",
});

export const getData = async (category) => {
  const response = await api.get(`/products/category/${category}`);
  return response.data.products;
};
