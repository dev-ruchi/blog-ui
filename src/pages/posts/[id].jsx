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
    <div className="flex flex-col max-w-4xl mx-auto">
      <div className="p-16">
        <h2 className="card-title text-4xl">{post.title}</h2>
        <div className="text-xl leading-loose mt-4">{post.body}</div>

        <div>
          <p className="text-xl mt-4 text-gray-500">
            Written on{" "}
            {new Date(post.created_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>

          <button
            className="btn btn-link p-0"
            onClick={() => router.push("/posts")}
          >
            Back to Posts
          </button>
        </div>
      </div>
    </div>
  );
}
