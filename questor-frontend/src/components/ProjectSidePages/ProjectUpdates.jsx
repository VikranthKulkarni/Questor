import React from "react";
import { XIcon } from "@heroicons/react/solid";

const ProjectUpdates = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <XIcon className="h-6 w-6" />
        </button>
        <h3 className="text-2xl font-bold mb-4">Project Updates</h3>
        <div className="space-y-4">
          <div className="bg-gray-700 p-4 rounded-md">
            <h4 className="text-lg font-semibold">Version 1.0.0</h4>
            <p className="text-sm text-gray-300">
              Initial release of the project with the core functionalities:
            </p>
            <ul className="list-disc list-inside text-gray-300">
              <li>User registration and login</li>
              <li>Project creation, editing, and deletion</li>
              <li>Basic Kanban board implementation</li>
              <li>User profile management</li>
            </ul>
          </div>
          <div className="bg-gray-700 p-4 rounded-md">
            <h4 className="text-lg font-semibold">Version 1.0.1</h4>
            <p className="text-sm text-gray-300">
              Minor updates and bug fixes:
            </p>
            <ul className="list-disc list-inside text-gray-300">
              <li>Fixed issues with project deletion</li>
              <li>Improved UI responsiveness</li>
              <li>Added confirmation modals for critical actions</li>
              <li>Performance optimizations for the Kanban board</li>
            </ul>
          </div>
          <div className="bg-gray-700 p-4 rounded-md">
            <h4 className="text-lg font-semibold">Version 1.0.2</h4>
            <p className="text-sm text-gray-300">
              New features and enhancements:
            </p>
            <ul className="list-disc list-inside text-gray-300">
              <li>
                Introduced drag and drop functionality for Kanban board tasks
              </li>
              <li>Enhanced security features for user authentication</li>
              <li>Added new filter options for the project dashboard</li>
              <li>Improved error handling and user feedback mechanisms</li>
            </ul>
          </div>
          {/* Add more updates as needed */}
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-red-600 text-white py-2 px-4 rounded-full"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectUpdates;
