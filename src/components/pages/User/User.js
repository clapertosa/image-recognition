import React, { Component } from "react";
import { connect } from "react-redux";

class User extends Component {
  render() {
    return <div>{this.props.user.email}</div>;
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth
  };
};

export default connect(mapStateToProps)(User);
