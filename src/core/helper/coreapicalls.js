import { API } from "../../backend";

export const getProducts = () => {
  return fetch(`${API}product/filtered_products`, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getCategory = () => {
  return fetch(`${API}category`, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
