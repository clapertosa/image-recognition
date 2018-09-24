import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { validate } from "../../../store/actions/validate";
import { Spinner } from "../../../components";

class Validate extends Component {
  componentDidMount() {
    this.props.validate(this.props.location.search);
    setTimeout(() => {
      this.props.history.push("/");
    }, 3000);
  }

  render() {
    return this.props.validateLoading ? (
      <Spinner />
    ) : this.props.validateSuccess ? (
      <h1>
        Your account has been activated.
        <br />
        You will soon be redirected.
      </h1>
    ) : (
      <h1>
        {this.props.validateError}
        <br />
        You will soon be redirected.
      </h1>
    );
  }
}

const mapStateToProps = state => {
  return {
    validateError: state.validate.error,
    validateSuccess: state.validate.success,
    validateLoading: state.validate.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    validate: token => dispatch(validate(token))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Validate)
);
