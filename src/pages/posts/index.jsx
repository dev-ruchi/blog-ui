import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import backend from "../network/backend";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  function fetchPosts() {
    backend.get("/posts").then((response) => {
      setPosts(response.data);
    });
  }

  
  return (
<div className="container mx-auto p-4">
  <h1 className="text-3xl text-center mb-4">All Posts</h1>
  {Array.isArray(posts) && posts.length > 0 ? ( // Check if posts is an array and not empty
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <div key={post._id} className="card glass w-full shadow-xl">
          <div className="card-body">
            <Link href={`/posts/${post._id}`} className="card-title text-lg">
              {post.title}
            </Link>
            <p>
              {post.body.length > 100
                ? `${post.body.slice(0, 120)}...`
                : post.body}
            </p>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-center">No posts available.</p>
  )}
</div>

  );
};

export default AllPosts;
