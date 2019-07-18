const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 words";
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name is empty";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is empty";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password lie between 6 to 30 words";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is empty";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password is Empty";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Password are not matching";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
