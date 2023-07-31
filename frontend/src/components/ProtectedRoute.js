import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';
import { Route, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({isAuthenticated,component}) => {
    const navigate=useNavigate();
    if(!isAuthenticated){
       return navigate('/login');

    }
    console.log("comp",component);
  return component;
}

export default ProtectedRoute