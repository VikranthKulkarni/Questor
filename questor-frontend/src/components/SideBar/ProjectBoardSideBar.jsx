import React from "react";
import { Link } from "react-router-dom";
import {
  HomeIcon,
  ChatAltIcon,
  QuestionMarkCircleIcon,
  LockClosedIcon,
} from "@heroicons/react/solid";

const ProjectBoardSideBar = ({
  userId,
  onUpdatesClick,
  onHowToUseClick,
  onTermsClick,
}) => {
  return (
    <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full lg:w-1/4 m-4 space-y-4">
      <div className="flex items-center space-x-4">
        <HomeIcon className="w-6 h-6 text-white" />
        <Link
          to={`/projects/${userId}`}
          className="text-white text-lg font-semibold"
        >
          Dashboard
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <ChatAltIcon className="w-6 h-6 text-white" />
        <button
          onClick={onUpdatesClick}
          className="text-white text-lg font-semibold"
        >
          Updates
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <QuestionMarkCircleIcon className="w-6 h-6 text-white" />
        <button
          onClick={onHowToUseClick}
          className="text-white text-lg font-semibold"
        >
          How to use?
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <LockClosedIcon className="w-6 h-6 text-white" />
        <button
          onClick={onTermsClick}
          className="text-white text-lg font-semibold"
        >
          Terms and Conditions
        </button>
      </div>
    </div>
  );
};

export default ProjectBoardSideBar;
