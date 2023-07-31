import React, { useEffect } from "react";
import PostCard from "./PostCard";
import { useDispatch, useSelector } from "react-redux";

import { blogApi } from "../api/blogPostApi";
import {
  getAllPostsFail,
  getAllPostsStart,
  getAllPostsSuccess,
} from "../strore/slices/allPostSlice";
import { CircularProgress } from "@mui/material";
const Home = () => {
  const { data, isLoading, error } = useSelector((state) => state.allPost);

  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      dispatch(getAllPostsStart());
      const response = await blogApi.getAllPosts();
      dispatch(getAllPostsSuccess(response.data));
    } catch (error) {
      dispatch(getAllPostsFail(error));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const posts=data.posts
  const posts = data && data.posts ? data.posts : [];

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
            marginLeft: "60px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {posts &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      )}
    </div>
  );
};

export default Home;
