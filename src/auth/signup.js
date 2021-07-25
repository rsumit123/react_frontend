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
import { authenticate, isAuthenticated, signin, signup } from "./helper";
import CartContext from "../core/store/cartContext";
import { withRouter } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

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

function SignUp(props) {
  const classes = useStyles();
  const CartCtx = useContext(CartContext);
  const [snackbarOpen, setOpen] = React.useState(false);
  const [error, updateStatus] = React.useState(false);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const nameInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  function submitHandler(event) {
    event.preventDefault();
    const name = nameInputRef.current.value;

    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    const confirm_password = confirmPasswordInputRef.current.value;

    console.log({ email: email, password: password });

    signup({ name, email, password })
      .then((data) => {
        console.log("DATA ", data);
        if (data.email === email) {
          props.history.push("/signin");
        } else {
          console.log("error signing up");
          updateStatus(true);
          setOpen(true);
        }
      })
      .catch((e) => {
        console.log(e);
        updateStatus(true);
        setOpen(true);
      });

    console.log("SignedIn");
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
            Sign-Up Form
          </label>

          <form className={classes.form} onSubmit={submitHandler}>
            <label
              className={classes.label}
              htmlFor="name"
              style={{ display: "block" }}
            >
              Name
            </label>
            <input
              className={classes.input}
              id="name"
              placeholder="Enter your email"
              type="text"
              ref={nameInputRef}
            />
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
            <label
              className={classes.label}
              htmlFor="confirm_password"
              style={{ display: "block" }}
            >
              Confirm Password
            </label>
            <input
              className={classes.input}
              id="confirm_password"
              placeholder="Enter your Password Again"
              type="password"
              ref={confirmPasswordInputRef}
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
              open={snackbarOpen}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              <Alert onClose={handleClose} severity="error">
                Some error in signing up , Please contact Administrator!
              </Alert>
            </Snackbar>
          </div>
        )}
      </Container>
    </PrimarySearchAppBar>
  );
}

export default withRouter(SignUp);
