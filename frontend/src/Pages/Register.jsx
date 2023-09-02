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
  const [profileImage, setprofile] = useState(
    "https://media.istockphoto.com/id/1362894899/photo/portrait-of-male-profile-silhouette-with-big-question-mark-on-the-head.webp?b=1&s=170667a&w=0&k=20&c=CWI7Rmp0UeZkOzE_Brs_VkjpKhDhIOFPkuTdqY4IV8Q="
  );
  const handleInputProfile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function () {
      setprofile(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { name, email, password,profileImage };
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
            <div className="settingsPP">
            <img
              src={profileImage}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>{" "}
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
              onChange={handleInputProfile}
            />
          </div>
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
