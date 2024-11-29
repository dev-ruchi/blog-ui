import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "./navbar";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  function fetchPosts() {
    axios.get("http://localhost:8080/posts").then((response) => {
      setPosts(response.data);
    });
  }

  return (
    <div>
      {/* Posts Section */}

      <div className="container mx-auto p-4">
        <h1 className="text-3xl text-center mb-6">All Posts</h1>
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div key={post.id} className="card glass w-full shadow-xl">
                <div className="card-body">
                  <Link
                    href={`/posts/${post.id}`}
                    className="card-title text-lg"
                  >
                    {post.title}
                  </Link>
                  {post.body.length > 100
                    ? `${post.body.slice(0, 120)}...`
                    : post.body}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default AllPosts;
