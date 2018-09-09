import React, { Component } from "react";
import { connect } from "react-redux";
import { validate } from "../../../store/actions/validate";

class Validate extends Component {
  componentDidMount() {
    this.props.validate(this.props.location.search);
  }

  render() {
    return <h1>{this.props.validateSuccess || this.props.validateError}</h1>;
  }
}

const mapStateToProps = state => {
  return {
    validateError: state.validate.error,
    validateSuccess: state.validate.success
  };
};

const mapDispatchToProps = dispatch => {
  return {
    validate: token => dispatch(validate(token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Validate);
