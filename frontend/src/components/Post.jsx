import React, { useState } from "react";
import "./Post.css";
import { blogApi } from "../API/post";

import { useNavigate } from "react-router-dom";
import UpdatePost from "../Pages/UpdatePost";
import {} from "react-icons/fa";
import toast from "react-hot-toast";

const Post = ({ post, user }) => {
 
  const navigate = useNavigate();
 
  const [loading,setLoading]=useState(false);
  const [isUpdateVisible, setUpdateVisible] = useState(false);
  

  const handleDelete = async (e) => {
    try {
      setLoading(true);
       await blogApi.deleteMyPost(post._id);
      toast(" 😒 Post deleted !")
      setLoading(false);
      navigate('/');
      
    } catch (err) {
      alert("Failed to delete post");
      setLoading(false);
    }
  };

 

  const handleUpdate = () => {
    setUpdateVisible(true);
  };

  const handleUpdateComplete = () => {
    setUpdateVisible(false);
    
  };

  const showSinglePost= ()=>{
       navigate(`/single/${post._id}`)
  }

  return (
    <div>
      {isUpdateVisible ? (
        <UpdatePost post={post} handleUpdateComplete={handleUpdateComplete} />
      ) : (
        <div className="post" >
          <img className="postImg" src={post.image.url} alt="" />
          <div className="postInfo">
            {user ? (
              <div className="delete-update-btn">
                {" "}
                <i className="singlePostIcon far fa-edit" onClick={handleUpdate}></i>
                 <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
              </div>
            ) : (
              ""
            )}

            <div className="postCats">
              <span className="postCat">{post.category}</span>
            </div>
            <span className="postTitle" >{post.title}</span>
            <hr />
            <span className="postDate">{post.createdAt.slice(0,10)}</span>
          </div>
          <p className="postDesc" onClick={showSinglePost}>{post.content.slice(0,150)}...</p>
        </div>
      )}
    </div>
  );
};

export default Post;
