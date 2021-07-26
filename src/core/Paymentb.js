import React, { useState, useEffect } from "react";

import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { isAuthenticated, signout } from "../auth/helper";
import { cartEmpty } from "./helper/cartHelper";
import { createOrder } from "./helper/orderHelper";
import { getmeToken, processPayment } from "./helper/paymentHelper";
import { useContext } from "react";
import CartContext from "./store/cartContext";
import DropIn from "braintree-web-drop-in-react";
import { Button } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  paper2: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  moveRight: {
    alignItems: "right",
  },
}));

const PaymentB = ({ products }) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const userId = isAuthenticated && isAuthenticated().user.id;
  const token = isAuthenticated && isAuthenticated().token;
  const CartCtx = useContext(CartContext);
  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }

  function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const handleClose = () => {
    CartCtx.setmodalOpen(false);
  };

  // const handleCloseSnackBar = (event, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }

  //   setOpenSnackbar(false);
  // };

  const showSuccessMessage = () => {};

  const getToken = (userId, token) => {
    getmeToken(userId, token).then((info) => {
      try {
        if (info.error) {
          setInfo({
            ...info,
            error: info.error,
          });
        } else {
          const clientToken = info.clientToken;
          setInfo({ clientToken });
        }
      } catch (error) {
        setInfo({
          ...info,
          error: error,
        });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    let getNonce = info.instance
      .requestPaymentMethod()
      .then((data) => {
        console.log("MYDATA", data);
        nonce = data.nonce;
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: CartCtx.getTotalAmount(),
        };
        processPayment(userId, token, paymentData)
          .then((response) => {
            console.log("POINT-1", response);
            if (response.error) {
              if (response.code == "1") {
                console.log("PAYMENT FAILED");
                CartCtx.setOpenSnackbarOrderError(true);
                handleClose();
              }
            } else {
              setInfo({ ...info, success: response.success, loading: false });
              console.log("PAYMENT SUCCESS");
              let product_names = "";
              products.forEach(function (item) {
                product_names +=
                  item.name +
                  "|" +
                  item.price +
                  "|" +
                  item.quantity +
                  "|" +
                  item.image +
                  " + ";
              });

              const orderData = {
                products: product_names,
                transaction_id: response.transaction.id,
                amount: response.transaction.amount,
              };
              createOrder(userId, token, orderData)
                .then((response) => {
                  if (response.error) {
                    if (response.code == "1") {
                      console.log("Order failed");
                      CartCtx.setOpenSnackbarOrderError(true);
                      handleClose();
                    }
                  } else {
                    if (response.success == true) {
                      console.log("ORDER PLACED");
                    }
                  }
                })
                .catch((error) => {
                  setInfo({ loading: false, success: false });
                  console.log("Order failed", error);
                });
              CartCtx.emptyCart();
              handleClose();
              CartCtx.setOpenSnackbarOrderSuccess(true);
            }
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => {
        console.log("NONCE", e);
        CartCtx.setOpenSnackbarOrderError(true);
        handleClose();
      });
  };

  const showbtnDropIn = () => {
    return (
      <div style={getModalStyle()} className={classes.paper2}>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            ></DropIn>

            <Box display="flex" flexDirection="row">
              <Box flexDirection="row" justifyContent="flex-start" width="50%">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={onPurchase}
                >
                  Buy Now
                </Button>
              </Box>

              <Box
                display="flex"
                flexDirection="row"
                justifyContent="flex-end"
                alignItems="flex-end"
                width="50%"
              >
                <Button
                  className={classes.moveRight}
                  variant="contained"
                  color="primary"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </div>
        ) : (
          <h3>Please add something in cart</h3>
        )}
      </div>
    );
  };

  return (
    <Modal
      open={CartCtx.modalOpen}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {showbtnDropIn()}
    </Modal>
  );
};

export default PaymentB;
