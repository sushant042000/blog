import React from 'react'
import { Navigate } from 'react-router-dom'


const Protected = ({component,token}) => {
   console.log("token====>",token);
  return  token ? component : <Navigate to="/login"/>
  
  
}

export default Protected