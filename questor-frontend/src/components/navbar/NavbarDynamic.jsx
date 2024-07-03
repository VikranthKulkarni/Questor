import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserIcon } from "@heroicons/react/solid";

const NavbarDynamic = ({ links }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // Clear session storage
    sessionStorage.clear();
    // Navigate to the home page or login page after logout
    navigate("/");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav
      className={`bg-opacity-100 bg-gray-700 rounded-2xl shadow-lg fixed top-5 left-1/2 transform -translate-x-1/2 w-11/12 flex justify-between items-center p-4 ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      <Link to="/" className="text-white text-2xl font-bold">
        Questor
      </Link>
      <div className="flex space-x-4">
        {links.map((link, index) => (
          <Link
            key={index}
            to={link.url}
            className="text-white px-4 py-2 rounded-md"
          >
            {link.name}
          </Link>
        ))}
      </div>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className="flex items-center space-x-2"
        >
          <UserIcon className="w-8 h-8 text-white" />
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
            <Link
              to={`/profile/${sessionStorage.getItem("userId")}`}
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavbarDynamic;
