import React, { useState, useEffect, useCallback } from "react";
import { Outlet, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { message } from "antd";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faHouse,
  faShop,
  faPanorama,
  faList,
  faBell,
  faRightFromBracket,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

import "./styleA/dashStyleAgent.css";
function DashboardAgent() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [agentINFo, setAgentINFo] = useState([]);

  const userId = useSelector((state) => state.userId);
  // alert(JSON.stringify(userId));
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
  // Define fetchAgentData function
  const fetchAgentData = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/agents/agents/reference/${userId}`
      );
      setAgentINFo(response.data);
      fetchAgentData();
    } catch (error) {
      console.error("Error fetching agent data:", error);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchAgentData();
    }
  }, [userId, fetchAgentData]);
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
              <Link to="/dashboardAgent/MainBodyAgent">
                <a href="dd" className="active">
                  <span>
                    <FontAwesomeIcon icon={faChartLine} />
                  </span>
                  <span>Dashboard</span>
                </a>
              </Link>
            </li>

            <li>
              <Link to="/dashboardAgent/HousesBodyAgent">
                <a href="dd">
                  <span>
                    <FontAwesomeIcon icon={faShop} />
                  </span>
                  <span>Houses</span>
                </a>
              </Link>
            </li>
            <li>
              <Link to="/dashboardAgent/RealEstateAgent">
                <a href="d">
                  <span>
                    <FontAwesomeIcon icon={faPanorama} />
                  </span>
                  <span>Real Estate</span>
                </a>
              </Link>
            </li>

            <li id="lastI">
              <Link to="">
                <a href="d">
                  <span>
                    <FontAwesomeIcon icon={faRightFromBracket} />
                  </span>
                  <span onClick={handleLogout}>LOGOUT</span>
                  <i>
                    <Link to="/dashboardAgent/ProfilePageAgent">
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
              src={`http://localhost:3000/${agentINFo.image}`}
              width={"40px"}
              height={"40px"}
              alt="profile img"
            />
            <div className="infoheader">
              <h4>{agentINFo.fullName}</h4>
              <small>{agentINFo.email}</small>
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

export default DashboardAgent;
