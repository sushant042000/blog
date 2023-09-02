import React, { useEffect, useState } from "react";

import Posts from "../components/Posts";
import Sidebar from "../components/Sidebar";
import "./Home.css";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPostFailure,
  getAllPostStart,
  getAllPostSuccess,
} from "../Store/Slices/postSlice";
import { blogApi } from "../API/post";
import { ThreeDots } from "react-loader-spinner";

const Home = () => {
  const dispatch = useDispatch();
  const { allPosts, isLoading } = useSelector((state) => state.allPosts);
  const [posts, setPosts] = useState(allPosts);
  

  const fetchData = async () => {
    try {
      dispatch(getAllPostStart());
      const response = await blogApi.getAllPosts();
      

      dispatch(getAllPostSuccess(response.data.posts));
      
    } catch (err) {
      dispatch(getAllPostFailure(err));
    }
  };
  useEffect(() => {
    setPosts(allPosts);
     
    fetchData();
  }, [posts]);

  return (
    <div>
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
        <>
          <Header />

          <div className="home">
            <Posts posts={allPosts} user={false} />
            <Sidebar />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
