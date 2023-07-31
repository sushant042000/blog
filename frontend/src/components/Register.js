import React, { useState } from "react";
import "./LoginSignUp.css";
import { registerUser } from "../strore/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUserStart,
  registerUserFailure,
  registerUserSuccess,
} from "../strore/slices/userSlices";
import axios from "axios";
import { userApi } from "../api/userApi";
import { useNavigate } from "react-router-dom";
import { Button, CircularProgress, TextField } from "@mui/material";

const LoginSignUp = () => {
  const { userData, isLoading, error } = useSelector((state) => state.user);
  // console.log(userData, isLoading, error);
  const [toggle, setToggle] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registered, setRegistered] = useState("false");
  const [required, setRequired] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && email && password && confirmPassword) {
      if (password !== confirmPassword) {
        setRequired("password and confirm password are not same");
        return;
      } else {
        const formData = {
          name,
          email,
          password,
          confirmPassword,
        };

        try {
          dispatch(registerUserStart());
          const response = await userApi.register(formData);

          dispatch(registerUserSuccess(response.data));
          alert("successfully registered ! You can now login");
          navigate("/login");
        } catch (error) {
          const { status } = error?.response;

          if (status === 409) {
            const { message } = error.response.data;
            const errorMessage = message
              ? message
              : "An error occurred during registration";
            dispatch(registerUserFailure(errorMessage));
          }
          navigate("/register");
        }
      }
    } else {
      setRequired("all the fields are required");
      return;
    }
  };

  return (
    <div className="container">
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div>
          <div className="form-group">
            <TextField
              id="standard-basic"
              label="User Name"
              variant="standard"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <TextField
              id="standard-basic"
              label="Email"
              variant="standard"
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="error">{error}</p>
          </div>
          <div className="form-group">
          <TextField
          id="standard-basic"
          label="password"
          variant="standard"
          onChange={(e) => setPassword(e.target.value)}
        />
          </div>
          <div className="form-group">
          <TextField
          id="standard-basic"
          label="Confirm Password"
          variant="standard"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
          </div>
          <div className="button">
          <Button
          size="small"
          color="success"
          variant="contained"
          onClick={handleSubmit}
        >
          Register
        </Button>
          </div>
          <p className="error">{required}</p>
        </div>
      )}
    </div>
  );
};

export default LoginSignUp;
