import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import NavbarDynamic from "../../components/navbar/NavbarDynamic";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/solid";

const CourseViewPage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [sections, setSections] = useState([]);
  const [contents, setContents] = useState({});
  const [openSections, setOpenSections] = useState({});
  const [selectedContent, setSelectedContent] = useState(null);

  const userId = sessionStorage.getItem("userId");
  const navbarLinks = [
    { name: "Home", url: "/userDashboard" },
    { name: "Project Portal", url: `/projects/${userId}` },
    { name: "Wishlist", url: `/wishlist/${userId}` },
    { name: "Contact Us", url: "/contactUs" },
  ];

  useEffect(() => {
    fetchCourseDetails();
    fetchCourseSections();
  }, [courseId]);

  const fetchCourseDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/questor/courses/getCourse/${courseId}`
      );
      const data = await response.json();
      setCourse(data);
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };

  const fetchCourseSections = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/questor/sections/course/${courseId}`
      );
      const data = await response.json();
      setSections(Array.isArray(data) ? data : []);
      fetchSectionsContents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching course sections:", error);
    }
  };

  const fetchSectionsContents = async (sections) => {
    const contentsData = {};
    let firstContent = null;
    for (const section of sections) {
      try {
        const response = await fetch(
          `http://localhost:8080/questor/contents/section/${section.sectionId}`
        );
        const data = await response.json();
        contentsData[section.sectionId] = data;
        if (!firstContent && data.length > 0) {
          firstContent = data[0];
          setSelectedContent(firstContent);
          setOpenSections((prev) => ({ ...prev, [section.sectionId]: true }));
        }
      } catch (error) {
        console.error(
          `Error fetching contents for section ${section.sectionId}:`,
          error
        );
      }
    }
    setContents(contentsData);
  };

  const toggleSection = (sectionId) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const handleContentClick = (content) => {
    console.log("Clicked content:", content); // Debugging statement
    setSelectedContent(content);
  };

  const renderContent = (content) => {
    if (!content || !content.type) {
      console.error(
        "Unsupported content type or content type missing:",
        content
      ); // Debugging statement
      return <div className="text-white">Unsupported content type</div>;
    }

    const normalizedType = content.type.toLowerCase();

    console.log("Rendering content:", content); // Debugging statement

    switch (normalizedType) {
      case "video":
        const videoUrl = content.url.includes("youtube.com")
          ? content.url.replace("watch?v=", "embed/")
          : content.url;
        return (
          <iframe
            width="100%"
            height="450"
            src={videoUrl}
            title={content.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
          ></iframe>
        );
      case "image":
        return (
          <img
            src={content.url}
            alt={content.title}
            className="w-full h-450 object-cover rounded-lg"
          />
        );
      case "pdf":
        return (
          <iframe
            src={content.url}
            title={content.title}
            width="100%"
            height="450"
            className="rounded-lg"
          ></iframe>
        );
      case "audio":
        return (
          <audio controls className="w-full rounded-lg">
            <source src={content.url} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        );
      default:
        console.error("Unsupported content type:", content.type); // Debugging statement
        return <div className="text-white">Unsupported content type</div>;
    }
  };

  return (
    <div className="bg-black min-h-screen flex flex-row text-white">
      <div className="w-full p-8">
        <div className="mx-auto flex flex-col h-full">
          <NavbarDynamic links={navbarLinks} />
          {course && (
            <div className="flex flex-col lg:flex-row mt-20 h-full">
              <div className="lg:w-3/4 lg:pr-8 h-full flex flex-col">
                <div className="mb-8">
                  {selectedContent ? (
                    renderContent(selectedContent)
                  ) : (
                    <div className="bg-gray-800 text-white p-4 rounded-lg">
                      Loading first content...
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <nav className="flex justify-around bg-gray-700 rounded-lg">
                    <Link to="/overview" className="px-4 py-2 text-white">
                      Overview
                    </Link>
                    <Link to="/resources" className="px-4 py-2 text-white">
                      Resources
                    </Link>
                    <Link to="/notes" className="px-4 py-2 text-white">
                      Notes
                    </Link>
                    <Link to="/feedback" className="px-4 py-2 text-white">
                      Feedback
                    </Link>
                  </nav>
                </div>
                <div className="text-left overflow-auto">
                  <h1 className="text-4xl font-bold mb-2">
                    {course.courseName}
                  </h1>
                  <p className="text-lg mb-4">
                    Course Duration:{" "}
                    <span className="text-blue-500">{course.duration}</span>
                  </p>
                  <p className="mb-4">{course.description}</p>
                </div>
              </div>
              <div className="lg:w-1/4 mt-8 lg:mt-0 h-full">
                <div className="bg-gray-800 p-4 rounded-lg overflow-y-auto h-5/6">
                  {sections.length > 0 &&
                    sections.map((section) => (
                      <div key={section.sectionId}>
                        <button
                          className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-white bg-gray-700 rounded-lg hover:bg-gray-600 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75 mt-4"
                          onClick={() => toggleSection(section.sectionId)}
                        >
                          <div>
                            <span>{section.sectionName}</span>
                          </div>
                          <div className="mt-3">
                            {openSections[section.sectionId] ? (
                              <ChevronDownIcon className="w-5 h-5 text-white" />
                            ) : (
                              <ChevronRightIcon className="w-5 h-5 text-white" />
                            )}
                          </div>
                        </button>
                        {openSections[section.sectionId] && (
                          <div className="px-4 pt-4 pb-2 text-sm text-gray-200">
                            {contents[section.sectionId] &&
                              contents[section.sectionId].map((content) => (
                                <div
                                  key={content.contentId}
                                  className="mt-2 space-y-2 cursor-pointer"
                                  onClick={() => handleContentClick(content)}
                                >
                                  <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-400">
                                      {content.title}
                                    </span>
                                    <span className="text-gray-400">
                                      {content.duration}
                                    </span>
                                  </div>
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    ))}
                  {sections.length === 0 && <p>No sections available.</p>}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseViewPage;
