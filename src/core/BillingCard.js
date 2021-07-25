import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Chip from "@material-ui/core/Chip";
import { useContext } from "react";
import CartContext from "./store/cartContext";
import createTypography from "@material-ui/core/styles/createTypography";
import CartCard from "./cartCard";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },

  chip: {
    backgroundColor: "green",
  },

  cardDescription: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(0.5),
    color: "black",
  },
  cardtitle: {
    fontWeight: "bold",
  },
  price: {
    color: "black",
  },
  stock: {
    color: "black",
  },
  namendescription: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  values: {
    textAlign: "right",
    alignSelf: "flex-end",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
}));

export default function BillingCard() {
  const classes = useStyles();
  const CartCtx = useContext(CartContext);

  const placeOrderDisabled = () => {
    if (CartCtx.cartProducts.length > 0 && CartCtx.isSignedIn) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <Card className={classes.root}>
      <Box
        className="card-body"
        display="flex"
        flexDirection="column"
        p={1}
        m={1}
        bgcolor="background.paper"
        height="100%"
      >
        <div className={classes.namendescription}>
          <h5 className={classes.cardtitle}>**Total Bill**</h5>
        </div>
        <Box display="flex" flexDirection="row">
          <Box flexDirection="row" justifyContent="flex-start" width="50%">
            <h5>Total Product Count</h5>
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            justifyContent="flex-end"
            alignItems="flex-end"
            width="50%"
          >
            {CartCtx.cartProducts.length}
          </Box>
        </Box>
        <Box display="flex" flexDirection="row">
          <Box flexDirection="row" justifyContent="flex-start" width="50%">
            <h5>Shipping</h5>
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            justifyContent="flex-end"
            alignItems="flex-end"
            width="50%"
          >
            Free
          </Box>
        </Box>
        <Box display="flex" flexDirection="row">
          <Box flexDirection="row" justifyContent="flex-start" width="50%">
            <h5>Total Bill</h5>
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            justifyContent="flex-end"
            alignItems="flex-end"
            width="50%"
          >
            $ {CartCtx.getTotalAmount()}
          </Box>
        </Box>

        <Button
          variant="contained"
          color="primary"
          disableElevation
          disabled={placeOrderDisabled()}
          onClick={() => {
            CartCtx.setmodalOpen(true);
          }}
        >
          Place Order
        </Button>
      </Box>
    </Card>
  );
}
