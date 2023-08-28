import React from 'react';
import './Header.css'

const Header = () => {
  return (
    <div className="header">
      <div className="headerTitles">
        
        <span className="headerTitleLg">BLOG</span>
      </div>
      <img
        className="headerImg"
        src="https://images.unsplash.com/photo-1692739843142-877be399d229?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0MHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
        alt=""
      />
    </div>
  )
}

export default Header