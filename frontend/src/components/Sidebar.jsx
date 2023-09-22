import React from "react";
import "./Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../Store/Slices/filterSlice";


const Sidebar = () => {
  const dispatch=useDispatch();
  const currFilter=useSelector((state)=>state.filter.filter);
  return (
    <div className="sidebar">
      
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
        <li className="sidebarListItem" onClick={()=>dispatch(setFilter("ALL"))}>ALL</li>
          <li className="sidebarListItem" onClick={()=>dispatch(setFilter("Life"))}>Life</li>
          <li className="sidebarListItem" onClick={()=>dispatch(setFilter("Music"))}>Music</li>
          <li className="sidebarListItem" onClick={()=>dispatch(setFilter("Sport"))}>Sport</li>
          <li className="sidebarListItem" onClick={()=>dispatch(setFilter("Style"))}>Style</li>
          <li className="sidebarListItem" onClick={()=>dispatch(setFilter("Tech"))}>Tech</li>
          <li className="sidebarListItem" onClick={()=>dispatch(setFilter("Cinema"))}>Cinema</li>
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
