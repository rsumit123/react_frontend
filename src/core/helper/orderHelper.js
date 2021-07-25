import { API } from "../../backend";

export const createOrder = (userId, token, orderData) => {
  const formData = new FormData();
  for (const name in orderData) {
    formData.append(name, orderData[name]);
  }
  return fetch(`${API}order/add/${userId}/${token}/`, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
};

export const loadOrders = (userId) => {
  return fetch(`${API}order/get_all_orders/${userId}`, { method: "GET" })
    .then((response) => {
      const orderProducts = response.json();
      console.log("API returned order products", orderProducts);
      return orderProducts;
    })
    .catch((err) => console.log("Error in getting orders", err));
};
