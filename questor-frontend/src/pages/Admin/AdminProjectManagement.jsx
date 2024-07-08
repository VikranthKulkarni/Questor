import React, { useState, useEffect } from "react";
import { SortAscendingIcon, SortDescendingIcon } from "@heroicons/react/solid";
import AdminGreeting from "../../components/AdminGreeting/AdminGreeting";

const AdminProjectManagement = () => {
  const userId = sessionStorage.getItem('userId')
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortCriteria, setSortCriteria] = useState({
    key: "projectId",
    order: "asc",
  });

  const projectsPerPage = 10;
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const selectedProjects = projects.slice(
    startIndex,
    startIndex + projectsPerPage
  );

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    fetch("http://localhost:8080/questor/projects")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error fetching projects:", error));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSort = (key) => {
    const order =
      sortCriteria.key === key && sortCriteria.order === "asc" ? "desc" : "asc";
    const sortedProjects = [...projects].sort((a, b) => {
      if (a[key] < b[key]) return order === "asc" ? -1 : 1;
      if (a[key] > b[key]) return order === "asc" ? 1 : -1;
      return 0;
    });
    setProjects(sortedProjects);
    setSortCriteria({ key, order });
  };

  return (
    <div className="bg-black min-h-screen flex flex-col text-white">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg flex items-center justify-between mb-8">
        <AdminGreeting userId={parseInt(userId)} />
      </div>
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">Project Management</h2>
        <table className="min-w-full bg-gray-800 rounded-lg">
          <thead>
            <tr>
              <th
                className="py-2 px-4 text-left cursor-pointer"
                onClick={() => handleSort("title")}
              >
                Title{" "}
                {sortCriteria.key === "title" &&
                  (sortCriteria.order === "asc" ? (
                    <SortAscendingIcon className="inline w-5 h-5" />
                  ) : (
                    <SortDescendingIcon className="inline w-5 h-5" />
                  ))}
              </th>
              <th
                className="py-2 px-4 text-left cursor-pointer"
                onClick={() => handleSort("description")}
              >
                Description{" "}
                {sortCriteria.key === "description" &&
                  (sortCriteria.order === "asc" ? (
                    <SortAscendingIcon className="inline w-5 h-5" />
                  ) : (
                    <SortDescendingIcon className="inline w-5 h-5" />
                  ))}
              </th>
              <th
                className="py-2 px-4 text-left cursor-pointer"
                onClick={() => handleSort("status")}
              >
                Status{" "}
                {sortCriteria.key === "status" &&
                  (sortCriteria.order === "asc" ? (
                    <SortAscendingIcon className="inline w-5 h-5" />
                  ) : (
                    <SortDescendingIcon className="inline w-5 h-5" />
                  ))}
              </th>
              <th
                className="py-2 px-4 text-left cursor-pointer"
                onClick={() => handleSort("startDate")}
              >
                Start Date{" "}
                {sortCriteria.key === "startDate" &&
                  (sortCriteria.order === "asc" ? (
                    <SortAscendingIcon className="inline w-5 h-5" />
                  ) : (
                    <SortDescendingIcon className="inline w-5 h-5" />
                  ))}
              </th>
              <th
                className="py-2 px-4 text-left cursor-pointer"
                onClick={() => handleSort("userId")}
              >
                User ID{" "}
                {sortCriteria.key === "userId" &&
                  (sortCriteria.order === "asc" ? (
                    <SortAscendingIcon className="inline w-5 h-5" />
                  ) : (
                    <SortDescendingIcon className="inline w-5 h-5" />
                  ))}
              </th>
            </tr>
          </thead>
          <tbody>
            {selectedProjects.map((project) => (
              <tr key={project.projectId} className="border-b border-gray-700">
                <td className="py-2 px-4">{project.title}</td>
                <td className="py-2 px-4">{project.description}</td>
                <td className="py-2 px-4">{project.status}</td>
                <td className="py-2 px-4">
                  {new Date(project.startDate).toISOString().split("T")[0]}
                </td>
                <td className="py-2 px-4">{project.userId}</td>
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
      </div>
    </div>
  );
};

export default AdminProjectManagement;
