import React, { useState, useEffect } from "react";
import { PencilAltIcon, TrashIcon, PlusIcon } from "@heroicons/react/solid";

const SectionManagement = ({ courseId, onSectionClick }) => {
  const [sections, setSections] = useState([]);
  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState({
    sectionId: null,
    sectionName: "",
    description: "",
  });

  useEffect(() => {
    fetchCourseSections();
  }, [courseId]);

  const fetchCourseSections = () => {
    fetch(`http://localhost:8080/questor/sections/course/${courseId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setSections(data))
      .catch((error) =>
        console.error("Error fetching course sections:", error)
      );
  };

  const handleEditSection = (section, event) => {
    event.stopPropagation();
    setSelectedSection(section);
    setIsSectionModalOpen(true);
  };

  const handleCreateSection = () => {
    setSelectedSection({
      sectionId: null,
      sectionName: "",
      description: "",
    });
    setIsSectionModalOpen(true);
  };

  const handleDeleteSection = (sectionId, event) => {
    event.stopPropagation();
    fetch(`http://localhost:8080/questor/sections/deleteSection/${sectionId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete section");
        }
        setSections(
          sections.filter((section) => section.sectionId !== sectionId)
        );
      })
      .catch((error) => console.error("Error deleting section:", error));
  };

  const handleSaveSection = () => {
    const endpoint = selectedSection.sectionId
      ? `/questor/sections/updateSection`
      : "/questor/sections/addSection";
    const method = "POST";

    fetch(`http://localhost:8080${endpoint}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...selectedSection, courseId }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save section");
        }
        return response.json();
      })
      .then((savedSection) => {
        if (selectedSection.sectionId) {
          setSections(
            sections.map((section) =>
              section.sectionId === savedSection.sectionId
                ? savedSection
                : section
            )
          );
        } else {
          setSections([...sections, savedSection]);
        }
        setIsSectionModalOpen(false);
      })
      .catch((error) => console.error("Error saving section:", error));
  };

  const handleChangeSection = (e) => {
    const { name, value } = e.target;
    setSelectedSection({ ...selectedSection, [name]: value });
  };

  return (
    <div className="w-full max-w-4xl mt-6 p-4 bg-gray-800 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Section Management:</h3>
        <button
          onClick={handleCreateSection}
          className="bg-blue-600 text-white py-2 px-4 rounded-full flex items-center"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add new Section
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {sections.map((section) => (
          <div
            key={section.sectionId}
            className="bg-teal-500 rounded-lg p-4 shadow-lg flex flex-col justify-between cursor-pointer"
            onClick={() => onSectionClick(section)}
          >
            <div>
              <p className="text-lg font-bold">
                Section Name: {section.sectionName}
              </p>
              <p className="text-sm">Description: {section.description}</p>
            </div>
            <div className="flex justify-end mt-2">
              <button
                onClick={(event) => handleEditSection(section, event)}
                className="bg-blue-600 text-white py-1 px-2 rounded-full flex items-center mr-2"
              >
                <PencilAltIcon className="w-4 h-4 mr-1" />
                Edit
              </button>
              <button
                onClick={(event) =>
                  handleDeleteSection(section.sectionId, event)
                }
                className="bg-red-600 text-white py-1 px-2 rounded-full flex items-center"
              >
                <TrashIcon className="w-4 h-4 mr-1" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isSectionModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">
              {selectedSection.sectionId ? "Edit Section" : "Add Section"}
            </h2>
            <form>
              <div className="mb-4">
                <label className="block mb-2">Section Name</label>
                <input
                  type="text"
                  name="sectionName"
                  value={selectedSection.sectionName}
                  onChange={handleChangeSection}
                  className="w-full p-2 bg-gray-600 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Description</label>
                <textarea
                  name="description"
                  value={selectedSection.description}
                  onChange={handleChangeSection}
                  className="w-full p-2 bg-gray-600 rounded-lg"
                  required
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsSectionModalOpen(false)}
                  className="bg-red-600 text-white py-2 px-4 rounded-lg mr-2"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveSection}
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
  );
};

export default SectionManagement;
