import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/fxdigitallogo.png";

export const Header = () => {
  return (
    <header>
      <nav>
        <Link to={`/`}><img src={logo} alt="logo" /></Link>      
        <form>
          <input type="text" name="search" placeholder="Search movies"/>
          <button type="submit">Go</button>
        </form>
      </nav>
    </header>
  );
};

export default Header;