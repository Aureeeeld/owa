import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "../pages/Home";

export const App = () => (
  <>
    <Switch>
      <Route component={Home} exact path="/" />
    </Switch>
  </>
);

export default App;
