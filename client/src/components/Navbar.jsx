import React, { useContext } from "react";
import Logo from "../img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  const navigate = useNavigate();

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
          <Link className="link" to="/?cat=art">
            <h6>ART</h6>
          </Link>
          <Link className="link" to="/?cat=science">
            <h6>SCIENCE</h6>
          </Link>
          <Link className="link" to="/?cat=technology">
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link className="link" to="/?cat=cinema">
            <h6>CINEMA</h6>
          </Link>
          <Link className="link" to="/?cat=design">
            <h6>DESIGN</h6>
          </Link>
          <Link className="link" to="/?cat=food">
            <h6>FOOD</h6>
          </Link>
          <span>{currentUser?.username}</span>
          <span>
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
    </div>
  );
};

export default Navbar;
