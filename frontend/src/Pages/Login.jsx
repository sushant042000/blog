import React, { useState } from "react";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUserFailure,
  loginUserStart,
  loginUserSuccess,
} from "../Store/Slices/userSlice";

import { userApi } from "../API/api";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = { email, password };
    try {
      dispatch(loginUserStart);
      const response = await userApi.login(loginData);
       
      dispatch(loginUserSuccess(response.data.data));

      navigate("/");
    } catch (err) {
      dispatch(loginUserFailure(err.response.data.message));
      alert(err.response.data.message);
    }
  };

  return (
    <div className="login">
      {isLoading ? (
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#4fa94d"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      ) : (
        <>
          <span className="loginTitle">Login</span>
          <form className="loginForm">
            <label>Email</label>
            <input
              className="loginInput"
              type="text"
              placeholder="Enter your email..."
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
              className="loginInput"
              type="password"
              placeholder="Enter your password..."
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="loginButton" onClick={handleSubmit}>
              Login
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Login;
