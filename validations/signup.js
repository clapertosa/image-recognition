const isEmpty = require("./isEmpty");

function validateSignup(data) {
  let errors = {};

  if (!data.email) {
    errors.email = "Email required";
    return { errors, isValid: isEmpty(errors) };
  }

  if (!data.password) {
    errors.password = "Password required";
    return { errors, isValid: isEmpty(errors) };
  }

  //EMAIL
  if (
    !data.email.match(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    errors.email = "Email is not valid";
  }

  if (data.email.trim().length <= 0) {
    errors.email = "Email is required";
  }

  //PASSWORD
  if (data.password.length < 8 || data.password.length > 16) {
    errors.password = "Password must be between 8 and 16 characters";
  }

  if (data.password.length <= 0) {
    errors.password = "Password is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

module.exports = validateSignup;
