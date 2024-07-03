import { Link } from "react-router-dom";
import React from "react";

const Fotter = () => {
  return (
    <footer className="mt-12 text-center text-white">
      <h1 className="text-2xl font-bold">Questor</h1>
      <div className="flex justify-center space-x-4 mt-4">
        <Link to="/about-us" className="text-gray-400 hover:text-gray-200">
          About us
        </Link>
        <Link
          to="/terms-of-service"
          className="text-gray-400 hover:text-gray-200"
        >
          Terms of Service
        </Link>
        <Link
          to="/privacy-policy"
          className="text-gray-400 hover:text-gray-200"
        >
          Privacy Policy
        </Link>
        <Link to="/cookie-notice" className="text-gray-400 hover:text-gray-200">
          Cookie Notice
        </Link>
      </div>
      <p className="text-gray-400 mt-4">©2024 Questor All Rights Reserved.</p>
    </footer>
  );
};

export default Fotter;
