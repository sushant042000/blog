import React from "react";
import "./Posts.css";
import Post from "./Post";
import { useSelector } from "react-redux";

const Posts = ({ posts, user }) => {
  const { allPosts, isLoading } = useSelector((state) => state.allPosts);
  const currFilter = useSelector((state) => state.filter.filter);

  let filterdPosts =
    currFilter === "ALL"
      ? posts
      : posts.filter(
          (p) => p.category.toLowerCase() === currFilter.toLowerCase()
        );
        

  return (
    <div className="posts">
      {!isLoading && filterdPosts && filterdPosts.length>0 ?
        
        filterdPosts.map((post) => (
          <Post key={post._id} post={post} user={user} />
        ))
      :<h2>Posts not found with category {currFilter}</h2>
      }
    </div>
  );
};

export default Posts;
