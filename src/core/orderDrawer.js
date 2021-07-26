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
import { useCartContext } from "./store/cartContext";
import { loadCart } from "./helper/cartHelper";
import MediaControlCard from "./cartCard";
import CartCard from "./cartCard";
import BillingCard from "./BillingCard";
import PaymentB from "./Paymentb";
import OrderCard, { OrderProducts } from "./orderCard";
import { Box } from "@material-ui/core";

const boolFalse = false;
const useStyles = makeStyles({
  list: {
    width: 600,
  },
  fullList: {
    width: "auto",
  },
});

export default function OrderDrawer() {
  const classes = useStyles();

  const CartCtx = useCartContext();
  const anchor = "left";

  const drawerBody = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
    >
      {CartCtx.allUserOrders.length > 0 ? (
        CartCtx.allUserOrders.map((row, index) =>
          row.products.map((product, productIndex) => (
            <OrderProducts
              index={productIndex}
              name={product.name}
              price={product.price}
              image={product.image}
              quantity={product.quantity}
              totalLength={row.products.length}
              totalamount={row.total_amount}
            />
          ))
        )
      ) : (
        <h1>No orders to display</h1>
      )}
    </div>
  );

  return (
    <div>
      <Drawer
        anchor={anchor}
        open={CartCtx.drawerOpen[anchor]}
        onClose={(event) => CartCtx.setDrawerOpen(anchor, false)}
      >
        {drawerBody(anchor)}
      </Drawer>
    </div>
  );
}
