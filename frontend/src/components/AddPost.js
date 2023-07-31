import React, { useState } from "react";
import { Button, Card, TextField } from "@mui/material";

import "./AddPost.css";
import { useDispatch } from "react-redux";
import {
  createPostFail,
  createPostStart,
  createPostSuccess,
} from "../strore/slices/postSlice";
import { blogApi } from "../api/blogPostApi";

const AddPost = () => {
  const [image, setImage] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const addPostImage = (e) => {
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
    const data = {
      title,
      description,
      image,
    };

    try {
      dispatch(createPostStart());

      const response = await blogApi.create(data);
      console.log(response);

      dispatch(createPostSuccess(response.data));
    } catch (error) {
      dispatch(createPostFail(error));
    }
  };
  return (
    <div className="add-post-container">
    <h1>Post New Blog</h1>
      <Card sx={{ minWidth: 500 }}>
        <div className="formGroup">
          <TextField
            id="standard-basic"
            label="Title"
            variant="standard"
            style={{ width: "400px" }}
            onChange={(e) => setTitle(e.target.value)}
          />
          
        </div>

        <div className="formGroup">
          <TextField
            id="standard-basic"
            label="Description"
            variant="standard"
            multiline
            rows={4}
            style={{ width: "400px" }}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="formGroup">
          <input
            className="input-file-button"
            type="file"
            name="image"
            accept="image/*"
            style={{ padding: "10px" }}
            onChange={addPostImage}
          />
          {image && (
            <img src={image} alt="Preview" style={{ maxWidth: "200px" }} />
          )}
        </div>

        <div className="formGroup">
          <Button
            size="small"
            color="success"
            variant="contained"
            onClick={handleSubmit}
          >
            Add Post
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AddPost;
