import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useContext } from "react";
import CartContext from "../store/cartContext";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const OrderSuccessMessage = () => {
  const CartCtx = useContext(CartContext);
  return (
    <div>
      <Snackbar
        open={CartCtx.openSnackbarOrderSuccess}
        autoHideDuration={6000}
        onClose={() => {
          CartCtx.setOpenSnackbarOrderSuccess(false);
        }}
      >
        <Alert
          onClose={() => {
            CartCtx.setOpenSnackbarOrderSuccess(false);
          }}
          severity="success"
        >
          Order Successfully Placed!
        </Alert>
      </Snackbar>
    </div>
  );
};

export const OrderErrorMessage = () => {
  const CartCtx = useContext(CartContext);
  return (
    <div>
      <Snackbar
        open={CartCtx.openSnackbarOrderError}
        autoHideDuration={6000}
        onClose={() => {
          CartCtx.setOpenSnackbarOrderError(false);
        }}
      >
        <Alert
          onClose={() => {
            CartCtx.setOpenSnackbarOrderError(false);
          }}
          severity="error"
        >
          Could not place Order.. Please Try Again!
        </Alert>
      </Snackbar>
    </div>
  );
};
