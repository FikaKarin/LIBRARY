import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

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
            THE NEIGHBORHOOD LIBRARY
          </Link>
        </li>
      </ul>

      <ul className="header-right">
        <li>
          <Link to="/create" onClick={() => reload()}>
            Create
          </Link>
        </li>
        <li>
          <Link to="/" onClick={() => reload()}>
            View
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Header;
