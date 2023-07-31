import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ authenticated, component }) => {
  const navigate=useNavigate();
  useEffect(() => {
    if (authenticated) {
      return navigate("/login");
    }
  }, [authenticated]);

  // const navigate=useNavigate();
  // if(!authenticated){
  //    return navigate('/login');

  // }
  // console.log("comp",component);
  return component;
};

export default ProtectedRoute;
