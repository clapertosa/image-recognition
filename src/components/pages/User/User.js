import React, { Component } from "react";
import { connect } from "react-redux";
import { getRecognitions } from "../../../store/actions/user";

class User extends Component {
  componentDidMount = () => {
    this.props.getRecognitions();
  };

  render() {
    return (
      <div>
        <h1>
          You have recognized {this.props.user.recognitions} image
          {this.props.user.recognitions > 1 ? "s" : ""}
        </h1>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRecognitions: () => dispatch(getRecognitions())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
