import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./header.css";

const Header = ({ active, setActive, user, handleLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate()
  const loaction = useLocation()

  const userId = user?.uid;

  const defaultPhotoURL = "https://cdn-icons-png.flaticon.com/512/149/149071.png"

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleItemClick = (item) => {
    setActive(item);
    setIsMenuOpen(false);
  };

  const handleLogoutClick = ()=> {
    handleLogout()
    setIsMenuOpen(false)
  }

  useEffect(()=> {
    setIsMenuOpen(false)
  }, [loaction.pathname])

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          PenCraft <span>beta</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={toggleMenu}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <Link to="/">
              <li
                className={`nav-item nav-link ${
                  active === "home" ? "active" : ""
                }`}
                onClick={() => handleItemClick("home")}
              >
                Home
              </li>
            </Link>
            <Link to="/create">
              <li
                className={`nav-item nav-link ${
                  active === "create" ? "active" : ""
                }`}
                onClick={() => handleItemClick("create")}
              >
                Create
              </li>
            </Link>
            <Link to="/about">
              <li
                className={`nav-item nav-link ${
                  active === "about" ? "active" : ""
                }`}
                onClick={() => handleItemClick("about")}
              >
                About
              </li>
            </Link>
          </ul>

          <div className="row g-3">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {userId ? (
                <>
                  <div className="profile-logo">
                    <img
                      src={user?.photoURL || defaultPhotoURL}
                      alt="logo"
                      onClick={()=> navigate('/profile')}
                    />
                  </div>
                  <p className="displayName">{user?.displayName}</p>
                  <li className="nav-item nav-link" onClick={handleLogoutClick}>Logout</li>
                </>
              ) : (
                <>
                  <Link to="/auth">
                    <li
                      className={`nav-item nav-link ${
                        active === "login" ? "active" : ""
                      }`}
                      onClick={() => handleItemClick("login")}
                    >
                      Login
                    </li>
                  </Link>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
