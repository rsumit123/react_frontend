import React from "react";
// import Menu from "./Menu";
const Base = ({
  title = "My Title",
  description = "My description",
  className = "bg-dark text-white p-4",
  children,
}) => {
  return (
    <div>
      <div className="hero is-primary">
        <div className="hero-body container">
          <h4 className="title">E-Retail</h4>
        </div>
      </div>
      {children}
      <footer className="hero is-primary">
        <div className="hero-body container">
          <h4>If you have any questions, reach me out on Twitter, Instagram</h4>
        </div>
      </footer>
    </div>
  );
};

export default Base;
