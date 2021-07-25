import React, { useState, useEffect } from "react";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { useContext } from "react";
import CartContext from "./store/cartContext";
import { loadCart } from "./helper/cartHelper";
import MediaControlCard from "./cartCard";
import CartCard from "./cartCard";
import BillingCard from "./BillingCard";
import PaymentB from "./Paymentb";

const boolFalse = false;
const useStyles = makeStyles({
  list: {
    width: 600,
  },
  fullList: {
    width: "auto",
  },
});

export default function CartDrawer() {
  const classes = useStyles();

  const CartCtx = useContext(CartContext);
  const anchor = "right";

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
    >
      {CartCtx.cartProducts.map((row) => (
        <CartCard product={row} />
      ))}
      <BillingCard />

      {CartCtx.isSignedIn ? (
        <PaymentB products={CartCtx.cartProducts} />
      ) : (
        <small>Please login to place your order</small>
      )}
    </div>
  );

  return (
    <div>
      {console.log(CartCtx.drawerOpen)}
      <Drawer
        anchor={anchor}
        open={CartCtx.drawerOpen[anchor]}
        onClose={(event) => CartCtx.setDrawerOpen(anchor, false)}
      >
        {list(anchor)}
      </Drawer>
    </div>
  );
}
