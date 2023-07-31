import React from 'react';
import "./PostCard.css";

const UpdatePostCard = ({ post }) => {
    console.log("post",post)
  return (
    <div className="postCard">
      <div className="title">{post.title} <button>Update</button>  <button>Delelte</button></div>
      <div className="image">
        <img src={post.image.url} alt="Post" />
      </div>
      <div className="description">{post.content}</div>
    </div>
  )
}

export default UpdatePostCard