import React, { useState } from "react";
import "./write.css";
import { blogApi } from "../API/post";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

const Write = ({ post }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(
    "https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
  );

  const handleInputFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function () {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = { title, category, description, image };

    try {
      setLoading(true);
      const response = await blogApi.create(newPost);
      // console.log(response.data);
      setLoading(false);
      if (response.data) {
        alert("post added successfully!");
        navigate("/myPosts");
      }
    } catch (error) {
      setLoading(false);
      alert("failed to add new Post");
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
                autoFocus={true}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                className="writeInput"
                placeholder="Category"
                type="text"
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className="writeFormGroup">
              <textarea
                className="writeInput writeText"
                placeholder="Tell your story..."
                type="text"
                autoFocus={true}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <button
              className="writeSubmit"
              type="submit"
              onClick={handleSubmit}
            >
              Publish
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Write;
