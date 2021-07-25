import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import { CartContextProvider } from "./core/store/cartContext";

// import Signup from "./user/signup";
// import PrivateRoutes from "./auth/helper/PrivateRoutes";
// import Signin from "./user/signin";
import Home from "./core/Home";
import SignIn from "./auth/signin";
import SignUp from "./auth/signup";

// import UserDashboard from "./user/UserDashboard";
// import Cart from "./core/Cart";

const Routes = () => {
  return (
    <CartContextProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signin" exact component={SignIn} />
          <Route path="/signup" exact component={SignUp} />

          {/* <Route path="/signup" exact component={Signup} />
        // 
        <Route path="/cart" exact component={Cart} />
        <PrivateRoutes path="/user/dashboard" exact component={UserDashboard} /> */}
        </Switch>
      </BrowserRouter>
    </CartContextProvider>
  );
};

export default Routes;
