import React, { Component } from "react";
import { connect } from "react-redux";
import { NavBarItem } from "../../../../components";

import styles from "./NavBarItems.scss";

class NavBarItems extends Component {
  render() {
    let navBarLinks = (
      <ul>
        <NavBarItem exact url="/">
          Home
        </NavBarItem>
        <NavBarItem url="/login">Login</NavBarItem>
        <NavBarItem url="/signup" backgroundColor="#007209">
          Signup
        </NavBarItem>
      </ul>
    );

    if (this.props.isAuthenticated) {
      navBarLinks = (
        <ul>
          <NavBarItem exact url="/">
            Home
          </NavBarItem>
          <NavBarItem url="/user">User</NavBarItem>
          <NavBarItem url="/logout" backgroundColor="#007209">
            Logout
          </NavBarItem>
        </ul>
      );
    }

    return navBarLinks;
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.user.isAuthenticated
  };
};

export default connect(mapStateToProps)(NavBarItems);
