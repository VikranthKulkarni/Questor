import React, { useState } from "react";
import RequestCourseModal from "./RequestCourseModal";

const RequestNewCourse = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRequestCourseClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = () => {
    setIsModalOpen(false);
    // You can add any additional logic needed after submitting the form
  };

  return (
    <div className="bg-gray-700 p-4 rounded-xl text-left w-full flex flex-col items-center md:items-start">
      <div className="flex flex-col justify-between w-full items-center md:items-start mb-4">
        <h2 className="text-sm font-semibold text-gray-300">QUESTOR</h2>
        <h1 className="text-lg md:text-xl font-bold text-white text-center md:text-left w-full">
          Request a New Course
        </h1>
      </div>
      <div className="flex justify-center w-full md:w-auto">
        <button
          className="bg-white text-gray-900 py-2 px-4 rounded-full"
          onClick={handleRequestCourseClick}
        >
          Request
        </button>
      </div>

      <RequestCourseModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};

export default RequestNewCourse;
