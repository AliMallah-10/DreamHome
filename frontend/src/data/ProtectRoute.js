import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import "./stylePr.css";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const accessToken = getAccessTokenFromCookie();
        if (!accessToken || isTokenExpired(accessToken)) {
          await refreshAccessToken(); // Refresh access token if expired
        } else {
          setIsLoggedIn(true);
          checkTokenExpiration(); // Check token expiration periodically
        }
      } catch (error) {
        console.error("Error fetching access token:", error);
        // Handle token refresh error
      } finally {
        setLoading(false);
      }
    };

    fetchAccessToken();
  });

  const refreshAccessToken = async () => {
    try {
      const refreshToken = getRefreshTokenFromCookie();
      const response = await axios.post(
        "http://localhost:3000/users/refresh-token",
        { refreshToken },
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        response.data;
      updateAccessTokenAndRefreshTokenInCookie(newAccessToken, newRefreshToken);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${newAccessToken}`; // Update axios instance with new access token
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error refreshing access token:", error);
      setIsLoggedIn(false);
    }
  };

  const checkTokenExpiration = () => {
    // Check token expiration periodically (e.g., every minute)
    setInterval(async () => {
      const accessToken = getAccessTokenFromCookie();
      if (!accessToken || isTokenExpired(accessToken)) {
        await refreshAccessToken(); // Refresh access token if expired
      }
    }, 60000); // 60,000 milliseconds = 1 minute
  };

  const isTokenExpired = (token) => {
    if (!token) return true;
    const base64Url = token.split(".")[1];
    if (!base64Url) return true;
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    const { exp } = JSON.parse(jsonPayload);
    return exp < Date.now() / 1000;
  };

  const getAccessTokenFromCookie = () => {
    const accessTokenCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken="));

    if (accessTokenCookie) {
      return accessTokenCookie.split("=")[1];
    }

    return null;
  };

  const getRefreshTokenFromCookie = () => {
    const refreshTokenCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("refreshToken="));

    if (refreshTokenCookie) {
      const token = refreshTokenCookie.split("=")[1];
      // If the token starts with "Bearer ", remove it
      if (token.startsWith("Bearer ")) {
        return token.slice(7); // Remove the "Bearer " prefix
      }
      return token;
    }

    return null;
  };

  const updateAccessTokenAndRefreshTokenInCookie = (
    accessToken,
    refreshToken
  ) => {
    document.cookie = `accessToken=${accessToken}; path=/`;
    document.cookie = `refreshToken=${refreshToken}; path=/`;
  };

  if (loading) {
    // Optional: Show a loading spinner or indicator while refreshing tokens
    return (
      <div className="bodyProtect">
        <p className="loadProtect"></p>
        <div className="spinnerP">
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    // Redirect to the sign-in page if not logged in
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
