import React from "react";
import { useNavigate } from "react-router-dom";
import {
  HomeIcon,
  UserGroupIcon,
  BookOpenIcon,
  UserIcon,
  LogoutIcon,
  CreditCardIcon,
  TerminalIcon,
  ChatAltIcon,
  CalendarIcon,
  LinkIcon,
} from "@heroicons/react/solid";

const AdminSidebar = ({ setActiveSection }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className="bg-gray-800 w-1/4 p-4 ml-4 mt-8 mb-4 rounded-xl">
      <nav className="space-y-4">
        <button
          onClick={() => setActiveSection("dashboard")}
          className="flex items-center space-x-2 p-2 bg-gray-700 rounded-lg w-full"
        >
          <HomeIcon className="w-6 h-6 text-white" />
          <span>Dashboard</span>
        </button>
        <button
          onClick={() => setActiveSection("usersManagement")}
          className="flex items-center space-x-2 p-2 bg-gray-700 rounded-lg w-full"
        >
          <UserGroupIcon className="w-6 h-6 text-white" />
          <span>Manage Users</span>
        </button>
        <button
          onClick={() => setActiveSection("courseManagement")}
          className="flex items-center space-x-2 p-2 bg-gray-700 rounded-lg w-full"
        >
          <BookOpenIcon className="w-6 h-6 text-white" />
          <span>Manage Courses</span>
        </button>
        <button
          onClick={() => setActiveSection("projectManagement")}
          className="flex items-center space-x-2 p-2 bg-gray-700 rounded-lg w-full"
        >
          <TerminalIcon className="w-6 h-6 text-white" />
          <span>Manage Projects</span>
        </button>
        <button
          onClick={() => setActiveSection("categoriesManagement")}
          className="flex items-center space-x-2 p-2 bg-gray-700 rounded-lg w-full"
        >
          <LinkIcon className="w-6 h-6 text-white" />
          <span>Manage Categories</span>
        </button>
        <button
          onClick={() => setActiveSection("ContactUsManagement")}
          className="flex items-center space-x-2 p-2 bg-gray-700 rounded-lg w-full"
        >
          <ChatAltIcon className="w-6 h-6 text-white" />
          <span>Manage Contact Us Queries</span>
        </button>
        <button
          onClick={() => setActiveSection("subscriptionManagement")}
          className="flex items-center space-x-2 p-2 bg-gray-700 rounded-lg w-full"
        >
          <CalendarIcon className="w-6 h-6 text-white" />
          <span>Manage Subscriptions</span>
        </button>
        <button
          onClick={() => setActiveSection("transactionManagement")}
          className="flex items-center space-x-2 p-2 bg-gray-700 rounded-lg w-full"
        >
          <CreditCardIcon className="w-6 h-6 text-white" />
          <span>Manage Transactions</span>
        </button>
        <button
          onClick={() => setActiveSection("profile")}
          className="flex items-center space-x-2 p-2 bg-gray-700 rounded-lg w-full"
        >
          <UserIcon className="w-6 h-6 text-white" />
          <span>Profile</span>
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 p-2 bg-gray-700 rounded-lg w-full"
        >
          <LogoutIcon className="w-6 h-6 text-white" />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
};

export default AdminSidebar;
