import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PencilAltIcon, TrashIcon, PlusIcon } from "@heroicons/react/solid";
import AdminGreeting from "../../components/AdminGreeting/AdminGreeting";

const AdminCourseManagement = () => {
  const userId = sessionStorage.getItem("userId");
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState({
    courseId: null,
    courseName: "",
    description: "",
    duration: "",
    categoryId: null,
    courseImage: "",
  });
  const [sortCriteria, setSortCriteria] = useState({
    key: "courseId",
    order: "asc",
  });

  const coursesPerPage = 10;
  const totalPages = Math.ceil(courses.length / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const selectedCourses = courses.slice(
    startIndex,
    startIndex + coursesPerPage
  );

  useEffect(() => {
    fetchCourses();
    fetchCategories();
  }, []);

  const fetchCourses = () => {
    fetch("http://localhost:8080/questor/courses/getAllCourses")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setCourses(data))
      .catch((error) => console.error("Error fetching courses:", error));
  };

  const fetchCategories = () => {
    fetch("http://localhost:8080/questor/categories/getAllCategories")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  };

  const handleEdit = (course, event) => {
    event.stopPropagation();
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedCourse({
      courseId: null,
      courseName: "",
      description: "",
      duration: "",
      categoryId: null,
      courseImage: "",
    });
    setIsModalOpen(true);
  };

  const handleDelete = (courseId, event) => {
    event.stopPropagation();
    fetch(`http://localhost:8080/questor/courses/deleteCourse/${courseId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete course");
        }
        setCourses(courses.filter((course) => course.courseId !== courseId));
      })
      .catch((error) => console.error("Error deleting course:", error));
  };

  const handleSave = () => {
    const isNewCourse = selectedCourse.courseId === null;
    const endpoint = isNewCourse
      ? "/questor/courses/addCourse"
      : `/questor/courses/updateById/${selectedCourse.courseId}`;
    const method = isNewCourse ? "POST" : "PUT";

    const courseToSave = { ...selectedCourse };
    if (isNewCourse) {
      delete courseToSave.courseId; // Ensure courseId is not sent for new course
    }

    fetch(`http://localhost:8080${endpoint}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(courseToSave),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save course");
        }
        return response.json();
      })
      .then((data) => {
        setIsModalOpen(false);
        fetchCourses();
      })
      .catch((error) => console.error("Error saving course:", error));
  };

  const handleSort = (key) => {
    const order =
      sortCriteria.key === key && sortCriteria.order === "asc" ? "desc" : "asc";
    const sortedCourses = [...courses].sort((a, b) => {
      if (a[key] < b[key]) return order === "asc" ? -1 : 1;
      if (a[key] > b[key]) return order === "asc" ? 1 : -1;
      return 0;
    });
    setCourses(sortedCourses);
    setSortCriteria({ key, order });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCourseClick = (courseId) => {
    navigate(`/admin/course/${courseId}`);
  };

  return (
    <>
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg flex items-center justify-between mb-8">
        <AdminGreeting userId={parseInt(userId)} />
      </div>
      <div className="bg-black min-h-screen flex flex-col text-white">
        <div className="p-8">
          <div className="flex justify-between mb-4">
            <h2 className="text-2xl font-bold">Course Management</h2>
            <button
              onClick={handleCreate}
              className="bg-gray-700 text-white py-2 px-4 rounded-full flex items-center"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Create Course
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {selectedCourses.map((course) => (
              <div
                key={course.courseId}
                className="bg-gray-800 rounded-lg p-4 cursor-pointer"
                onClick={() => handleCourseClick(course.courseId)}
              >
                {course.courseImage && (
                  <img
                    src={course.courseImage}
                    alt={course.courseName}
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                )}
                <h3 className="text-lg font-bold">{course.courseName}</h3>
                {/* <p className="text-sm">{course.description}</p> */}
                <div className="flex mt-2">
                  <button
                    onClick={(event) => handleEdit(course, event)}
                    className="bg-blue-600 text-white py-1 px-3 rounded-full mr-2"
                  >
                    <PencilAltIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(event) => handleDelete(course.courseId, event)}
                    className="bg-red-600 text-white py-1 px-3 rounded-full"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`mx-1 px-3 py-1 rounded-lg ${
                  currentPage === index + 1 ? "bg-indigo-600" : "bg-gray-600"
                } text-white`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4">
                  {selectedCourse.courseId ? "Edit Course" : "Create Course"}
                </h2>
                <form>
                  <div className="mb-4">
                    <label className="block mb-2">Course Name</label>
                    <input
                      type="text"
                      value={selectedCourse.courseName}
                      onChange={(e) =>
                        setSelectedCourse({
                          ...selectedCourse,
                          courseName: e.target.value,
                        })
                      }
                      className="w-full p-2 bg-gray-600 rounded-lg"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2">Description</label>
                    <textarea
                      value={selectedCourse.description}
                      onChange={(e) =>
                        setSelectedCourse({
                          ...selectedCourse,
                          description: e.target.value,
                        })
                      }
                      className="w-full p-2 bg-gray-600 rounded-lg"
                      required
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2">Duration</label>
                    <input
                      type="text"
                      value={selectedCourse.duration}
                      onChange={(e) =>
                        setSelectedCourse({
                          ...selectedCourse,
                          duration: e.target.value,
                        })
                      }
                      className="w-full p-2 bg-gray-600 rounded-lg"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2">Category</label>
                    <select
                      value={selectedCourse.categoryId || ""}
                      onChange={(e) =>
                        setSelectedCourse({
                          ...selectedCourse,
                          categoryId: e.target.value,
                        })
                      }
                      className="w-full p-2 bg-gray-600 rounded-lg"
                      required
                    >
                      <option value="" disabled>
                        Select Category
                      </option>
                      {categories.map((category) => (
                        <option
                          key={category.categoryId}
                          value={category.categoryId}
                        >
                          {category.categoryName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2">Course Image URL</label>
                    <input
                      type="text"
                      value={selectedCourse.courseImage}
                      onChange={(e) =>
                        setSelectedCourse({
                          ...selectedCourse,
                          courseImage: e.target.value,
                        })
                      }
                      className="w-full p-2 bg-gray-600 rounded-lg"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="bg-red-600 text-white py-2 px-4 rounded-lg mr-2"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSave}
                      className="bg-blue-600 text-white py-2 px-4 rounded-lg"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminCourseManagement;
