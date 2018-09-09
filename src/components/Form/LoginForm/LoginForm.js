import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../../../store/actions/login";
import { Typography, TextField, Button } from "@material-ui/core";

import styles from "./LoginForm.scss";

class LoginForm extends Component {
  state = {
    user: {
      email: "",
      password: ""
    },
    emailError: "",
    passwordError: ""
  };

  onChangeHandler(e) {
    const userState = { ...this.state.user };
    userState[e.target.name] = e.target.value;
    this.setState({ user: userState });
  }

  onSubmitHandler = e => {
    e.preventDefault();
    if (!this.validate()) {
      this.props.login(this.state.user);
    }
  };

  validate = () => {
    let error = false;
    let errors = {
      emailError: ""
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

    if (this.state.user.password.length <= 0) {
      error = true;
      errors.passwordError = "Password is required";
    }

    this.setState({ ...errors });

    return error;
  };

  render() {
    return (
      <div className={styles["form-container"]}>
        <form onSubmit={e => this.onSubmitHandler(e)}>
          <Typography color="textPrimary" variant="display1">
            Login
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            onChange={e => this.onChangeHandler(e)}
            name="email"
            label="Email"
            type="text"
            helperText={this.state.emailError}
            error={this.state.emailError ? true : false}
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

          {typeof this.props.loginError === "string" ? (
            <span className={styles["error-message"]}>
              {this.props.loginError}
            </span>
          ) : null}

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
  }
}

const mapStateToProps = state => {
  return {
    loginSuccess: state.login.success,
    loginError: state.login.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: user => dispatch(login(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
