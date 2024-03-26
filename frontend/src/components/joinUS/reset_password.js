import React, { useState } from "react";
import axios from "axios";
import "./resetStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { message } from "antd";

import { useParams, useNavigate } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const { userId, token } = useParams();
  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setPasswordVisible(!passwordVisible);
    } else if (field === "confirmPassword") {
      setConfirmPasswordVisible(!confirmPasswordVisible);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      // Extract userId and token from the URL or wherever you have them
      // const userId = "user_id"; // Replace with the actual user ID
      // const token = "reset_token"; // Replace with the actual reset token

      // Make an API request to reset the password
      const response = await axios.post(
        `http://localhost:3000/users/reset-password/${userId}/${token}`,
        {
          password,
          confirmPassword,
        }
      );
      if (response.status === 200) {
        message.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      setResetMessage(error.response.data.error);
      setTimeout(() => setResetMessage(""), 3000);
    }
  };

  return (
    <div>
      <body className="bodyRest">
        <div id="id01" className="modal">
          <form id="resetFrom" className="modal-contentR animate">
            <span className="close">&times;</span>
            <section>
              <div className="backdrop-blur-sm relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-20 max-w-7xl">
                <div className="w-full max-w-md mx-auto md:max-w-sm md:px-0 md:w-96 sm:px-4">
                  <div className="flex flex-col">
                    <div>
                      <h2 className="text-4xl text-white">Reset password</h2>
                    </div>
                  </div>
                  <form>
                    <input
                      defaultValue="https://jamstacker.studio/thankyou"
                      type="hidden"
                      name="_redirect"
                    />
                    <div className="mt-4 space-y-6">
                      <div className="col-span-full relative">
                        <label className="block mb-3 text-sm font-medium text-white">
                          Password
                        </label>
                        <input
                          required
                          name="password"
                          id="password"
                          type={passwordVisible ? "text" : "password"}
                          placeholder="******"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm pr-12" // Add pr-12 for padding right
                        />
                        <i
                          onClick={() => togglePasswordVisibility("password")}
                          className="absolute top-14 transform -translate-y-1/2  right-4 cursor-pointer"
                        >
                          <FontAwesomeIcon
                            icon={passwordVisible ? faEyeSlash : faEye}
                            id="togglePassword"
                          />
                        </i>
                      </div>
                      <div className="col-span-full relative">
                        <label className="block mb-3 text-sm font-medium text-white">
                          Confirm Password
                        </label>
                        <input
                          required
                          type={confirmPasswordVisible ? "text" : "password"}
                          name="confirm_password"
                          id="confirmPassword"
                          placeholder="******"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm pr-12" // Add pr-12 for padding right
                        />
                        <i
                          onClick={() =>
                            togglePasswordVisibility("confirmPassword")
                          }
                          className="absolute top-14 transform -translate-y-1/2  right-4 cursor-pointer"
                        >
                          <FontAwesomeIcon
                            icon={confirmPasswordVisible ? faEyeSlash : faEye}
                            id="toggleConfirmPassword"
                          />
                        </i>
                      </div>
                      <div className="col-span-full">
                        <button
                          onClick={handleResetPassword}
                          type="submit"
                          className="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-green-500 border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
                        >
                          Submit your request
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <p className="text-white text-base text-center mt-2">
                  {resetMessage}
                </p>
              </div>
            </section>
          </form>
        </div>
      </body>
    </div>
  );
}

export default ResetPassword;
