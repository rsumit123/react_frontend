import React from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import { useContext } from "react";
import CartContext from "./store/cartContext";
import { NavLink } from "react-router-dom";
import CustomFooter from "./CustomFooter";
import Avatar from "@material-ui/core/Avatar";
import { withRouter } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useEffect } from "react/cjs/react.development";
import { isAuthenticated } from "../auth/helper";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import RestoreIcon from "@material-ui/icons/Restore";
import CartDrawer from "./Drawer";
import { ListItemIcon, ListItemText } from "@material-ui/core";
import {
  OrderErrorMessage,
  OrderSuccessMessage,
  SignOutSuccessMessage,
} from "./helper/SnackbarMessages";
import OrderDrawer from "./orderDrawer";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  body: {
    marginBottom: "100px",
  },
  root: {
    width: 500,
  },
  grow: {
    flexGrow: 1,
  },
  stickToBottom: {
    width: "100%",
    position: "fixed",
    bottom: 0,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

function PrimarySearchAppBar(props) {
  const CartCtx = useContext(CartContext);

  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [snackbarOpen, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElHome, setAnchorElHome] = React.useState(null);

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMenuHomeOpen = Boolean(anchorElHome);

  const truthBool = true;

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleProfileMenuOpen = (event) => {
    console.log("profile menu should be opened");

    setAnchorEl(event.currentTarget);
  };
  const handleHomeMenuOpen = (event) => {
    console.log("Home menu should be opened");
    setAnchorElHome(event.currentTarget);
  };

  const SignOutandRedirect = () => {
    CartCtx.signOut(() => {
      props.history.push("/");
    });
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleHomeMenuClose = () => {
    setAnchorElHome(null);
  };

  const menuId = "primary-search-account-menu";
  const menuIdHome = "primary-search-account-menu";
  const anchor = "right";

  const renderHomeMenu = (
    <Menu
      anchorEl={anchorElHome}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      id={menuIdHome}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      open={isMenuHomeOpen}
      onClose={handleHomeMenuClose}
    >
      {CartCtx.isSignedIn && (
        <div>
          <MenuItem value="">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </MenuItem>
          <MenuItem
            onClick={(event) => {
              handleHomeMenuClose();
              CartCtx.setDrawerOpenOrder("left", true);
            }}
          >
            <ListItemIcon>
              <RestoreIcon />
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </MenuItem>
          {console.log("Order products", CartCtx.allUserOrders)}

          <OrderDrawer />
        </div>
      )}
      {!CartCtx.isSignedIn && (
        <div>
          <MenuItem>
            <NavLink to="/" style={{ color: "#000000" }}>
              Home{" "}
            </NavLink>
          </MenuItem>
        </div>
      )}
    </Menu>
  );

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {CartCtx.isSignedIn && (
        <div>
          <MenuItem
            onClick={() => {
              handleMenuClose();
              SignOutandRedirect();
            }}
          >
            SignOut
          </MenuItem>
        </div>
      )}
      {!CartCtx.isSignedIn && (
        <div>
          <MenuItem>
            <NavLink to="/signin" style={{ color: "#000000" }}>
              SignIn{" "}
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink to="/signup" style={{ color: "#000000" }}>
              SignUp{" "}
            </NavLink>
          </MenuItem>
        </div>
      )}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" style={{ background: "#14A098" }}>
        <Toolbar>
          <IconButton
            edge="start"
            aria-label="account of current user"
            aria-controls={menuIdHome}
            aria-haspopup="true"
            onClick={handleHomeMenuOpen}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            E-Retail
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onInput={(e) => CartCtx.setSearchQuery(e.target.value)}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              aria-label="show 4 new mails"
              color="inherit"
              onClick={(event) => CartCtx.setDrawerOpen(anchor, true)}
            >
              <Badge badgeContent={CartCtx.totalCartProducts} color="secondary">
                <AddShoppingCartIcon />
              </Badge>
            </IconButton>
            <CartDrawer />

            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {CartCtx.isSignedIn ? (
                <Avatar>{isAuthenticated().user.email.charAt(0)}</Avatar>
              ) : (
                <AccountCircle />
              )}
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      {renderMenu}
      {renderHomeMenu}

      {props.children}

      {SignOutSuccessMessage()}
      <CustomFooter />
      {CartCtx.isSignedIn && (
        <div>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="success">
              Successfully signed in!
            </Alert>
          </Snackbar>
          <OrderSuccessMessage />
          <OrderErrorMessage />
        </div>
      )}
    </div>
  );
}

export default withRouter(PrimarySearchAppBar);
