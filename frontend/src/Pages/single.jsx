import React from 'react';
import SinglePost from '../components/SinglePost';
import Sidebar from '../components/Sidebar';
import "./single.css";

const single = () => {
  return (
    <div className="single">
    <SinglePost />
    <Sidebar />
  </div>

  )
}

export default single