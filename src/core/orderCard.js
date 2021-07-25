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
  root: {
    width: "100%",
    display: "flex",

    height: 100,
    backgroundColor: "#f5f5f5",
  },
  root1: {
    width: "50%",
    height: "80%",
    backgroundColor: "white",
    marginBottom: theme.spacing(2),
    padding: "5px",
  },
  root2: {
    display: "flex",
    justifyContent: "flex-end",

    width: "50%",
    height: 80,
    backgroundColor: "#f5f5f5",
    marginBottom: theme.spacing(2),
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
}));

export default function OrderCard(props) {
  const [counter, setCounter] = useState(1);
  const classes = useStyles();
  const CartCtx = useContext(CartContext);
  const theme = useTheme();

  return (
    <div>
      <Box className={classes.root}>
        <Box container className={classes.root1}>
          <Box
            className="card-body"
            display="flex"
            flexDirection="row"
            p={1}
            m={1}
            height="50%"
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
                  ${props.product.price}
                </h5>
              </div>

              {/* </Grid> */}
            </Box>
          </Box>
        </Box>

        <Box display="flex" flexDirection="row" className={classes.root2}>
          <Box display="flex" flexDirection="column" justifyContent="flex-end">
            <h4>Total Items : 0</h4>
            <h4>Total Amount : 0</h4>
          </Box>
        </Box>
      </Box>
      <Divider style={{ width: "100%" }} />
    </div>
  );
}
