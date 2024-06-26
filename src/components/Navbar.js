import React from "react";
import { Link, useLocation } from "react-router-dom";


const Navbar = () => {
  let location = useLocation();
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-warning">
      <div className="container-fluid">
        <Link style={{color: "white"}} className="navbar-brand" to="/">
          <strong>iNotebook</strong>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link  className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">
                <strong>Home</strong>
              </Link>
            </li>
            <li className="nav-item">
              <Link  className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">
                <strong>About</strong>
              </Link>
            </li>
          </ul>
          <form className="d-flex" role="search">
          <Link className="btn btn-light mx-2" to="/signup" role="button">Signup</Link>
            <Link className="btn btn-light mx-2" to="/login" role="button">Login</Link>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
