import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./Components/Home";
import PrivateRoutes from "./Components/PrivateRoutes";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoutes path="/" exact component={Home} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
