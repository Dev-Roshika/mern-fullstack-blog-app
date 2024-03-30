import React from "react";
import Logo from "../img/logo.png";

const Footer = () => {
  return (
    <footer>
      <img
        style={{ cursor: "pointer" }}
        src={Logo}
        alt=""
        onClick={() => window.location.reload()}
      />

      <span>© 2021 Roshika</span>
    </footer>
  );
};

export default Footer;
