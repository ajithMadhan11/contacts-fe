import React, { useState } from "react";
import "./Styles/signin.css";
import { Link, Redirect } from "react-router-dom";
import { authenticate, isAutheticated, signin } from "./apiHelpers";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import { useDispatch } from "react-redux";
import { login } from "../Redux/userSlice";
const Signin = () => {
  const dispatch = useDispatch();
  const [state, setstate] = useState({
    email: "ajithmadhank@gmail.com",
    password: "aspirine",
    error: "",
    loading: false,
    isRedirected: false,
  });
  const user = isAutheticated();
  const { email, password, error, isRedirected } = state;

  const handleChange = (name) => (e) => {
    setstate({ ...state, error: "", [name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    setstate({ ...state, loading: true });
    if (!email || !password) {
      return notification("error", "please fill all fields");
    }
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          notification("error", data.error);
          return setstate({ ...state, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setstate({ ...state, isRedirected: true });
          });
          dispatch(login(data));
          const m_name = data.name;
          notification("success", m_name);
        }
      })
      .catch((err) => {
        alert("error");
      });
  };
  const notification = (mode, field) => {
    if (mode == "error") {
      return NotificationManager.error(field);
    } else if (mode == "success") {
      return NotificationManager.success("welcome " + field + " 🙌");
    }
  };

  const signInForm = () => {
    return (
      <div className="signin_wrapper">
        <div className="container1">
          <p className="signin_head">SignIn</p>
          <p className="form_label">Email</p>
          <input
            type="email"
            className="form_input"
            placeholder="Enter your Email"
            value={email}
            onChange={handleChange("email")}
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

          <button className="signin_btn" onClick={submitForm}>
            SignIn
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
                to="/signup"
              >
                Signup
              </Link>
            </span>
          </p>
        </div>
      </div>
    );
  };
  const redirectTo = () => {
    return isRedirected && <Redirect to="/" />;
  };
  return (
    <>
      {signInForm()}
      {redirectTo()}
      <NotificationContainer />
    </>
  );
};

export default Signin;
