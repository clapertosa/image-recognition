import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Typography, TextField, Button } from "@material-ui/core";
import successImage from "../../../assets/images/success.svg";
import * as actions from "../../../store/actions/signup";

import styles from "./SignupForm.scss";

class SignupForm extends Component {
  state = {
    user: { email: "", password: "", password2: "" },
    emailError: "",
    passwordError: "",
    password2Error: ""
  };

  componentDidMount() {
    this.props.resetFields();
  }

  onChangeHandler = e => {
    const userState = { ...this.state.user };
    userState[e.target.name] = e.target.value;
    this.setState({ user: userState });
  };

  onSubmitHandler = e => {
    e.preventDefault();
    if (!this.validate()) {
      this.props.signup(this.state.user);
    }
  };

  validate = () => {
    let error = false;
    let errors = {
      emailError: "",
      passwordError: "",
      password2Error: ""
    };

    if (this.state.user.email.length <= 0) {
      error = true;
      errors.emailError = "Email is required";
    }

    if (
      this.state.user.email.length > 0 &&
      !this.state.user.email.match(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      error = true;
      errors.emailError = "Email is not valid";
    }

    if (
      this.state.user.password.length < 8 ||
      this.state.user.password.length > 16
    ) {
      error = true;
      errors.passwordError = "Password must be between 8 and 16 characters";
    }

    if (this.state.user.password.length <= 0) {
      error = true;
      errors.passwordError = "Password is required";
    }

    if (this.state.user.password2.length <= 0) {
      error = true;
      errors.password2Error = "Password confirmation is required";
    }

    if (this.state.user.password !== this.state.user.password2) {
      error = true;
      errors.password2Error = "Passwords don't match";
    }

    this.setState({ ...errors });

    return error;
  };

  render() {
    const signupForm = (
      <div className={styles["form-container"]}>
        <form onSubmit={e => this.onSubmitHandler(e)}>
          <Typography color="textPrimary" variant="display1">
            Signup
          </Typography>
          <TextField
            autoComplete="off"
            fullWidth
            margin="normal"
            onChange={e => this.onChangeHandler(e)}
            name="email"
            label="Email"
            helperText={this.state.emailError || this.props.signupError}
            error={
              this.state.emailError
                ? true
                : false || this.props.signupError
                  ? true
                  : false
            }
            value={this.state.user.email}
          />

          <TextField
            fullWidth
            margin="normal"
            onChange={e => this.onChangeHandler(e)}
            name="password"
            label="Password"
            type="password"
            helperText={this.state.passwordError}
            error={this.state.passwordError ? true : false}
            value={this.state.user.password}
          />

          <TextField
            fullWidth
            margin="normal"
            onChange={e => this.onChangeHandler(e)}
            name="password2"
            label="Confirm Password"
            type="password"
            helperText={this.state.password2Error}
            error={this.state.password2Error ? true : false}
            value={this.state.user.password2}
          />

          <Button
            className={styles.button}
            size="medium"
            variant="contained"
            color="primary"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    );
    const signupSuccess = (
      <div className={styles["success-container"]}>
        <div className={styles["success-message-container"]}>
          <h1>
            You've been registered. An email has been sent to{" "}
            {this.state.user.email}
          </h1>
        </div>
        <div className={styles["image-container"]}>
          <img src={successImage} />
        </div>
      </div>
    );
    return this.props.signupSuccess ? signupSuccess : signupForm;
  }
}

const mapStateToProps = state => {
  return {
    signupError: state.signup.error,
    signupSuccess: state.signup.success
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signup: user => dispatch(actions.signup(user)),
    resetFields: () => dispatch(actions.signupReset())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignupForm)
);
