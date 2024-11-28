import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  function fetchPosts() {
    axios.get("http://localhost:8080/posts").then((response) => {
      setPosts(response.data);
      console.log(response.data);
    });
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">All Posts</h1>
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="card w-full bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-lg font-bold">{post.title}</h2>
                <p className="">{post.body}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No posts available.</p>
      )}
    </div>
  );
};

export default AllPosts;
