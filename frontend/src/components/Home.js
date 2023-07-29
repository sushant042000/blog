import React, { useEffect } from "react";
import PostCard from "./PostCard";
import { useDispatch,useSelector } from "react-redux";

import { blogApi } from "../api/blogPostApi";
import {
  getAllPostsFail,
  getAllPostsStart,
  getAllPostsSuccess,
} from "../strore/slices/allPostSlice";
const Home = () => {
  const {data,isLoading,error}=useSelector((state)=>state.allPost);
  console.log(data,isLoading,error);
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      console.log("try");
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
    <div
      style={{
        margin: "10px",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      {posts && posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Home;
