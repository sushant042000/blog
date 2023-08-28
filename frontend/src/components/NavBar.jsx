import React, { Fragment } from "react";
import "./NavBar.css";

import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserSuccess } from "../Store/Slices/userSlice";

const NavBar = ({ token, setToken }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { isAuthenticated } = useSelector((state) => state.user);
  const handleLogout = async (e) => {
    Cookies.remove("token");
    setToken("");
    dispatch(logoutUserSuccess());
  };

  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem" onClick={() => navigate("/")}>
            HOME
          </li>

          {isAuthenticated && (
            <Fragment>
              <li className="topListItem" onClick={() => navigate("/write")}>
                WRITE
              </li>
              <li className="topListItem" onClick={() => navigate("/myPosts")}>
                {" "}
                MY POSTS
              </li>
              <li className="topListItem" onClick={handleLogout}>
                LOGOUT
              </li>
            </Fragment>
          )}
        </ul>
      </div>
      <div className="topRight">
        {isAuthenticated ? (
          <img
            onClick={() => navigate("/setting")}
            className="topImg"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60"
            alt=""
          />
        ) : (
          <ul className="topList">
            <li
              className="topListItem"
              id="login"
              onClick={() => navigate("/login")}
            >
              LOGIN
            </li>
            <li className="topListItem" onClick={() => navigate("/register")}>
              REGISTER
            </li>
          </ul>
        )}
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
};

export default NavBar;
