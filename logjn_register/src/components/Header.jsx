import React from "react";
import { Link } from "react-router-dom";
function Header() {
  return (
    <div className="bg-gray-900 text-white">
      <div className="flex justify-between items-center mx-auto max-w-6xl p-3">
        <Link to="/">
          <h2>AUTH APP</h2>
        </Link>
        <ul className="flex gap-4 text-xl">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          <Link to="/login">
            <li>Login</li>
          </Link>
          
        </ul>
      </div>
    </div>
  );
}

export default Header;
