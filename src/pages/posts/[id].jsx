import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import backend from "../network/backend";

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

  function fetchPost() {
    backend.get(`/posts/${id}`).then((response) => {
      setPost(response.data);
    });
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
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="card-title text-center text-4xl">{post.title}</h2>
      <div className="text-center w-full max-w-5xl text-xl mt-4 p-4">{post.body}</div>
      <div className="mt-4 text-center">
        <p className="text-xl text-gray-500">Writen on {new Date(post.created_at).toLocaleString()}</p>
      </div>
      <div className="card-actions justify-center mt-4">
        <button className="btn btn-link" onClick={() => router.push("/posts")}>
          Back to Posts
        </button>
      </div>
    </div>
  );
}
