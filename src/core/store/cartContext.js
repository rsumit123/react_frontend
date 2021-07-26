import { createContext, useState, useContext } from "react";
import { useEffect } from "react/cjs/react.development";
import {
  authenticate,
  isAuthenticated,
  signin,
  signout,
} from "../../auth/helper";

import {
  addItemToCart,
  removeItemFromCart,
  loadCart,
  updateItemInCart,
  getQuantityofItemInCart,
  getTotalBillingAmount,
  cartEmpty,
} from "../helper/cartHelper";
import { loadOrders } from "../helper/orderHelper";

const CartContext = createContext({
  cartProducts: [],
  totalCartProducts: 0,
  addtoCart: (product) => {},
  removeFromCart: (productId) => {},
  isSignedIn: false,
  signIn: (user) => {},
  signOut: () => {},
  errorSignIn: false,
  category: "All",
  setCategory: (event) => {},
  searchQuery: "",
  setSearchQuery: () => {},
  page: "1",
  setPage: () => {},
  totalPageLength: 5,
  setTotalPageLength: () => {},
  drawerOpen: {
    top: false,
    left: false,
    bottom: false,
    right: false,
  },
  setDrawerOpen: () => {},
  updateQuantityInCart: () => {},
  getProductQuantity: () => {},
  totalAmount: 99,
  setTotalAmount: () => {},
  getTotalAmount: () => {},
  emptyCart: () => {},
  modalOpen: false,
  setmodalOpen: () => {},
  openSnackbarOrderSuccess: false,
  setOpenSnackbarOrderSuccess: () => {},
  openSnackbarOrderError: false,
  setOpenSnackbarOrderError: () => {},
  allUserOrders: [],
  setAllUserOrders: () => {},
  setDrawerOpenOrder: () => {},
  successfulSignUp: false,
  setSuccessfulSignUp: () => {},
  setSuccessfulSignOut: () => {},
  successfulSignOut: false,

  //   itemIsAdded: (productId) => {},
});

export function CartContextProvider(props) {
  const [allCartProducts, setCartProduct] = useState([]);
  const [userIsSignedIn, setSignIn] = useState(false);
  const [errorInSigningIn, setError] = useState(false);
  const [isCategory, setIsCategory] = useState("All");
  const [searchQueryP, setSearchQueryP] = useState("");
  const [pageP, setPageP] = useState("1");
  const [totalPageLengthP, setTotalPageLengthP] = useState(5);
  const [drawerOpenP, setDrawerOpenP] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [totalAmountP, setTotalAmountP] = useState(
    getTotalBillingAmount(allCartProducts)
  );
  const [modalOpenP, setmodalOpenP] = useState(false);
  const [openSnackbarOrderSuccessP, setOpenSnackbarOrderSuccessP] =
    useState(false);
  const [openSnackbarOrderErrorP, setOpenSnackbarOrderErrorP] = useState(false);
  const [allUserOrdersP, setAllUserOrdersP] = useState([]);
  const [successfulSignUpP, setSuccessfulSignUpP] = useState(false);
  const [successfulSignOutP, setSuccessfulSignOutP] = useState(false);

  // useEffect(() => {
  //   setTotalAmountP(getTotalBillingAmount);
  // }, []);
  useEffect(() => {
    setSuccessfulSignUpP(false);
  }, []);

  useEffect(() => {
    setCartProduct(loadCart);
  }, []);
  useEffect(() => {
    setSignIn(isAuthenticated);
  }, []);
  useEffect(() => {
    setError(false);
  }, []);
  useEffect(() => {
    setIsCategory("All");
  }, []);
  useEffect(() => {
    setSearchQueryP("");
  }, []);

  function LoadOrders() {
    loadOrders(isAuthenticated().user.id).then((res) => {
      console.log("set orders ", res);
      setAllUserOrdersP(res);
    });
  }

  function signInHandler(user, redir) {
    signin(user)
      .then((data) => {
        console.log("DATA", data);
        setError(false);
        if (data.token) {
          // let sessionToken = data.token;
          authenticate(data, () => {
            console.log("Token added");

            setSignIn(true);
            redir.push("/");

            return true;
          });
        } else {
          console.log("Error should be set to True now");
          setError(true);
        }
      })
      .catch((e) => {
        console.log(e);
        setError(true);
        return false;
      });
  }

  function signOutHandler(next) {
    setSuccessfulSignOutP(true);
    signout(next);
    setSignIn(false);
  }

  function addtoCartHandler(product) {
    addItemToCart(product);
    setCartProduct(loadCart);
  }

  function removeFromCartHandler(productId) {
    removeItemFromCart(productId);

    setCartProduct(loadCart);
  }
  function emptyTheCartP() {
    cartEmpty();
    setCartProduct(loadCart);
  }
  function updateCartHandler(productId, quantity) {
    updateItemInCart(productId, quantity);
    setCartProduct(loadCart);
  }
  function getProductQuantityHandler(productId) {
    const previousQuantity = getQuantityofItemInCart(productId);
    return previousQuantity;
  }

  function categoryOnChangeHandler(event) {
    setIsCategory(event.target.value);
  }

  function setSearchQueryPHandler(value) {
    setSearchQueryP(value);
  }

  function setPageHandler(page) {
    setPageP(page);
  }

  function setTotalPageLengthHandler(noOfProducts) {
    setTotalPageLengthP(Math.ceil(noOfProducts / 4));
  }

  function setDrawerOpenHandler(anchor, open) {
    let items = { ...drawerOpenP };
    console.log("Drawer open was called", anchor, open);

    items[anchor] = open;
    setDrawerOpenP(items);
  }

  function setDrawerOpenOrderHandler(anchor, open) {
    console.log("drawer open ordr fn called");

    LoadOrders();
    let items = { ...drawerOpenP };

    console.log("Drawer open was called", anchor, open);
    items[anchor] = open;
    setDrawerOpenP(items);
  }

  function setDrawerCloseHandler(anchor, open) {
    let items = { ...drawerOpenP };
    console.log("Drawer close was called", anchor, open);
    items[anchor] = open;
    setDrawerOpenP(items);
  }
  function setTotalAmountPHandler() {
    setTotalAmountP(getTotalBillingAmount(allCartProducts));
  }
  function getTotalAmountP() {
    const amount = getTotalBillingAmount(allCartProducts);
    return amount;
  }

  function setmodalOpenPHandler(value) {
    setmodalOpenP(value);
  }

  function setOpenSnackbarOrderSuccessPHandler(value) {
    setOpenSnackbarOrderSuccessP(value);
  }

  function setOpenSnackbarOrderErrorPHandler(value) {
    setOpenSnackbarOrderErrorP(value);
  }

  //   function itemIsFavoriteHandler(meetupId) {
  //     return userFavorites.some((meetup) => meetup.id === meetupId);
  //   }

  function getlength(allCartProducts) {
    try {
      return allCartProducts.length;
    } catch (error) {
      return 0;
    }
  }
  const context = {
    cartProducts: allCartProducts,
    totalCartProducts: getlength(allCartProducts),
    signIn: signInHandler,
    signOut: signOutHandler,
    isSignedIn: userIsSignedIn,
    errorSignIn: errorInSigningIn,

    addtoCart: addtoCartHandler,
    removeFromCart: removeFromCartHandler,
    setCategory: categoryOnChangeHandler,
    category: isCategory,
    searchQuery: searchQueryP,
    setSearchQuery: setSearchQueryPHandler,
    page: pageP,
    setPage: setPageHandler,
    totalPageLength: totalPageLengthP,
    setTotalPageLength: setTotalPageLengthHandler,
    drawerOpen: drawerOpenP,
    setDrawerOpen: setDrawerOpenHandler,
    setDrawerClose: setDrawerCloseHandler,
    updateQuantityInCart: updateCartHandler,
    getProductQuantity: getProductQuantityHandler,
    totalAmount: totalAmountP,
    getTotalAmount: getTotalAmountP,
    emptyCart: emptyTheCartP,
    modalOpen: modalOpenP,
    setmodalOpen: setmodalOpenPHandler,
    openSnackbarOrderSuccess: openSnackbarOrderSuccessP,
    setOpenSnackbarOrderSuccess: setOpenSnackbarOrderSuccessPHandler,
    openSnackbarOrderError: openSnackbarOrderErrorP,
    setOpenSnackbarOrderError: setOpenSnackbarOrderErrorPHandler,
    allUserOrders: allUserOrdersP,
    setDrawerOpenOrder: setDrawerOpenOrderHandler,
    setSuccessfulSignUp: setSuccessfulSignUpP,
    successfulSignUp: successfulSignUpP,
    setSuccessfulSignOut: setSuccessfulSignOutP,
    successfulSignOut: successfulSignOutP,

    // itemIsFavorite: itemIsFavoriteHandler,
  };

  return (
    <CartContext.Provider value={context}>
      {props.children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error(`useCartContext must be used within CartContextProvider`);
  }
  return context;
}

export default CartContext;
