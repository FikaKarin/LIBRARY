import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import logo from './images/Logo.PNG'

function Header() {
  const reload = () => {
      setTimeout(() => {
        window.location.reload(false);
      }, 100);
  };

  return (
    <div className="header">
      <ul className="header-left">
        <li className="logo">
          <Link to="/" onClick={() => reload()}>
          <img src={logo} alt="logo" />
          </Link>
        </li>
      </ul>

      <ul className="header-right">
        <li>
          <Link to="/create" onClick={() => reload()}>
            Add
          </Link>
        </li>
        <li>
          <Link to="/view" onClick={() => reload()}>
            View all
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Header;
