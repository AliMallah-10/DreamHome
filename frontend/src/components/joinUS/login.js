import React, { useState } from "react";
import "./login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { message } from "antd";
import axios from "axios";
import { loginSuccess } from "../../data/action";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgetPasswordMode, setForgetPasswordMode] = useState(false);
  const [messages, setMessage] = useState("");
  const [messagesforget, setMessageForget] = useState("");

  const closeModal = () => {
    setForgetPasswordMode(false);
  };
  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/users/login", {
        email,
        password,
      });

      if (response.status === 200) {
        message.success(response.data.message);

        const { accessToken, refreshToken, role } = response.data;

        // Set cookies for tokens
        document.cookie = `accessToken=${accessToken}; path=/`;
        document.cookie = `refreshToken=${refreshToken}; path=/`;
        localStorage.setItem("role", role);
        localStorage.setItem("email", response.data.email);
        // Set axios default headers with the accessToken and refreshToken
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
        axios.defaults.headers.common["Refresh-Token"] = refreshToken;
        // Dispatch the loginSuccess action with the user ID
        dispatch(loginSuccess(response.data.id));

        if (response.data.role === "admin") {
          navigate("/dashboard/mainBody");
        } else if (response.data.role === "agent") {
          navigate("/dashboardAgent/MainBodyAgent");
        } else {
          navigate("/Home");
        }
      } else if (response.status === 401) {
        setMessage(response.data.message);
        setTimeout(() => setMessage(""), 3000);
      }
      return response.data;
    } catch (error) {
      setMessage(error.response.data.message);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleForgetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/users/forget-password",
        {
          email,
        }
      );

      if (response.status === 200) {
        message.success(response.data.message);
        setForgetPasswordMode(false);
        setMessageForget("");
      }
    } catch (error) {
      setMessageForget(error.response.data.message);
      setTimeout(() => setMessageForget(""), 3000);
    }
  };

  return (
    <body className="bodylog">
      <div className="w-2/5 h-custom backdrop-blur-sm">
        <h1 className="text-green-800 font-bold text-7xl mb-10 text-center">
          Welcome
        </h1>
        <p className="text-white text-center text-2xl font-bold py-4">
          Welcome to our real estate login page, where your property journey
          begins. Gain access to our vast database of listings and connect with
          trusted agents seamlessly.
        </p>
        <div>
          <i className="flex justify-center justify-items-center mt-20 text-7xl text-green-500 animate-pulse">
            <FontAwesomeIcon icon={faArrowRight} />
          </i>
        </div>
      </div>
      <div
        style={{ animation: "slideInFromLeft 1s ease-out" }}
        className="max-w-md w-full bg-gradient-to-r from-green-800 to-white-600 rounded-xl shadow-2xl overflow-hidden p-8 space-y-8 backdrop-blur-md"
      >
        <h2
          style={{ animation: "appear 2s ease-out" }}
          className="text-center text-4xl font-extrabold text-white"
        >
          Logn IN
        </h2>
        <p
          style={{ animation: "appear 3s ease-out" }}
          className="text-center text-gray-200"
        >
          Sign in to your account
        </p>
        <form onSubmit={handleSignIn} className="space-y-6">
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
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-200">
              <input
                className="form-checkbox h-4 w-4 text-purple-600 bg-gray-800 border-gray-300 rounded ring-green-500"
                type="checkbox"
              />
              <span className="ml-2">Remember me</span>
            </label>
            <p
              className="text-sm text-white hover:underline"
              onClick={() => setForgetPasswordMode(true)}
            >
              Forgot your password?
            </p>
          </div>
          <button
            className="w-full py-2 px-4 bg-green-500 hover:bg-green-700 rounded-md shadow-lg text-white font-semibold transition duration-200"
            type="submit"
          >
            Sign In
          </button>
          <p className="mt-0 text-white">{messages}</p>
        </form>
        <div className="text-center text-white">
          Don't have an account?
          <a className="text-green-300 hover:underline" href="/signup">
            Sign up
          </a>
        </div>
      </div>
      {forgetPasswordMode && (
        <div id="id01" className="modal">
          <form id="resetFrom" className="modal-content animate">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <div className="w-90 rounded-2xl bg-green-500">
              <div className="flex flex-col gap-2 p-8">
                <input
                  className="bg-green-200 w-full rounded-lg border border-green-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-white text-gray-600"
                  placeholder="Email"
                  type="email"
                  name="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label className="flex cursor-pointer items-center justify-between p-1 text-slate-100">
                  Accept terms of use
                  <div className="relative inline-block">
                    <input
                      className="peer h-6 w-12 cursor-pointer appearance-none rounded-full border border-gray-500 bg-gary-400 checked:border-green-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
                      type="checkbox"
                      required
                    />
                    <span className="pointer-events-none absolute left-1 top-1 block h-4 w-4 rounded-full bg-white transition-all duration-200 peer-checked:left-7 peer-checked:bg-green-700" />
                  </div>
                </label>
                <input
                  className="inline-block cursor-pointer rounded-md bg-green-900 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-green-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95"
                  type="submit"
                  value="Send"
                  onClick={handleForgetPassword}
                />
                {/* Save
                </button> */}
                <p className="text-center text-white">{messagesforget}</p>
              </div>
            </div>
          </form>
        </div>
      )}
    </body>
  );
}

export default Login;
