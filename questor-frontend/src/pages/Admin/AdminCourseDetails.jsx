import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import SectionManagement from "../../components/AdminCourses/SectionManagement";
import ContentManagement from "../../components/AdminCourses/ContentManagement";

const AdminCourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [courseDetails, setCourseDetails] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);

  useEffect(() => {
    fetchCourseDetails();
  }, [courseId]);

  const fetchCourseDetails = () => {
    fetch(`http://localhost:8080/questor/courses/getCourse/${courseId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setCourseDetails(data))
      .catch((error) => console.error("Error fetching course details:", error));
  };

  const handleSectionClick = (section) => {
    setSelectedSection(section);
  };

  if (!courseDetails) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className="bg-black min-h-screen text-white flex flex-col items-center p-6">
        <div className="w-full max-w-4xl p-4 bg-gray-800 rounded-lg shadow-lg">
          <button
            onClick={() => navigate("/admindashboard")}
            className="bg-gray-700 text-white py-2 px-4 rounded-full flex items-center mb-4"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back
          </button>
          <h2 className="text-2xl font-bold mb-4">
            {courseDetails.courseName}
          </h2>
          <p className="text-lg">{courseDetails.description}</p>
          <p className="text-sm mt-4">Duration: {courseDetails.duration}</p>
          <p className="text-sm mt-2">Category: {courseDetails.categoryName}</p>
        </div>
        <SectionManagement
          courseId={courseId}
          onSectionClick={handleSectionClick}
        />
        {selectedSection && <ContentManagement section={selectedSection} />}
      </div>
    </>
  );
};

export default AdminCourseDetails;
