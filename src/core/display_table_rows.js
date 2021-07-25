import React from "react";
import Button from "@material-ui/core/Button";

// import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
// import { isAuthenticated } from "../auth/helper";
import { makeStyles } from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import { addItemToCart } from "./helper/cartHelper";

import TableRow from "@material-ui/core/TableRow";
import { useContext } from "react";
import CartContext from "./store/cartContext";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  image: {
    width: 50,
    height: 50,
    maxHeight: "100%",
    maxWidth: "100%",
  },
  chip: {
    backgroundColor: "green",
  },
  chipNoStock: {
    backgroundColor: "red",
  },
});

export default function TableCells(props) {
  const classes = useStyles();
  const CartCtx = useContext(CartContext);

  const product = {
    id: props.id,
    name: props.name,
    description: props.description,
    price: props.price,
    stock: props.stock,
    image: props.image,
    quantity: 1,
    orderPrice: props.price,
  };
  const addToCart = () => {
    CartCtx.addtoCart(product);
    console.log("Added to Cart", product);
  };
  const getBgColor = (index) => {
    if (index % 2 === 0) {
      return "#f5f5f5";
    } else {
      return "white";
    }
  };

  return (
    <TableRow key={props.name} bgcolor={getBgColor(props.index)}>
      <TableCell component="th" scope="row">
        <img className={classes.image} src={props.image} />
      </TableCell>
      <TableCell align="right">{props.name}</TableCell>
      <TableCell align="right">{props.description}</TableCell>
      <TableCell align="right">$ {props.price}</TableCell>
      <TableCell align="right">
        {props.stock > 0 ? (
          <Chip
            className={classes.chip}
            size="small"
            label={" Available"}
            color="primary"
          />
        ) : (
          <Chip
            className={classes.chipNoStock}
            size="small"
            label={" Out of Stock"}
            color="primary"
          />
        )}
      </TableCell>
      <TableCell align="right">
        <Button
          variant="contained"
          color="primary"
          disabled={props.stock == 0}
          onClick={addToCart}
        >
          Add To Cart
        </Button>
      </TableCell>
    </TableRow>
  );
}
