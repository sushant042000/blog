import React, { useState } from "react";
import "./Register.css";
import { userApi } from "../API/api";

import {
  registerUserFailure,
  registerUserStart,
  registerUserSuccess,
} from "../Store/Slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, isLoading } = useSelector((state) => state.user);

  const [name, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { name, email, password };

    try {
      dispatch(registerUserStart);
      const response = await userApi.register(userData);

      dispatch(registerUserSuccess(response.data.data));
      alert("Registered successfully!");
      navigate("/login");
    } catch (error) {
      if (error.response.status === 409) {
        dispatch(registerUserFailure(error.response.data.message));
      }
    }
  };
  return (
    <div className="register">
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
          <span className="registerTitle">Register</span>
          <form className="registerForm">
            <label>Username</label>
            <input
              className="registerInput"
              type="text"
              placeholder="Enter your username..."
              onChange={(e) => setUserName(e.target.value)}
            />
            <label>Email</label>
            <input
              className="registerInput"
              type="text"
              placeholder="Enter your email..."
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
              className="registerInput"
              type="password"
              placeholder="Enter your password..."
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="registerButton" onClick={handleSubmit}>
              Register
            </button>
            {error ? <p>{error}</p> : ""}
          </form>
        </>
      )}
    </div>
  );
};

export default Register;
