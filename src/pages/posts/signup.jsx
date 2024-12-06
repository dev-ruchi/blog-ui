import React from "react";
import { useState } from "react";
import backend from "../network/backend";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      name: name,
      email: email,
      password: password,
    };

    backend
      .post("/auth/signup", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // Log the response data
        console.log(response.data);

        setName("");
        setEmail("");
        setPassword("");

        if (response.data.error) {
          console.log(response.data);
          alert(response.data.error);
          return;
        }

        // Save the token to localStorage
        localStorage.setItem("token", response.data.token);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <form
          onSubmit={handleSubmit}
          className="shadow-lg rounded-2xl p-10 w-full max-w-md"
        >
          <div className="mb-5">
            <label htmlFor="name" className="block text-lg mb-2">
              Name:
            </label>
            <input
              className="input input-bordered  w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="name"
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="block text-lg  mb-2">
              Email:
            </label>
            <input
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              id="name"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block  text-lg mb-2">
              Password:
            </label>
            <input
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="name"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center justify-center">
            <button className="btn btn-primary w-full" type="submit">
              Signup
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
