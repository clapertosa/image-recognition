const isEmpty = require("./isEmpty");

function validateLogin(data) {
  let errors = {};

  if (!data.email) {
    errors.email = "Email required";
    return { errors, isValid: isEmpty(errors) };
  }

  if (!data.password) {
    errors.password = "Password required";
    return { errors, isValid: isEmpty(errors) };
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

module.exports = validateLogin;
