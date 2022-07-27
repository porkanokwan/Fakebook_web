import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import validator from "validator";

function RegisterForm({ closeModal }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailOrphone, setemailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfrimPassword] = useState("");
  const [error, setError] = useState({
    errFirstName: "",
    errLastName: "",
    errEmailOrPhone: "",
    errPassword: "",
    errConfirm: "",
  });

  const value = useContext(AuthContext);

  const handleSignUp = async (e) => {
    try {
      e.preventDefault();
      // validate ก่อน
      if (validator.isEmpty(firstName)) {
        setError((prev) => ({
          ...prev,
          errFirstName: "FirstName is required",
        }));
      } else {
        setError((prev) => ({ ...prev, errFirstName: "" }));
      }

      if (validator.isEmpty(lastName)) {
        setError((prev) => ({ ...prev, errLastName: "LastName is required" }));
      } else {
        setError((prev) => ({ ...prev, errLastName: "" }));
      }

      if (
        !(
          validator.isEmail(emailOrphone) ||
          validator.isMobilePhone(emailOrphone)
        )
      ) {
        setError((prev) => ({ ...prev, errEmailOrPhone: "Invalid Format" }));
      } else {
        setError((prev) => ({ ...prev, errEmailOrPhone: "" }));
      }

      if (validator.isEmpty(password)) {
        setError((prev) => ({ ...prev, errPassword: "Password is required" }));
      } else if (password.length < 4) {
        setError((prev) => ({
          ...prev,
          errPassword: "password must be greater than 4 characters",
        }));
      } else {
        setError((prev) => ({ ...prev, errPassword: "" }));
      }

      if (validator.isEmpty(confirmPassword)) {
        setError((prev) => ({
          ...prev,
          errConfirm: "Confirm Password is required",
        }));
      } else if (password !== confirmPassword) {
        setError((prev) => ({ ...prev, errConfirm: "password not match" }));
      } else {
        setError((prev) => ({ ...prev, errConfirm: "" }));
      }

      // signup ทำงานแบบ async แล้ว return เป็น promise ในนี้เลยต้อง handle แบบ promise
      await value.signup({
        firstName,
        lastName,
        emailOrphone,
        password,
        confirmPassword,
      });

      closeModal();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="row gx-2 gy-3" onSubmit={handleSignUp}>
      <div className="col-6">
        <input
          className={`form-control ${error.errFirstName && "is-invalid"}`}
          type="text"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        {error && <div className="invalid-feedback">{error.errFirstName}</div>}
      </div>
      <div className="col-6">
        <input
          className={`form-control ${error.errLastName && "is-invalid"}`}
          type="text"
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        {error && <div className="invalid-feedback">{error.errLastName}</div>}
      </div>
      <div className="col-12">
        <input
          className={`form-control ${error.errEmailOrPhone && "is-invalid"}`}
          type="text"
          placeholder="Mobile number or email address"
          value={emailOrphone}
          onChange={(e) => setemailOrPhone(e.target.value)}
        />
        {error && (
          <div className="invalid-feedback">{error.errEmailOrPhone}</div>
        )}
      </div>
      <div className="col-12">
        <input
          className={`form-control ${error.errPassword && "is-invalid"}`}
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error.errPassword && (
          <div className="invalid-feedback">{error.errPassword}</div>
        )}
      </div>
      <div className="col-12">
        <input
          className={`form-control ${error.errConfirm && "is-invalid"}`}
          type="password"
          placeholder="Confrim password"
          value={confirmPassword}
          onChange={(e) => setConfrimPassword(e.target.value)}
        />
        {error.errConfirm && (
          <div className="invalid-feedback">{error.errConfirm}</div>
        )}
      </div>

      <div className="pt-3 d-flex justify-content-center">
        <button
          type="submit"
          className="btn btn-green text-4.5 h-9 shadow-none d-flex justify-content-center align-items-center tw-px-10"
        >
          Sign Up
        </button>
      </div>
    </form>
  );
}

export default RegisterForm;
