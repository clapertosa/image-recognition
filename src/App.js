import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { Home, Login, Signup } from "./components/pages/";
import Layout from "./hoc/Layout/Layout";

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/" exact component={Home} />
        <Route component={Home} />
      </Switch>
    );

    return <Layout>{routes}</Layout>;
  }
}
export default withRouter(App);
