import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import PrimarySearchAppBar from "../core/Base_material";
import { useContext } from "react";

import Card from "../ui/Card";
import { useRef } from "react";
import { authenticate, isAuthenticated, signin } from "./helper";
import CartContext from "../core/store/cartContext";
import { withRouter } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useEffect } from "react/cjs/react.development";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "2000px",

    maxWidth: false,
  },
  container_class: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    padding: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  control: {
    marginBottom: theme.spacing(1),
  },

  label: {
    display: "block",
    fontWeight: "bold",
    marginBottom: theme.spacing(1),
  },
  label_login: {
    marginTop: theme.spacing(8),
    fontSize: "25px",
    display: "block",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: theme.spacing(2),
  },

  input: {
    display: "block",
    font: "inherit",
    borderRadius: "5px",

    padding: theme.spacing(0.5),
    width: "100%",
  },
}));

function SignIn(props) {
  const classes = useStyles();
  const CartCtx = useContext(CartContext);
  const [snackbarOpen, setOpen] = React.useState(false);
  const [error, updateStatus] = React.useState(true);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const handleClick = () => {
    updateStatus(false);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    updateStatus(false);
  };

  function submitHandler(event) {
    event.preventDefault();

    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    CartCtx.signIn({ email, password }, props.history);

    //   .then((data) => {
    //     if (!data) {
    //       setOpen(true);
    //       updateStatus(true);
    //     } else {
    //       props.history.push("/");
    //     }
    //   })
    //   .catch((e) => console.log(e));

    // props.history.push("/");

    // if (success_or_failed) {
    //   console.log("SignedIn");
    //   props.history.push("/");
    // }
  }

  return (
    <PrimarySearchAppBar>
      <Container
        className={classes.container_class}
        component="main"
        maxWidth="sm"
      >
        <Card>
          <label className={classes.label_login} style={{ display: "block" }}>
            Login Form
          </label>

          <form className={classes.form} onSubmit={submitHandler}>
            <label
              className={classes.label}
              htmlFor="email"
              style={{ display: "block" }}
            >
              Email address
            </label>
            <input
              className={classes.input}
              id="email"
              placeholder="Enter your email"
              type="text"
              ref={emailInputRef}
            />
            <small>We'll Never share your email with anyone else</small>
            <br />

            <label
              className={classes.label}
              htmlFor="password"
              style={{ display: "block" }}
            >
              Password
            </label>
            <input
              className={classes.input}
              id="password"
              placeholder="Enter your Password"
              type="password"
              ref={passwordInputRef}
            />
            <br />

            <Button
              style={{ margin: "0 auto", display: "flex" }}
              variant="contained"
              size="medium"
              color="primary"
              onClick={submitHandler}
              className={classes.margin}
            >
              Submit
            </Button>
          </form>
        </Card>
        {error && (
          <div>
            <Snackbar
              open={CartCtx.errorSignIn}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              <Alert onClose={handleClose} severity="error">
                Some error in signing in!
              </Alert>
            </Snackbar>
          </div>
        )}
      </Container>
    </PrimarySearchAppBar>
  );
}

export default withRouter(SignIn);
