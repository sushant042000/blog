import React, { useState } from "react";
import "./UpdatePost.css";
import { blogApi } from "../API/post";

import { ThreeDots } from "react-loader-spinner";

const UpdatePost = ({ post, handleUpdateComplete }) => {
  
  const [title, setTitle] = useState(post.title);
  const [category, setCategory] = useState(post.category);
  const [description, setDescription] = useState(post.content);
  const [image, setImage] = useState(post.image.url);

  const [loading, setLoading] = useState(false);

  const handleInputFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function () {
      console.log("image", reader.result);
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatePostData = { title, category, description, image };
    try {
      setLoading(true);
      await blogApi.updateMyPost(post._id, updatePostData);
      setLoading(false);
      alert("Post updated successfully");
      handleUpdateComplete();
    } catch (error) {
      alert("update failed");
    }
  };

  return (
    <div className="write">
      {loading ? (
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
          <img className="writeImg" src={image} alt="" />
          <form className="writeForm">
            <div className="writeFormGroup">
              <label htmlFor="fileInput">
                <i className="writeIcon fas fa-plus"></i>
              </label>

              <input
                id="fileInput"
                type="file"
                style={{ display: "none" }}
                onChange={handleInputFile}
              />

              <input
                className="writeInput"
                placeholder="Title"
                type="text"
                value={title}
                autoFocus={true}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                className="writeInput"
                placeholder="Category"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className="writeFormGroup">
              <textarea
                className="writeInput writeText"
                placeholder="Tell your story..."
                type="text"
                value={description}
                autoFocus={true}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button
                className="writeSubmit"
                type="submit"
                onClick={handleSubmit}
              >
                Update
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default UpdatePost;
