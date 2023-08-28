import React from "react";
import "./singlePost.css";
import {  useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

import { ThreeDots } from "react-loader-spinner";

const SinglePost = () => {
  const { allPosts } = useSelector((state) => state.allPosts);
  const params = useParams();
  let [singlePost, setSinglePost] = useState();
  const [loding, setLoading] = useState(true);

  const getSinglePost = async () => {
    const post = await allPosts.filter((post) => post._id === params.id);

    setSinglePost(post[0]);
  };

  useEffect(() => {
    getSinglePost();

    setLoading(false);
  });

  return (
    <div className="singlePost">
      {loding ? (
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
        <div className="singlePost">
          <div className="singlePostWrapper">
            <div className="singlePostImg">
              <img src={singlePost.image.url} alt="" />
            </div>
            <h1 className="singlePostTitle">{singlePost.title}</h1>
            <div className="singlePostInfo">
              
              <span>{singlePost.createdAt}</span>
            </div>
            <p className="singlePostDesc">{singlePost.content}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SinglePost;
