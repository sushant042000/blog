import React from 'react';
import "./PostCard.css";
import { blogApi } from '../api/blogPostApi';
import { useNavigate } from 'react-router-dom';

const UpdatePostCard = ({ post }) => {
    const navigate=useNavigate();
    const handleDelete=async()=>{
      try {
        const {_id}=post;
        console.log("id of post :",_id)
        const res=await blogApi.deleteMyPost(_id);
        navigate('/myPost');
        
      } catch (error) {
        alert(error);
        navigate('/myPost');
      }
    }

    const handleUpdate=()=>{
      console.log(console.log("update post id",post._id));
      const id =post._id;
      navigate(`/blogDetail/:${id}`)
    }
  return (
    <div className="postCard">
      <div className="title">{post.title} <button onClick={handleUpdate}>Update</button>  <button onClick={handleDelete}>Delelte</button></div>
      <div className="image">
        <img src={post.image.url} alt="Post" />
      </div>
      <div className="description">{post.content}</div>
    </div>
  )
}

export default UpdatePostCard