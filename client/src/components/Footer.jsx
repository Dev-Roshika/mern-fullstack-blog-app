import React from "react";
import Logo from "../img/logo.png";

const Footer = () => {
  return (
    <footer>
      <div>
        <img
          style={{ cursor: "pointer" }}
          src={Logo}
          alt=""
          onClick={() => window.location.reload()}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <span>© 2021 Roshika</span>
      </div>
    </footer>
  );
};

export default Footer;
