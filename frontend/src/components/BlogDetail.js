import { Button, Card, InputLabel, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { blogApi } from "../api/blogPostApi";
const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

const BlogDetail = () => {
  const navigate = useNavigate();
  let { id } = useParams();

  id = id.replace(":", "");
  const { posts } = useSelector((state) => state.myPost);

  const postToUpdate = posts.filter((post) => post._id === id);
  const [image, setImage] = useState(postToUpdate[0].image.url);
  const [title, setTitle] = useState(postToUpdate[0].title);
  const [description, setDescription] = useState(postToUpdate[0].content);

  // console.log("id",id)

  console.log("image this", postToUpdate[0].description);
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
      image,
      title,
      description,
    };

    try {
      const res = await blogApi.updateMyPost(id, data);
      console.log(res.data.success);
      if (res.data.success) {
        alert("updated");
        navigate("/myPost");
      }
    } catch (error) {}
  };

  return (
    <div>
      <div className="add-post-container">
        <h1>Update Post</h1>
        <Card sx={{ minWidth: 500 }}>
          <div className="formGroup">
            <TextField
              id="standard-basic"
              value={title}
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
              value={description}
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
              Update Post
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BlogDetail;
