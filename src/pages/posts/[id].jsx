import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

export default function PostDetail() {
  const router = useRouter();
  const { id } = router.query; // Get the `id` from the route
  const [post, setPost] = useState(null); // Post data
  const [error, setError] = useState(null); // Error message

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);

  async function fetchPost() {
    try {
      const response = await axios.get(`http://localhost:8080/posts/${id}`);
      setPost(response.data); // Save post data
    } catch (err) {
      if (err.response) {
        // Handle specific error messages from the backend
        setError(err.response.data.message || "An error occurred");
      } else {
        setError("Failed to fetch post");
      }
    }
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!post) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center  h-screen">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{post.title}</h2>
          <p className="">{post.body}</p>
          <div className="mt-4">
            <p>
              <strong>Author ID:</strong> {post.user_id}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(post.created_at).toLocaleString()}
            </p>
            <p>
              <strong>Updated At:</strong>{" "}
              {new Date(post.updated_at).toLocaleString()}
            </p>
          </div>
          <div className="card-actions justify-end mt-4">
            <button
              className="btn btn-primary"
              onClick={() => router.push("/posts")}
            >
              Back to Posts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
