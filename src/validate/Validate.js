import validator from "validator";

export function validate({
  firstName,
  lastName,
  emailOrphone,
  password,
  confirmPassword,
  setErrorValidate,
}) {
  if (validator.isEmpty(firstName)) {
    setErrorValidate((prev) => ({
      ...prev,
      errFirstName: "FirstName is required",
    }));
  } else {
    setErrorValidate((prev) => ({ ...prev, errFirstName: "" }));
  }

  if (validator.isEmpty(lastName)) {
    setErrorValidate((prev) => ({
      ...prev,
      errLastName: "LastName is required",
    }));
  } else {
    setErrorValidate((prev) => ({ ...prev, errLastName: "" }));
  }

  if (
    !(validator.isEmail(emailOrphone) || validator.isMobilePhone(emailOrphone))
  ) {
    setErrorValidate((prev) => ({
      ...prev,
      errEmailOrPhone: "Invalid Format",
    }));
  } else {
    setErrorValidate((prev) => ({ ...prev, errEmailOrPhone: "" }));
  }

  if (validator.isEmpty(password)) {
    setErrorValidate((prev) => ({
      ...prev,
      errPassword: "Password is required",
    }));
  } else if (password.length < 4) {
    setErrorValidate((prev) => ({
      ...prev,
      errPassword: "password must be greater than 4 characters",
    }));
  } else {
    setErrorValidate((prev) => ({ ...prev, errPassword: "" }));
  }

  if (validator.isEmpty(confirmPassword)) {
    setErrorValidate((prev) => ({
      ...prev,
      errConfirm: "Confirm Password is required",
    }));
  } else if (password !== confirmPassword) {
    setErrorValidate((prev) => ({
      ...prev,
      errConfirm: "password not match",
    }));
  } else {
    setErrorValidate((prev) => ({ ...prev, errConfirm: "" }));
  }
}

export default validate;
