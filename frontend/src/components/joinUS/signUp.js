import React, { useState } from "react";
import { message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [messages, setMessage] = useState("");
  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/users/register",
        {
          username: username,
          email,
          password,
          confirmPassword,
        }
      );

      // Check the HTTP status code to determine success or error
      if (response.status === 201) {
        message.success("User registered successfully");
        navigate("/");
        // Set the state to redirect to the login page
      } else if (response.status === 400) {
        setMessage(response.data.message);
        // Set a timer to clear the message after 3 seconds
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      if (error.response.status === 400) {
        setMessage(error.response.data.message);
        // Set a timer to clear the message after 3 seconds
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage(error.response.data.error);
        // Set a timer to clear the message after 3 seconds
        setTimeout(() => setMessage(""), 3000);
      }
    }
  };
  return (
    <body className="bodylog">
      <div
        style={{ animation: "slideInFromLeft 1s ease-out" }}
        className="max-w-md w-full bg-gradient-to-r from-green-800 to-white-600 rounded-xl shadow-2xl overflow-hidden p-8 space-y-8 backdrop-blur-md"
      >
        <h2
          style={{ animation: "appear 2s ease-out" }}
          className="text-center text-4xl font-extrabold text-white"
        >
          Sign UP
        </h2>
        <p
          style={{ animation: "appear 3s ease-out" }}
          className="text-center text-gray-200"
        >
          Sign Up For New Account
        </p>
        <form onSubmit={handleSignUp} className="space-y-6">
          <div className="relative">
            <input
              placeholder="Full Name"
              className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-green-500"
              required
              id="username"
              name="username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
            <label
              className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-green-500 peer-focus:text-sm"
              htmlFor="username"
            >
              Full Name
            </label>
          </div>
          <div className="relative">
            <input
              placeholder="john@example.com"
              className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-green-500"
              required
              id="email"
              name="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label
              className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-green-500 peer-focus:text-sm"
              htmlFor="email"
            >
              Email address
            </label>
          </div>
          <div className="relative">
            <input
              placeholder="Password"
              className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-green-500"
              required
              id="password"
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label
              className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-green-500 peer-focus:text-sm"
              htmlFor="password"
            >
              Password
            </label>
          </div>
          <div className="relative">
            <input
              placeholder="Confirm Password"
              className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-green-500"
              required
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <label
              className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-green-500 peer-focus:text-sm"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-white">{messages}</p>
          </div>
          <button
            className="w-full py-2 px-4 bg-green-500 hover:bg-green-700 rounded-md shadow-lg text-white font-semibold transition duration-200"
            type="submit"
          >
            Sign UP
          </button>
        </form>
        <div className="text-center text-white">
          Don't have an account?
          <a className="text-green-300 hover:underline" href="/login">
            Sign IN
          </a>
        </div>
      </div>
    </body>
  );
}

export default SignUp;
