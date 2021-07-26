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
    backgroundColor: "#337AFF",
    margin: "0 auto",
    marginTop: theme.spacing(1),
    display: "flex",
    color: "white",
    marginBottom: theme.spacing(1),
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
  login_form: {
    width: "40%",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    alignSelf: "center",
    border: `1px solid #ccc`,
    margin: "0 auto",
  },

  label: {
    display: "block",
    margin: "0 auto",
    fontSize: "13px",

    fontWeight: "bold",
    marginLeft: theme.spacing(5),

    marginBottom: theme.spacing(0.5),
  },
  label_login: {
    marginTop: theme.spacing(4),

    fontSize: "20px",
    display: "block",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: theme.spacing(2),
  },

  input: {
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),
    marginBottom: theme.spacing(1),
    display: "block",
    font: "inherit",
    borderRadius: "5px",
    border: `1px solid #ccc`,

    padding: theme.spacing(0.5),
    width: "80%",
  },
  input_small: {
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),

    display: "block",
    font: "inherit",
    borderRadius: "5px",
    border: `1px solid #ccc`,

    padding: theme.spacing(0.5),
    width: "80%",
  },
  display_small: {
    marginLeft: theme.spacing(5),
    marginBottom: theme.spacing(1),
  },
}));

function SignUp(props) {
  const classes = useStyles();
  const CartCtx = useContext(CartContext);
  const [snackbarOpen, setOpen] = React.useState(false);
  const [error, updateStatus] = React.useState(false);
  const [errorMessage, setError] = React.useState("");

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
    if (password === confirm_password) {
      signup({ name, email, password })
        .then((data) => {
          console.log("DATA ", data);
          if (data.email === email) {
            CartCtx.setSuccessfulSignUp(true);
            props.history.push("/signin");
          } else {
            console.log("error signing up");
            setError("Some error in signing up. Contact the administrator !");
            updateStatus(true);
            setOpen(true);
          }
        })
        .catch((e) => {
          console.log(e);
          setError("Some error in signing up. Contact the administrator !");
          updateStatus(true);
          setOpen(true);
        });

      console.log("SignedIn");
    } else {
      setError("Passwords do not Match !");
      updateStatus(true);
      setOpen(true);
    }
  }

  return (
    <PrimarySearchAppBar>
      <Box className={classes.login_form}>
        <label className={classes.label_login}>SIGN-UP FORM</label>

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
            placeholder="Enter your name"
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
            className={classes.input_small}
            id="email"
            placeholder="Enter email"
            type="text"
            ref={emailInputRef}
          />
          <small className={classes.display_small}>
            We'll Never share your email with anyone else
          </small>
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
            placeholder="Password"
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
            placeholder="Re-type Password"
            type="password"
            ref={confirmPasswordInputRef}
          />

          <Button
            type="submit"
            variant="contained"
            size="medium"
            onClick={submitHandler}
            className={classes.margin}
          >
            Submit
          </Button>
        </form>
      </Box>
      {error && (
        <div>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="error">
              {errorMessage}
            </Alert>
          </Snackbar>
        </div>
      )}
    </PrimarySearchAppBar>
  );
}

export default withRouter(SignUp);
