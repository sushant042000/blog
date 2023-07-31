import React, { useEffect, useState } from "react";
import {
  getMyPostFail,
  getMyPostStart,
  getMyPostSuccess,
} from "../strore/slices/myPostSlice";
import { blogApi } from "../api/blogPostApi";
import PostCard from "./PostCard";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";

const MyPosts = () => {
  const dispatch=useDispatch();
  const { posts, isLoading, error } = useSelector((state) => state.myPost);
  const fetchData = async () => {
    try {
      dispatch(getMyPostStart());
      const response = await blogApi.getMyPost();
      
      dispatch(getMyPostSuccess(response.data.posts));
    } catch (error) {
      dispatch(getMyPostFail(error));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const myPost = posts && posts.posts ? posts.posts : [];
  console.log( posts);
  const myPosts=posts ?posts:[];

  return (
    <div className="loding">
      {isLoading ? (
        <div className="loding">
          <CircularProgress />
        </div>
      ) : (
        <div
          style={{
            margin: "10px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {myPosts &&
            myPosts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      )}
    </div>
  );
};

export default MyPosts;
