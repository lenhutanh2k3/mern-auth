import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const { userCurrent } = useSelector((state) => state.user);

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
          {/* Kiểm tra xem userCurrent có tồn tại không */}
          {userCurrent ? (
            <>
              <Link to="/profile">
                <img
                  src={userCurrent.avatar}
                  alt="avatar"
                  className=" w-8 h-8 rounded-full"
                />
              </Link>
              <Link to="/logout">Log out</Link>
            </>
          ) : (
            <Link to="/login">
              <li>Login</li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;
