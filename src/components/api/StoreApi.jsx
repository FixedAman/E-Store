import axios from "axios";
const api = axios.create({
  baseURL: "https://dummyjson.com",
});

export const getData = async (category) => {
  const response = await api.get(`/products/category/${category}`);
  console.log(response.data.products);
  
  return response.data.products;
};
export const getSearchData = async (data) => {
  const response = await api.get(
    `https://dummyjson.com/products/search?q=${data}`
  );

  return response.data.products.map((product) => product.title);
};
export const getCategories = async () => {
  const response = await api.get(`/products/categories`);
  return response.data;
};
