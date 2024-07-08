import React, { useEffect, useState } from "react";
import NavbarDynamic from "../../components/navbar/NavbarDynamic";
import CourseCard from "../../components/courses/CourseCard";
import Fotter from "../../components/footer/Fotter";
import CourseProfileCard from "../../components/courses/CourseProfileCard";
import RequestNewCourse from "../../components/courses/RequestNewCourse";

const UserDashboardPage = () => {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchCourses();
    fetchCategories();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/questor/courses/getAllCourses"
      );
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/questor/categories/getAllCategories"
      );
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const filteredCourses = courses.filter(
    (course) =>
      (selectedCategory ? course.categoryId === selectedCategory : true) &&
      course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const userId = sessionStorage.getItem("userId");
  const navbarLinks = [
    { name: "Home", url: "/userDashboard" },
    { name: "Project Portal", url: `/projects/${userId}` },
    { name: "Wishlist", url: `/wishlist/${userId}` },
    { name: "Contact Us", url: "/contactUs" },
    { name: "My Requests", url: `/userRequests/${userId}` },
    { name: "About Us", url: "/about-us" },
  ];

  return (
    <div className="bg-black min-h-screen flex flex-col text-white">
      <div style={{ zIndex: "999" }}>
        <NavbarDynamic links={navbarLinks} />
      </div>

      <div className="flex-grow w-full flex justify-center items-center mt-32">
        <div className="mx-auto w-11/12 md:w-3/4">
          <div className="flex flex-col md:flex-row justify-center items-stretch mb-8 space-y-4 md:space-y-0 md:space-x-4 h-auto md:h-32">
            <div className="w-full md:w-1/2 flex flex-col h-full">
              <div className="bg-gray-700 p-4 rounded-xl text-left h-full flex flex-col md:flex-row items-center">
                <RequestNewCourse />
              </div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col h-full">
              <div className="bg-gray-700 p-4 rounded-xl text-left h-full flex flex-col md:flex-row items-center">
                <CourseProfileCard />
              </div>
            </div>
          </div>

          <div className="flex flex-row items-center">
            <h1 className="text-4xl font-bold mb-4">Hi, techie</h1>
            <div className="flex justify-center mb-4 w-full">
              <input
                type="text"
                placeholder="Search Your Courses"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap justify-center space-x-2 mb-8 ">
            <button
              className={`bg-gray-900 text-white px-4 py-2 rounded-full mb-4 ${
                selectedCategory === "" ? "bg-gray-700" : ""
              }`}
              onClick={() => handleCategoryClick("")}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.categoryId}
                className={`bg-gray-900 text-white px-4 py-2 rounded-full mb-4 ${
                  selectedCategory === category.categoryId ? "bg-gray-700" : ""
                }`}
                onClick={() => handleCategoryClick(category.categoryId)}
              >
                {category.categoryName}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.courseId}
                courseId={course.courseId}
                title={course.courseName}
                image={course.courseImage}
              />
            ))}
          </div>
          <div className="bg-gray-700 p-8 rounded-xl mt-12 flex flex-col items-center">
            <p className="text-center text-white mb-4">
              Begin the journey of your dream career today by joining our
              expansive community of students and mentors.
            </p>
            <button className="bg-white text-indigo-900 py-2 px-4 rounded-full">
              View upcoming courses
            </button>
          </div>
        </div>
      </div>
      {/* Footer Section */}
      <Fotter />
    </div>
  );
};

export default UserDashboardPage;
