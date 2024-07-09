import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Countdown from "react-countdown";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#2d3748", // bg-gray-800
    borderRadius: "0.5rem", // rounded-lg
    padding: "2rem", // p-8
    boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)", // shadow-lg
    width: "90%", // responsive width
    maxWidth: "800px", // max width
  },
};

const UpcomingCoursesModal = ({ isOpen, onRequestClose }) => {
  const [upcomingCourses, setUpcomingCourses] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      fetchUpcomingCourses();
    }
  }, [isOpen]);

  const fetchUpcomingCourses = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/questor/upcoming-courses/getAllUpcomingCourses"
      );
      const data = await response.json();
      setUpcomingCourses(data);
      setCurrentIndex(0);
    } catch (error) {
      console.error("Error fetching upcoming courses:", error);
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? upcomingCourses.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === upcomingCourses.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <h2 className="text-2xl font-bold mb-4 text-center text-white">
        Upcoming Courses
      </h2>
      {upcomingCourses.length === 0 ? (
        <p className="text-white">No upcoming courses available.</p>
      ) : (
        <div className="flex flex-col items-center">
          <div
            key={upcomingCourses[currentIndex].upcomingCourseId}
            className="bg-gray-700 p-4 rounded-md shadow-md flex flex-col items-center"
          >
            {upcomingCourses[currentIndex].promotionalImage && (
              <img
                src={upcomingCourses[currentIndex].promotionalImage}
                alt={upcomingCourses[currentIndex].courseName}
                className="w-full h-32 object-cover rounded-md mb-4"
              />
            )}
            <h3 className="text-xl font-bold text-white mb-2">
              {upcomingCourses[currentIndex].courseName}
            </h3>
            <p className="text-gray-400 mb-1 text-center">
              {upcomingCourses[currentIndex].promotionalDescription}
            </p>
            <p className="text-gray-400 mb-1">
              Prerequisites: {upcomingCourses[currentIndex].prerequisites}
            </p>
            <Countdown
              date={new Date(upcomingCourses[currentIndex].expectedReleaseDate)}
              renderer={({ days }) => (
                <p className="text-gray-400 mb-2">Release in: {days} days</p>
              )}
            />
          </div>
          <div className="flex justify-between w-full mt-4">
            <button
              className="bg-indigo-600 text-white py-2 px-4 rounded-full hover:bg-indigo-500 transition duration-300"
              onClick={handlePrev}
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <button
              className="bg-indigo-600 text-white py-2 px-4 rounded-full hover:bg-indigo-500 transition duration-300"
              onClick={handleNext}
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
      <button
        className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-full hover:bg-indigo-500 transition duration-300"
        onClick={onRequestClose}
      >
        Close
      </button>
    </Modal>
  );
};

export default UpcomingCoursesModal;
