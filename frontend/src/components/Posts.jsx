import React from "react";
import "./Posts.css";
import Post from "./Post";

const Posts = ({ posts, user }) => {
  
  
  return (
    <div className="posts">
      {posts &&
        posts.map((post) => (
          <Post key={post._id} post={post} user={user}  />
        ))}
    </div>
  );
};

export default Posts;
