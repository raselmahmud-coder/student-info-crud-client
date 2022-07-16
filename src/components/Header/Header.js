import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Header = () => {
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();
  const handleLogOut = () => {
    navigate("/log-in");
    localStorage.removeItem("access_token");
  };
  const menu1 = (
    <>
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      {
        <li>
          {token ? (
            <button onClick={handleLogOut}>Log out</button>
          ) : (
            <Link to={"/log-in"}>Log In</Link>
          )}
        </li>
      }
    </>
  );
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex="5" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex="4"
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {menu1}
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0">{menu1}</ul>
        </div>
      </div>
    </>
  );
};

export default Header;
