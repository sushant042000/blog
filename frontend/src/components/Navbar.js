import React from "react";
import "./Navbar.css";
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
    const navigate=useNavigate()
  return (
    <header>
      <nav>
        <ul className="navbar">
          <li><a onClick={()=>navigate('/')}>Home</a></li>
          <li><a onClick={()=>navigate('/myPost')}>My Posts</a></li>
          <li className="auth-buttons">
            <a  onClick={()=>navigate('/register')}>Register</a>
            <a  onClick={()=>navigate('/login')}>Login</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
