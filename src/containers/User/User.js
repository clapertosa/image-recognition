import React, { Component } from "react";
import { connect } from "react-redux";

import styles from "./User.scss";

class User extends Component {
  render() {
    return <div>User</div>;
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(User);
