import React, { useState } from "react";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUserFailure,
  loginUserStart,
  loginUserSuccess,
} from "../strore/slices/userSlices";
import { userApi } from "../api/userApi";
import { Button, Card, TextField } from "@mui/material";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    try {
      dispatch(loginUserStart());
      const response = await userApi.login(data);
      dispatch(loginUserSuccess(response?.data));
    } catch (error) {
      const { message } = error?.response?.data;
      dispatch(loginUserFailure(message));
    }
  };

  return (
    <div className="login-container">
      <Card sx={{ minWidth: 300 }}>
        <div className="formGroup">
          <TextField
            id="standard-basic"
            label="Email"
            variant="standard"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="formGroup">
          <TextField
            id="standard-basic"
            label="password"
            variant="standard"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="formGroup">
          <Button
            size="small"
            color="success"
            variant="contained"
            onClick={handleSubmit}
          >
            Login
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Login;
