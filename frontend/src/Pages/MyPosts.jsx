import React, { useEffect, useState } from "react";

import Post from "../components/Post";
import "./Mypost.css";
import { blogApi } from "../API/post";
import { useDispatch, useSelector } from "react-redux";
import {
  getMypostFail,
  getMypostStart,
  getMypostSuccess,
} from "../Store/Slices/myPostSlice";
import { ThreeDots } from "react-loader-spinner";

const MyPosts = () => {
  const { isLoading } = useSelector((state) => state.myPosts);
  const [myPost, setMyPosts] = useState([]);
  const dispatch = useDispatch();

  const fetchMyPosts = async () => {
    try {
      dispatch(getMypostStart());
      const res = await blogApi.getMyPost();
      dispatch(getMypostSuccess(res.data.posts));
      if (!isLoading) {
        setMyPosts(res.data.posts);
      }
    } catch (error) {
      console.log(error);
      dispatch(getMypostFail(error))
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);
  return (
    <div className="mypost-container">
      {isLoading ? (
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#4fa94d"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      ) : (
        myPost.length ? myPost.map((post) => <Post key={post._id} y post={post} user={true} />) :
        <h2>No Posts Available</h2>
      )}
    </div>
  );
};

export default MyPosts;
