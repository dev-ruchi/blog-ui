import React, { useState } from "react";
import axios from "axios";

const PostCreate = () => {
  const [postData, setPostData] = useState({
    title: "",
    body: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData((prev) => ({
      ...prev,
      [name]: value, // No need to check for user_id anymore
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
        setPostData({
          title: "",
          body: "",
        })
      })
      .catch((error) => {
        console.error("Error creating post:", error);
        alert("Error creating post.");
      });
  };

  return (
    <div className="flex flex-col items-center py-8 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Create a New Post</h1>
      <form
        onSubmit={addPost}
        className="card shadow-lg bg-base-100 p-8 w-full max-w-md space-y-4"
      >
        <input
          type="text"
          name="title"
          value={postData.title}
          onChange={handleChange}
          placeholder="Enter title"
          className="input input-bordered w-full"
        />
        <textarea
          name="body"
          value={postData.body}
          onChange={handleChange}
          placeholder="Enter body"
          className="textarea textarea-bordered w-full h-24"
        ></textarea>
        <button type="submit" className="btn btn-primary w-full">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostCreate;
