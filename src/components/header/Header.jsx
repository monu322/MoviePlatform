import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/fxdigitallogo.png";

export const Header = () => {
  return (
    <header>
      <nav>
        <Link to={`/`}><img src={logo} alt="logo" /></Link>      
      </nav>
    </header>
  );
};

export default Header;