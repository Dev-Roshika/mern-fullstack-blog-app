import React, { useContext, useEffect, useState } from "react";
import Logo from "../img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import axios from "axios";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    // Get user ID from local storage

    const userDetails = JSON.parse(localStorage.getItem("user"));

    axios.defaults.withCredentials = true;
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `https://mern-fullstack-blog-app-api.vercel.app/user/${userDetails._id}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (userDetails) {
      fetchUser();
    }
  }, []);

  const handleWriteClick = () => {
    if (!currentUser) {
      alert("Please log in to write a post.");
      navigate("/auth/login");
    } else {
      navigate("/write");
    }
  };

  const handleLogout = async () => {
    try {
      logout(); // Clear user context
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <img
            style={{ cursor: "pointer" }}
            src={Logo}
            alt=""
            onClick={() => (window.location.href = "/")}
          />
        </div>
        <div className="links">
          <Link
            className={`linkCat ${activeCategory === "art" ? "active" : ""}`}
            to="/?cat=art"
            onClick={() => handleCategoryClick("art")}
          >
            <h6>ART</h6>
          </Link>
          <Link
            className={`linkCat ${
              activeCategory === "science" ? "active" : ""
            }`}
            to="/?cat=science"
            onClick={() => handleCategoryClick("science")}
          >
            <h6>SCIENCE</h6>
          </Link>
          <Link
            className={`linkCat ${
              activeCategory === "technology" ? "active" : ""
            }`}
            to="/?cat=technology"
            onClick={() => handleCategoryClick("technology")}
          >
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link
            className={`linkCat ${activeCategory === "cinema" ? "active" : ""}`}
            to="/?cat=cinema"
            onClick={() => handleCategoryClick("cinema")}
          >
            <h6>CINEMA</h6>
          </Link>
          <Link
            className={`linkCat ${activeCategory === "design" ? "active" : ""}`}
            to="/?cat=design"
            onClick={() => handleCategoryClick("design")}
          >
            <h6>DESIGN</h6>
          </Link>
          {currentUser ? (
            <div>
              <img
                src={`https://mern-fullstack-blog-app-api.vercel.app/uploads/users/${user?.img}`}
                alt=""
              />
            </div>
          ) : null}
          <span style={{ fontWeight: 600, color: "#14b8a6" }}>
            {currentUser?.username}
          </span>
          <span className="logoutSpan">
            {currentUser ? (
              <span className="logout" onClick={handleLogout}>
                Logout
              </span>
            ) : (
              <Link className="link" to="/auth/login">
                Login
              </Link>
            )}
          </span>
          <span className="write">
            <span className="link" onClick={handleWriteClick}>
              Write
            </span>
          </span>
        </div>
      </div>
      <hr></hr>
    </div>
  );
};

export default Navbar;
