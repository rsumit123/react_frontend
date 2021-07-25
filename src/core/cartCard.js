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

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
  },
  chip: {
    backgroundColor: "green",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  image: {
    height: 100,
    width: 200,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
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
  deleteicon: {
    paddingTop: theme.spacing(4),

    fontSize: 15,
  },
}));

export default function CartCard(props) {
  const [counter, setCounter] = useState(1);
  const classes = useStyles();
  const CartCtx = useContext(CartContext);
  const theme = useTheme();

  function handleIncrement() {
    // setCounter((prevCounter) => {
    //   return prevCounter + 1;
    // });
    const newQuantity = CartCtx.getProductQuantity(props.product.id) + 1;

    CartCtx.updateQuantityInCart(props.product.id, newQuantity);
  }
  function handleDecrement() {
    const newQuantity = CartCtx.getProductQuantity(props.product.id) - 1;
    CartCtx.updateQuantityInCart(props.product.id, newQuantity);
  }

  function IncrementDecrementButton() {
    const displayCounter = CartCtx.getProductQuantity(props.product.id) > 0.5;
    return (
      <ButtonGroup size="small" aria-label="small outlined button group">
        <Button onClick={handleIncrement}>+</Button>
        {displayCounter && (
          <Button disabled>
            {CartCtx.getProductQuantity(props.product.id)}
          </Button>
        )}
        {displayCounter && <Button onClick={handleDecrement}>-</Button>}
      </ButtonGroup>
    );
  }

  return (
    <Card className={classes.root}>
      <Box
        className="card-body"
        display="flex"
        flexDirection="row"
        p={1}
        m={1}
        height="100%"
      >
        <CardMedia
          className={classes.image}
          component="img"
          alt="Product Image"
          height="50"
          width="50"
          image={props.product.image}
          title="Contemplative Reptile"
        />
        <Box flexDirection="column" width="80%">
          {/* <Grid container justify="center"> */}
          <div className={classes.namendescription}>
            <h5 className={classes.cardtitle}>{props.product.name}</h5>
          </div>
          <div className={classes.namendescription}>
            <h5 className={classes.cardDescription}>
              {props.product.description}
            </h5>
          </div>
          <div className={classes.namendescription}>
            <h5 className={classes.price}>$ {props.product.orderPrice}</h5>
          </div>
          <div className={classes.namendescription}>
            <h5 className={classes.stock}>
              <Chip
                className={classes.chip}
                size="small"
                label={" Available"}
                colorPrimary="green"
                color="primary"
              />
            </h5>
          </div>

          {/* </Grid> */}
        </Box>
        <Box flexDirection="column" width="20%">
          <IncrementDecrementButton />
          <IconButton
            aria-label="delete"
            className={classes.deleteicon}
            onClick={() => {
              CartCtx.removeFromCart(props.product.id);
            }}
          >
            <DeleteIcon />
            <div>
              <small>Remove Item</small>
            </div>
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
}
