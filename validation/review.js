const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateReviewInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";
  data.title = !isEmpty(data.title) ? data.title : "";

  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = "Review must between 10 to 300 words";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Review field is required";
  }
  if (Validator.isEmpty(data.title)) {
    errors.title = "Title is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
