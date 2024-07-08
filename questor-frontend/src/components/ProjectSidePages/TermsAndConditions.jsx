import React from "react";
import { XIcon } from "@heroicons/react/solid";

const TermsAndConditions = ({ isOpen, onClose }) => {
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
        <h3 className="text-2xl font-bold mb-4">Terms and Conditions</h3>
        <div className="space-y-4">
          <div className="bg-gray-700 p-4 rounded-md">
            <h4 className="text-lg font-semibold">
              Term 1: User Responsibilities
            </h4>
            <p className="text-sm text-gray-300">
              Users are responsible for maintaining the confidentiality of their
              account information, including their password. Any activity
              performed under a user’s account will be the responsibility of the
              account holder.
            </p>
          </div>
          <div className="bg-gray-700 p-4 rounded-md">
            <h4 className="text-lg font-semibold">
              Term 2: Acceptable Use Policy
            </h4>
            <p className="text-sm text-gray-300">
              Users must not use the Kanban Board application for any unlawful
              or prohibited activities. This includes, but is not limited to,
              posting offensive, defamatory, or infringing content.
            </p>
          </div>
          <div className="bg-gray-700 p-4 rounded-md">
            <h4 className="text-lg font-semibold">Term 3: Data Privacy</h4>
            <p className="text-sm text-gray-300">
              We are committed to protecting your privacy. Any personal
              information you provide to us will be used in accordance with our
              Privacy Policy. We will not share your data with third parties
              without your explicit consent.
            </p>
          </div>
          {/* Add more terms as needed */}
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

export default TermsAndConditions;
