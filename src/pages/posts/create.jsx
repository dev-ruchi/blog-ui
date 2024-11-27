import React, { useState } from "react";
import axios from "axios";

const PostCreate = () => {
  const [postData, setPostData] = useState({
    title: "",
    body: "",
    user_id: "", // This will be parsed to a number
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData((prev) => ({
      ...prev,
      [name]: name === "user_id" ? parseInt(value, 10) : value, // Ensure user_id is a number
    }));
  };

  const addPost = (e) => {
    e.preventDefault();

    const payload = {
      ...postData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    axios
      .post("http://localhost:8080/posts", payload)
      .then((response) => {
        console.log("Post created successfully:", response.data);
        alert("Post created successfully!");
      })
      .catch((error) => {
        console.error("Error creating post:", error);
        alert("Error creating post.");
      });
  };

  return (
    <div>
      <h1>Create a New Post</h1>
      <form onSubmit={addPost}>
        <input
          type="text"
          name="title"
          value={postData.title}
          onChange={handleChange}
          placeholder="Enter title"
        />
        <textarea
          name="body"
          value={postData.body}
          onChange={handleChange}
          placeholder="Enter body"
        ></textarea>
        <input
          type="number"
          name="user_id"
          value={postData.user_id}
          onChange={handleChange}
          placeholder="Enter User ID"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PostCreate;
