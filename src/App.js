import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import {
  Home,
  Login,
  Signup,
  Validate,
  User,
  Logout
} from "./components/pages/";
import posed, { PoseGroup } from "react-pose";
import Layout from "./hoc/Layout/Layout";

class App extends Component {
  render() {
    const RouteContainer = posed.div({
      enter: { opacity: 1, delay: 300, beforeChildren: true },
      exit: { opacity: 0 }
    });

    let routes = (
      <PoseGroup>
        <RouteContainer key={this.props.location.key}>
          <Switch location={this.props.location}>
            <Route
              path="/login"
              render={() =>
                this.props.isAuthenticated ? (
                  <Redirect to={{ pathname: "/", state: { referrer: "/" } }} />
                ) : (
                  <Login />
                )
              }
            />
            <Route path="/signup/validate" component={Validate} />
            <Route
              path="/signup"
              render={() =>
                this.props.isAuthenticated ? (
                  <Redirect to={{ pathname: "/" }} />
                ) : (
                  <Signup />
                )
              }
            />
            <Route path="/" exact component={Home} />
            <Redirect to="/" />
          </Switch>
        </RouteContainer>
      </PoseGroup>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/user" component={User} />
          <Route path="/logout" component={Logout} />
          <Route path="/signup/validate" component={Validate} />
          <Route path="/" exact component={Home} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return <Layout>{routes}</Layout>;
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default withRouter(connect(mapStateToProps)(App));
