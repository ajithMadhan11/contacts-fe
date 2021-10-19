import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import "./Styles/signin.css";
import { signup } from "../Components/apiHelpers";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

const Signup = () => {
  const [state, setstate] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    ustate: "",
    address: "",
    pincode: "",
    phone_number: "",
    error: "",
    isRedirected: false,
    loading: false,
  });
  const {
    fname,
    lname,
    ustate,
    address,
    pincode,
    email,
    password,
    error,
    isRedirected,
    loading,
    phone_number,
  } = state;
  const handleChange = (name) => (event) => {
    setstate({ ...state, [name]: event.target.value });
  };

  const submitSignUpForm = (e) => {
    e.preventDefault();
    setstate({ ...state, loading: true });
    if (
      !email ||
      !password ||
      !fname ||
      !phone_number ||
      !lname ||
      !address ||
      !pincode ||
      !ustate
    ) {
      return notification("error", "Please fill all the fields");
    }
    signup({
      fname,
      lname,
      email,
      password,
      phone_number,
      ustate,
      address,
      pincode,
    }).then((data) => {
      if (data.error) {
        notification("error", data.error);
        return setstate({ ...state, error: data.error, loading: false });
      } else {
        setstate({ ...state, isRedirected: true });
      }
    });
  };

  const redirectTo = () => {
    return isRedirected && <Redirect to="/signin" />;
  };

  const notification = (mode, field) => {
    if (mode == "error") {
      return NotificationManager.error(field);
    } else if (mode == "success") {
      return NotificationManager.success("welcome  " + field + " 🙌");
    }
  };
  const signupForm = () => {
    return (
      <div className="signin_wrapper">
        <div className="container1">
          <p className="signin_head">SignUp</p>
          <p className="form_label">First Name</p>
          <input
            type="text"
            className="form_input"
            placeholder="Enter your First Name"
            value={fname}
            onChange={handleChange("fname")}
            required
          />
          <p className="form_label">last Name</p>
          <input
            type="text"
            className="form_input"
            placeholder="Enter your Last Name"
            value={lname}
            onChange={handleChange("lname")}
            required
          />
          <p className="form_label">Email</p>
          <input
            type="email"
            className="form_input"
            placeholder="Enter your Email"
            value={email}
            onChange={handleChange("email")}
            required
          />
          <p className="form_label">Phone Number</p>
          <input
            type="number"
            className="form_input"
            placeholder="Enter your Phone number"
            value={phone_number}
            onChange={handleChange("phone_number")}
            required
          />
          <p className="form_label">Password</p>
          <input
            type="password"
            className="form_input"
            placeholder="Enter your Password"
            value={password}
            onChange={handleChange("password")}
            required
          />
          <p className="form_label">State</p>
          <input
            type="text"
            className="form_input"
            placeholder="Enter your State"
            value={ustate}
            onChange={handleChange("ustate")}
            required
          />
          <p className="form_label">Address</p>
          <input
            type="text"
            className="form_input"
            placeholder="Enter your Address"
            value={address}
            onChange={handleChange("address")}
            required
          />
          <p className="form_label">Pincode</p>
          <input
            type="text"
            className="form_input"
            placeholder="Enter your Pincode"
            value={pincode}
            onChange={handleChange("pincode")}
            required
          />
          <button
            className="signin_btn"
            style={{ marginTop: "20px" }}
            onClick={submitSignUpForm}
          >
            SignUp
          </button>
          <hr />
          <p className="f_last_mis">
            Already have a account?{" "}
            <span>
              <Link
                style={{
                  textDecoration: "none",
                  backgroundColor: "#ffffff",
                  color: "#4A89DC",
                }}
                to="/signin"
              >
                SignIn
              </Link>
            </span>
          </p>
        </div>
      </div>
    );
  };

  return (
    <Fragment>
      {signupForm()}
      {redirectTo()}
      <NotificationContainer />
    </Fragment>
  );
};

export default Signup;
