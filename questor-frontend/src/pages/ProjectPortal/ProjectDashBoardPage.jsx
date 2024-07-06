import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/solid";
import NavbarDynamic from "../../components/navbar/NavbarDynamic";
import ProjectBoardSideBar from "../../components/SideBar/ProjectBoardSideBar";
import ProjectUpdates from "../../components/ProjectSidePages/ProjectUpdates";
import HowToUse from "../../components/ProjectSidePages/HowToUse";
import TermsAndConditions from "../../components/ProjectSidePages/TermsAndConditions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProjectDashBoardPage = () => {
  const userId = sessionStorage.getItem("userId");
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editProjectId, setEditProjectId] = useState(null);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    status: "Pending", // Default status
    startDate: new Date().toISOString().split("T")[0], // Default start date (today)
  });

  const [isUpdatesOpen, setIsUpdatesOpen] = useState(false);
  const [isHowToUseOpen, setIsHowToUseOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteProjectId, setDeleteProjectId] = useState(null);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState("");

  const navbarLinks = [
    { name: "Home", url: "/userDashboard" },
    { name: "Project Portal", url: `/projects/${userId}` },
    { name: "Wishlist", url: `/wishlist/${userId}` },
    { name: "Contact Us", url: "/contactUs" },
  ];

  useEffect(() => {
    fetchProjects();
  }, [userId]);

  const fetchProjects = () => {
    fetch(`http://localhost:8080/questor/projects/user/${userId}`)
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => toast.error("Failed to fetch projects: " + error));
  };

  const handleCreateProject = () => {
    fetch(`http://localhost:8080/questor/projects/addProject`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newProject, userId: Number(userId) }), // Ensure userId is a Number
    })
      .then((response) => response.json())
      .then((createdProject) => {
        setProjects([...projects, createdProject]);
        setIsModalOpen(false);
        resetForm();
        toast.success("Project created successfully");
      })
      .catch((error) => toast.error("Failed to create project: " + error));
  };

  const handleUpdateProject = () => {
    fetch(`http://localhost:8080/questor/projects/update/${editProjectId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newProject, userId: Number(userId) }), // Include userId in the request body
    })
      .then((response) => response.json())
      .then((updatedProject) => {
        const updatedProjects = projects.map((project) =>
          project.projectId === editProjectId ? updatedProject : project
        );
        setProjects(updatedProjects);
        setIsModalOpen(false);
        resetForm();
        toast.success("Project updated successfully");
      })
      .catch((error) => toast.error("Failed to update project: " + error));
  };

  const handleDeleteProject = (projectId) => {
    setDeleteProjectId(projectId);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteProject = () => {
    if (deleteConfirmationText === "YES") {
      fetch(`http://localhost:8080/questor/projects/${deleteProjectId}`, {
        method: "DELETE",
      })
        .then(() => {
          const updatedProjects = projects.filter(
            (project) => project.projectId !== deleteProjectId
          );
          setProjects(updatedProjects);
          setIsDeleteModalOpen(false);
          setDeleteConfirmationText("");
          toast.success("Your project has been deleted");
        })
        .catch((error) => toast.error("Failed to delete project: " + error));
    } else {
      toast.error("You must type 'YES' to confirm.");
    }
  };

  const resetForm = () => {
    setNewProject({
      title: "",
      description: "",
      status: "Pending",
      startDate: new Date().toISOString().split("T")[0],
    });
    setIsEditing(false);
    setEditProjectId(null);
  };

  const handleEditProject = (projectId) => {
    const projectToEdit = projects.find(
      (project) => project.projectId === projectId
    );
    if (projectToEdit) {
      setNewProject({
        title: projectToEdit.title,
        description: projectToEdit.description,
        status: projectToEdit.status,
        startDate: projectToEdit.startDate.split("T")[0], // Format date for input
      });
      setIsEditing(true);
      setEditProjectId(projectId);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="bg-black min-h-screen flex flex-col text-white">
      <NavbarDynamic links={navbarLinks} />
      <div className="flex-grow flex flex-col lg:flex-row mt-28">
        <ProjectBoardSideBar
          userId={userId}
          onUpdatesClick={() => setIsUpdatesOpen(true)}
          onHowToUseClick={() => setIsHowToUseOpen(true)}
          onTermsClick={() => setIsTermsOpen(true)}
        />
        <div className="flex-grow flex flex-col m-4 space-y-4">
          <div className="bg-gray-800 p-8 rounded-xl shadow-lg flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Project Portal</h2>
              <span className="text-lg">
                List of Ongoing and Completed Projects
              </span>
            </div>
          </div>
          <div className="bg-gray-800 p-8 rounded-xl shadow-lg flex-grow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Projects</h3>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setIsModalOpen(true);
                }}
                className="bg-indigo-600 text-white py-2 px-4 rounded-full flex items-center"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Create New Project
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {projects.map((project) => (
                <div
                  key={project.projectId}
                  className="bg-gray-900 p-4 rounded-lg shadow-md"
                >
                  <div className="w-16 h-2 mb-4 bg-green-300 rounded-xl"></div>
                  <h4 className="text-lg font-bold">{project.title}</h4>
                  <p className="text-sm text-gray-400">{project.description}</p>
                  <p className="text-sm mt-2">Status: {project.status}</p>
                  <div className="flex space-x-2 mt-4">
                    <Link
                      to={`/project/${project.projectId}`}
                      className="text-indigo-400 inline-block"
                    >
                      View Project
                    </Link>
                    <button
                      onClick={() => handleEditProject(project.projectId)}
                      className="text-yellow-400 inline-block"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project.projectId)}
                      className="text-red-400 inline-block"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
            <h3 className="text-2xl font-bold mb-4">
              {isEditing ? "Edit Project" : "Create New Project"}
            </h3>
            <input
              type="text"
              value={newProject.title}
              onChange={(e) =>
                setNewProject({ ...newProject, title: e.target.value })
              }
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 mb-4"
              placeholder="Project Name"
            />
            <textarea
              value={newProject.description}
              onChange={(e) =>
                setNewProject({ ...newProject, description: e.target.value })
              }
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 mb-4"
              placeholder="Project Description"
            ></textarea>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Status
            </label>
            <select
              id="status"
              value={newProject.status}
              onChange={(e) =>
                setNewProject({ ...newProject, status: e.target.value })
              }
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 mb-4"
            >
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Pending">Pending</option>
            </select>
            <input
              type="date"
              value={newProject.startDate}
              onChange={(e) =>
                setNewProject({ ...newProject, startDate: e.target.value })
              }
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 mb-4"
              placeholder="Start Date"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  resetForm();
                }}
                className="bg-gray-600 text-white py-2 px-4 rounded-full"
              >
                Cancel
              </button>
              <button
                onClick={isEditing ? handleUpdateProject : handleCreateProject}
                className="bg-indigo-600 text-white py-2 px-4 rounded-full"
              >
                {isEditing ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
            <h3 className="text-2xl font-bold mb-4">Confirm Delete</h3>
            <p className="mb-4">
              Type "YES" below to confirm you want to delete this project.
            </p>
            <input
              type="text"
              value={deleteConfirmationText}
              onChange={(e) => setDeleteConfirmationText(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 mb-4"
              placeholder='Type "YES" to confirm'
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setDeleteConfirmationText("");
                }}
                className="bg-gray-600 text-white py-2 px-4 rounded-full"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteProject}
                className="bg-red-600 text-white py-2 px-4 rounded-full"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <ProjectUpdates
        isOpen={isUpdatesOpen}
        onClose={() => setIsUpdatesOpen(false)}
      />
      <HowToUse
        isOpen={isHowToUseOpen}
        onClose={() => setIsHowToUseOpen(false)}
      />
      <TermsAndConditions
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
      />
    </div>
  );
};

export default ProjectDashBoardPage;
