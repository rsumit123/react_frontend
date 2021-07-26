import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Badge, Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Chip from "@material-ui/core/Chip";
import { useContext } from "react";
import CartContext from "./store/cartContext";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(1),
  },
  root: {
    width: "100%",
    display: "flex",
    backgroundColor: "#f5f5f5",
  },
  root1: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    margin: theme.spacing(2),
    padding: "5px",
    position: "relative",
    flex: 3,
  },
  root2: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    height: "100%",
    backgroundColor: "#f5f5f5",
    flex: 2,
    flexDirection: "column",
    marginTop: "auto",
    marginBottom: "auto",
    marginRight: "1rem",
    gap: "0.5rem",
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
    height: 60,
    width: 100,
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  cardDescription: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(0.5),
    color: "black",
  },
  cardtitle: {
    fontWeight: "bold",
    fontSize: "14px",
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
  orderText: {
    textAlign: "right",
  },
  orderNo: {
    textAlign: "center",
  },

  badge: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "40px",
    height: "auto",
    backgroundColor: "gray",
    textAlign: "center",
  },
  hr: {
    width: "100%",
    display: "block",
    height: "1px",
    border: 0,
    borderTop: "1px solid #000",
    margin: "1em",
    padding: 0,
    backgroundColor: "green",
  },
}));

export function OrderProducts(props) {
  const classes = useStyles();
  const checkOrderClosed = (index, totalLength) => {
    if (Number(index + 1) === Number(totalLength)) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div className={classes.container}>
      <Box className={classes.root}>
        <Box container className={classes.root1}>
          <Box display="flex" flexDirection="row" p={1} m={1}>
            <CardMedia
              className={classes.image}
              component="img"
              alt="Product Image"
              height="50"
              width="50"
              image={props.image}
              title="Contemplative Reptile"
            />
            <Box flexDirection="column">
              {/* <Grid container justify="center"> */}
              <div className={classes.namendescription}>
                <h5 className={classes.cardtitle}>{props.name}</h5>
              </div>
              <div className={classes.namendescription}>
                <h5 className={classes.cardDescription}>${props.price}</h5>
              </div>

              {/* </Grid> */}
            </Box>
          </Box>
          <div className={classes.badge}>{props.quantity}</div>
        </Box>
        <Box className={classes.root2}>
          {checkOrderClosed(props.index, props.totalLength) && (
            <div className={classes.root2}>
              <h4 className={classes.orderText}>
                Total Items : {props.totalLength}
              </h4>
              <h4 className={classes.orderText}>
                Total Amount : {props.totalamount}
              </h4>
            </div>
          )}
        </Box>
      </Box>
      {checkOrderClosed(props.index, props.totalLength) && (
        <hr className={classes.hr} />
      )}
    </div>
  );
}

export default function OrderCard(props) {
  const classes = useStyles();
  const CartCtx = useContext(CartContext);
  const theme = useTheme();

  return <div></div>;
}
