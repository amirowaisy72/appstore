import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import contextCreator from "../context/contextCreator";

const Navbar = () => {
  let location = useLocation();
  const context = useContext(contextCreator)
  const { AppsShow } = context

  const triggerApps = async() => {
    //Trigger initial apps with pagination
    await AppsShow('all', '')
  }
 
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link onClick={triggerApps} className="navbar-brand" to="/">
        Appstore
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">

          {/* <li onClick={triggerApps} className="nav-item">
            <Link
              className={`nav-link ${
                location.pathname == "/apps" ? "active" : ""
              }`}
              to="/apps"
            >
              Apps
            </Link>
          </li> */}

          {/* <li className="nav-item">
            <Link
              className={`nav-link ${
                location.pathname == "/admin" ? "active" : ""
              }`}
              to="/admin"
            >
              Admin Panel
            </Link>
          </li> */}

        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
