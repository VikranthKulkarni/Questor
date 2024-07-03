import React from "react";

const RequestNewCourse = () => {
  const handleRequestCourseClick = () => {
    window.open("https://forms.gle/your-google-form-link", "_blank");
  };

  return (
    <div
      className="bg-gray-700 p-8 rounded-xl text-left w-full cursor-pointer"
      style={{ height: "200px" }}
      onClick={handleRequestCourseClick}
    >
      <h2 className="text-sm font-semibold text-gray-300">QUESTOR</h2>
      <h1 className="text-2xl font-bold text-white mt-2">
        Request a New Course
      </h1>
      <button className="bg-white text-gray-900 py-2 px-4 rounded-full mt-9">
        Request
      </button>
    </div>
  );
};

export default RequestNewCourse;
