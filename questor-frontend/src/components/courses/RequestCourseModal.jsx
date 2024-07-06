import React, { useState } from "react";

const RequestCourseModal = ({ isOpen, onClose, onSubmit }) => {
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [category, setCategory] = useState("");
  const [justification, setJustification] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestDate = new Date().toISOString().split("T")[0]; // Format date as YYYY-MM-DD
    const userId = sessionStorage.getItem("userId");
    const newCourseRequest = {
      courseName,
      courseDescription,
      category,
      justification,
      requestedDate: requestDate,
      userId: parseInt(userId, 10),
      status: "Pending",
      adminComments: "",
    };

    try {
      const response = await fetch(
        "http://localhost:8080/questor/courseRequests/addCourseRequest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCourseRequest),
        }
      );

      if (response.ok) {
        onSubmit();
        onClose();
      } else {
        console.error("Error submitting course request");
      }
    } catch (error) {
      console.error("Error submitting course request:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-1/3">
        <h2 className="text-2xl mb-4">Request a New Course</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white">Course Name</label>
            <input
              type="text"
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white">Course Description</label>
            <textarea
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none"
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white">Category</label>
            <input
              type="text"
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white">Justification</label>
            <textarea
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none"
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestCourseModal;
