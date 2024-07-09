import React, { useState, useEffect } from "react";
import {
  PencilAltIcon,
  TrashIcon,
  SortAscendingIcon,
  SortDescendingIcon,
  PlusIcon,
} from "@heroicons/react/solid";
import AdminGreeting from "../../components/AdminGreeting/AdminGreeting";

const AdminUpcomingCoursesManagementPage = () => {
  const userId = sessionStorage.getItem("userId");
  const [upcomingCourses, setUpcomingCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState({
    upcomingCourseId: null,
    courseName: "",
    description: "",
    expectedDuration: "",
    categoryId: null,
    promotionalImage: "",
    expectedReleaseDate: "",
    status: "",
    prerequisites: "",
    promotionalDescription: "",
  });
  const [sortCriteria, setSortCriteria] = useState({
    key: "courseName",
    order: "asc",
  });

  const coursesPerPage = 10;
  const totalPages = Math.ceil(upcomingCourses.length / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const selectedCourses = upcomingCourses.slice(
    startIndex,
    startIndex + coursesPerPage
  );

  useEffect(() => {
    fetchUpcomingCourses();
    fetchCategories();
  }, []);

  const fetchUpcomingCourses = () => {
    fetch(
      "http://localhost:8080/questor/upcoming-courses/getAllUpcomingCourses"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setUpcomingCourses(data))
      .catch((error) =>
        console.error("Error fetching upcoming courses:", error)
      );
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

  const handleEdit = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedCourse({
      upcomingCourseId: null,
      courseName: "",
      description: "",
      expectedDuration: "",
      categoryId: null,
      promotionalImage: "",
      expectedReleaseDate: "",
      status: "",
      prerequisites: "",
      promotionalDescription: "",
    });
    setIsModalOpen(true);
  };

  const handleDelete = (courseId) => {
    fetch(
      `http://localhost:8080/questor/upcoming-courses/deleteUpcomingCourse/${courseId}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete upcoming course");
        }
        setUpcomingCourses(
          upcomingCourses.filter(
            (course) => course.upcomingCourseId !== courseId
          )
        );
      })
      .catch((error) =>
        console.error("Error deleting upcoming course:", error)
      );
  };

  const handleSave = () => {
    const endpoint = selectedCourse.upcomingCourseId
      ? `/questor/upcoming-courses/updateUpcomingCourseById/${selectedCourse.upcomingCourseId}`
      : "/questor/upcoming-courses/addUpcomingCourse";
    const method = selectedCourse.upcomingCourseId ? "PUT" : "POST";

    fetch(`http://localhost:8080${endpoint}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedCourse),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save upcoming course");
        }
        setIsModalOpen(false);
        fetchUpcomingCourses();
      })
      .catch((error) => console.error("Error saving upcoming course:", error));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSort = (key) => {
    const order =
      sortCriteria.key === key && sortCriteria.order === "asc" ? "desc" : "asc";
    const sortedCourses = [...upcomingCourses].sort((a, b) => {
      if (a[key] < b[key]) return order === "asc" ? -1 : 1;
      if (a[key] > b[key]) return order === "asc" ? 1 : -1;
      return 0;
    });
    setUpcomingCourses(sortedCourses);
    setSortCriteria({ key, order });
  };

  const formatDate = (date) => {
    return date ? new Date(date).toISOString().split("T")[0] : "";
  };

  return (
    <div className="bg-black min-h-screen flex flex-col text-white">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg flex items-center justify-between mb-8">
        <AdminGreeting userId={parseInt(userId)} />
      </div>
      <div className="p-8">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold">Upcoming Courses Management</h2>
          <div className="flex space-x-2">
            <button
              onClick={handleCreate}
              className="bg-gray-700 text-white py-2 px-4 rounded-full flex items-center"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Create Upcoming Course
            </button>
          </div>
        </div>
        <table className="min-w-full bg-gray-800 rounded-lg">
          <thead>
            <tr>
              <th
                className="py-2 px-4 text-left cursor-pointer"
                onClick={() => handleSort("courseName")}
              >
                Course Name{" "}
                {sortCriteria.key === "courseName" &&
                  (sortCriteria.order === "asc" ? (
                    <SortAscendingIcon className="inline w-5 h-5" />
                  ) : (
                    <SortDescendingIcon className="inline w-5 h-5" />
                  ))}
              </th>
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {selectedCourses.map((course) => (
              <tr
                key={course.upcomingCourseId}
                className="border-b border-gray-700"
              >
                <td className="py-2 px-4">{course.courseName}</td>
                <td className="py-2 px-4 text-center">
                  <button
                    onClick={() => handleEdit(course)}
                    className="bg-blue-600 text-white py-1 px-3 rounded-full mr-2"
                  >
                    <PencilAltIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(course.upcomingCourseId)}
                    className="bg-red-600 text-white py-1 px-3 rounded-full"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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
                {selectedCourse.upcomingCourseId
                  ? "Edit Upcoming Course"
                  : "Create Upcoming Course"}
              </h2>
              <form>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
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
                  <div>
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
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block mb-2">Expected Duration</label>
                    <input
                      type="text"
                      value={selectedCourse.expectedDuration}
                      onChange={(e) =>
                        setSelectedCourse({
                          ...selectedCourse,
                          expectedDuration: e.target.value,
                        })
                      }
                      className="w-full p-2 bg-gray-600 rounded-lg"
                      required
                    />
                  </div>
                  <div>
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
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block mb-2">Promotional Image</label>
                    <input
                      type="text"
                      value={selectedCourse.promotionalImage}
                      onChange={(e) =>
                        setSelectedCourse({
                          ...selectedCourse,
                          promotionalImage: e.target.value,
                        })
                      }
                      className="w-full p-2 bg-gray-600 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Expected Release Date</label>
                    <input
                      type="date"
                      value={formatDate(selectedCourse.expectedReleaseDate)}
                      onChange={(e) =>
                        setSelectedCourse({
                          ...selectedCourse,
                          expectedReleaseDate: new Date(e.target.value),
                        })
                      }
                      className="w-full p-2 bg-gray-600 rounded-lg"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block mb-2">Status</label>
                    <input
                      type="text"
                      value={selectedCourse.status}
                      onChange={(e) =>
                        setSelectedCourse({
                          ...selectedCourse,
                          status: e.target.value,
                        })
                      }
                      className="w-full p-2 bg-gray-600 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Prerequisites</label>
                    <textarea
                      value={selectedCourse.prerequisites}
                      onChange={(e) =>
                        setSelectedCourse({
                          ...selectedCourse,
                          prerequisites: e.target.value,
                        })
                      }
                      className="w-full p-2 bg-gray-600 rounded-lg"
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Promotional Description</label>
                  <textarea
                    value={selectedCourse.promotionalDescription}
                    onChange={(e) =>
                      setSelectedCourse({
                        ...selectedCourse,
                        promotionalDescription: e.target.value,
                      })
                    }
                    className="w-full p-2 bg-gray-600 rounded-lg"
                    required
                  ></textarea>
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
  );
};

export default AdminUpcomingCoursesManagementPage;
