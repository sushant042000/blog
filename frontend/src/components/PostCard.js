import { Card } from "@mui/material";
import React from "react";
import "./PostCard.css";

const PostCard = ({ post }) => {
  
  return (
    <div className="postCard">
      <div className="title">{post.title} </div>
      <div className="image">
        <img src={post.image.url} alt="Post" />
      </div>
      <div className="description">{post.content}</div>
    </div>
  );
};

export default PostCard;
