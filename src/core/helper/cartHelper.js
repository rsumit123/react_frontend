export const addItemToCart = (item) => {
  let cart = [];
  if (typeof window != undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    for (var i = 0; i < cart.length; i++) {
      var id = cart[i].id;

      if (item.id === id) {
        cart[i].quantity = cart[i].quantity + 1;
        cart[i].orderPrice = Number(cart[i].orderPrice) + Number(cart[i].price);
        localStorage.setItem("cart", JSON.stringify(cart));
        return;
      }
    }

    cart.push({
      ...item,
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

export const loadCart = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      const cartProducts = JSON.parse(localStorage.getItem("cart"));
      if (cartProducts.length === 0) {
        let cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));
      }
      console.log(JSON.parse(localStorage.getItem("cart")));
      return JSON.parse(localStorage.getItem("cart"));
    } else {
      console.log("Empty cart returned");
      return [];
    }
  }
};

export const removeItemFromCart = (productId) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    cart.map((product, i) => {
      if (product.id === productId) {
        cart.splice(i, 1);
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  return cart;
};

export const updateItemInCart = (productId, quantity) => {
  console.log("updateItemInCart called", productId, quantity);
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    cart.map((product, i) => {
      if (product.id === productId) {
        product["quantity"] = quantity;
        product["orderPrice"] = quantity * Number(product["price"]);
        console.log("updateItemInCart called", product);
      }
    });
    console.log("updateItemInCart called", productId, quantity);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  return cart;
};

export const getQuantityofItemInCart = (productId) => {
  console.log("getQuantity called", productId);
  let cart = [];
  let quantity = 0;
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    cart.map((product, i) => {
      if (product.id === productId) {
        quantity = product.quantity;
      }
    });
  }
  return quantity;
};

export const cartEmpty = () => {
  if (typeof window !== undefined) {
    localStorage.removeItem("cart");
    let cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

export const getTotalBillingAmount = (allProducts) => {
  console.log("getTotalBillingAmount called", allProducts);
  let cart = [...allProducts];
  let totalAmount = 0;
  cart.map((product, i) => {
    totalAmount = Number(totalAmount) + Number(product.orderPrice);
  });

  return totalAmount;
};
