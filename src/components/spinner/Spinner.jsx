import React from "react";
import "./spinner.css";

const Spinner = () => {
  return (
    <div className="spinner-border text-primary mt-5 spinner" role="status">
      <div className="visually-hidden">Lodaing...</div>
    </div>
  );
};

export default Spinner;
