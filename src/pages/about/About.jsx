import React from "react";
import "./about.scss";

import logo from "../../logo.png";

const About = () => {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src={logo} className="card-img-top" alt="..." />
      <div className="card-body">
        <h3 className="card-title">About Us</h3>
        <p className="card-text">
          Pencraft: Your creative sanctuary for sharing stories. Join our
          vibrant community of writers and readers, where every word finds its
          place.
        </p>
        <a
          href="https://www.linkedin.com/in/sunnydas54/"
          className="btn btn-primary"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
};

export default About;
