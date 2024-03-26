import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { message } from "antd";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faUsers,
  faHouse,
  faShop,
  faPanorama,
  faList,
  faBell,
  faUserTie,
  faRightFromBracket,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

import "./style/dashStyle.css";
function DashboardAdmin() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [profileData, setProfileData] = useState({
    email: "",
    username: "",

    profileImage: "",
  });

  const scrollToAgentUser = () => {
    const agentUserDiv = document.getElementById("agentuser");
    if (agentUserDiv) {
      agentUserDiv.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    const handleClick = (event) => {
      // Check if the click is outside the dropdown
      if (event.target.closest(".user-wrapper") === null && dropdownVisible) {
        setDropdownVisible(false);
      }
    };

    // Add click event listener to the document
    document.addEventListener("click", handleClick);

    // Remove event listener when the component is unmounted
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [dropdownVisible]);

  useEffect(() => {
    // Retrieve profile data from local storage
    const savedProfileData = JSON.parse(localStorage.getItem("profileData"));
    if (savedProfileData) {
      setProfileData(savedProfileData);
    }
  }, []);

  const handleLogout = async () => {
    try {
      // Make a request to logout endpoint
      const response = await axios.post("http://localhost:3000/users/logout");

      if (response.status === 200) {
        // Clear cookies
        document.cookie =
          "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        // Redirect to login page or handle logout success
        // For example:
        message.success(response.data.message);
        window.location.href = "/login";
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error.response.data.message);
    }
  };
  // Example data for a bar chart

  return (
    <body>
      <input type="checkbox" id="nav-toggle" />
      <div className="sidebar">
        <div className="sidebar-brand">
          <h2>
            <span>
              <img
                src={require("../../assets/images/imgbin-green-home-house-removebg-preview.png")}
                alt=""
              />
            </span>
            <span>
              <h1>Dream Home</h1>
            </span>
          </h2>
        </div>
        <div className="sidebar-menu">
          <ul>
            <li>
              <Link to="/signin">
                <a href="dd">
                  <span>
                    <FontAwesomeIcon icon={faHouse} />
                  </span>
                  <span>Home</span>
                </a>
              </Link>
            </li>
            <li>
              <Link to="/dashboard/mainBody">
                <a href="dd" className="active">
                  <span>
                    <FontAwesomeIcon icon={faChartLine} />
                  </span>
                  <span>Dashboard</span>
                </a>
              </Link>
            </li>
            <li>
              <Link to="/dashboard/userBody">
                <a href="dd">
                  <span>
                    <FontAwesomeIcon icon={faUsers} />
                  </span>
                  <span>Users</span>
                </a>
              </Link>
            </li>
            <li>
              <Link to="/dashboard/housesBody">
                <a href="dd">
                  <span>
                    <FontAwesomeIcon icon={faShop} />
                  </span>
                  <span>Houses</span>
                </a>
              </Link>
            </li>
            <li>
              <Link to="/dashboard/realEstate">
                <a href="d">
                  <span>
                    <FontAwesomeIcon icon={faPanorama} />
                  </span>
                  <span>Real Estate</span>
                </a>
              </Link>
            </li>
            <li>
              <Link to="/dashboard/userBody" onClick={scrollToAgentUser}>
                <a href="d">
                  <span>
                    <FontAwesomeIcon icon={faUserTie} />
                  </span>
                  <span>Agent</span>
                </a>
              </Link>
            </li>
            <li>
              <Link to="">
                <a href="d">
                  <span>
                    <FontAwesomeIcon icon={faRightFromBracket} />
                  </span>
                  <span onClick={handleLogout}>LOGOUT</span>
                  <i>
                    <Link to="/dashboard/profilePage">
                      <FontAwesomeIcon icon={faGear} />
                    </Link>
                  </i>
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="main-content">
        <header>
          <h3>
            <label htmlFor="nav-toggle">
              <span>
                <FontAwesomeIcon icon={faList} />
              </span>
            </label>
            Dashboard
          </h3>

          <div className="user-wrapper">
            <div>
              <i>
                <FontAwesomeIcon icon={faBell} />
              </i>
            </div>
            <img
              src={profileData.profileImage}
              width={"40px"}
              height={"40px"}
              alt="profile img"
            />
            <div className="infoheader">
              <h4>{profileData.username}</h4>
              <small>{profileData.email}</small>
            </div>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </body>
  );
}

export default DashboardAdmin;
