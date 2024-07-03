import React, { useState, useEffect } from "react";
import { PencilAltIcon, TrashIcon, PlusIcon } from "@heroicons/react/solid";

const ContentManagement = ({ section }) => {
  const [contents, setContents] = useState([]);
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState({
    contentId: null,
    title: "",
    type: "",
    duration: "",
    description: "",
    url: "",
    sectionId: section.sectionId,
  });

  useEffect(() => {
    fetchSectionContents();
  }, [section]);

  const fetchSectionContents = () => {
    fetch(`http://localhost:8080/questor/contents/section/${section.sectionId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setContents(data))
      .catch((error) =>
        console.error("Error fetching section contents:", error)
      );
  };

  const handleEditContent = (content, event) => {
    event.stopPropagation();
    setSelectedContent(content);
    setIsContentModalOpen(true);
  };

  const handleCreateContent = () => {
    setSelectedContent({
      contentId: null,
      title: "",
      type: "",
      duration: "",
      description: "",
      url: "",
      sectionId: section.sectionId,
    });
    setIsContentModalOpen(true);
  };

  const handleDeleteContent = (contentId, event) => {
    event.stopPropagation();
    fetch(`http://localhost:8080/questor/contents/deleteContent/${contentId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete content");
        }
        setContents(
          contents.filter((content) => content.contentId !== contentId)
        );
      })
      .catch((error) => console.error("Error deleting content:", error));
  };

  const handleSaveContent = () => {
    const endpoint = selectedContent.contentId
      ? `/questor/contents/updateContentById/${selectedContent.contentId}`
      : "/questor/contents/addContent";
    const method = selectedContent.contentId ? "PUT" : "POST";

    fetch(`http://localhost:8080${endpoint}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedContent),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save content");
        }
        return response.json();
      })
      .then((savedContent) => {
        if (selectedContent.contentId) {
          setContents(
            contents.map((content) =>
              content.contentId === savedContent.contentId
                ? savedContent
                : content
            )
          );
        } else {
          setContents([...contents, savedContent]);
        }
        setIsContentModalOpen(false);
      })
      .catch((error) => console.error("Error saving content:", error));
  };

  const handleChangeContent = (e) => {
    const { name, value } = e.target;
    setSelectedContent({ ...selectedContent, [name]: value });
  };

  const renderContent = (content) => {
    switch (content.type) {
      case "Video":
        const videoId = content.url.split("v=")[1];
        const embedUrl = `https://www.youtube.com/embed/${videoId}`;
        return (
          <iframe
            className="w-full h-48"
            src={embedUrl}
            title={content.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        );
      case "Audio":
        return <audio controls className="w-full" src={content.url}></audio>;
      case "Image":
        return (
          <img
            className="w-full h-auto"
            src={content.url}
            alt={content.title}
          />
        );
      default:
        return <p>{content.description}</p>;
    }
  };

  return (
    <div className="w-full max-w-4xl mt-6 p-4 bg-gray-800 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">
          Content Management for {section.sectionName}
        </h3>
        <button
          onClick={handleCreateContent}
          className="bg-blue-600 text-white py-2 px-4 rounded-full flex items-center"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add new Content
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {contents.map((content) => (
          <div
            key={content.contentId}
            className="bg-indigo-500 rounded-lg p-4 shadow-lg flex flex-col justify-between cursor-pointer"
          >
            <div>
              <p className="text-lg font-bold">Title: {content.title}</p>
              <p className="text-sm">Type: {content.type}</p>
              {renderContent(content)}
            </div>
            <div className="flex justify-end mt-2">
              <button
                onClick={(event) => handleEditContent(content, event)}
                className="bg-blue-600 text-white py-1 px-2 rounded-full flex items-center mr-2"
              >
                <PencilAltIcon className="w-4 h-4 mr-1" />
                Edit
              </button>
              <button
                onClick={(event) =>
                  handleDeleteContent(content.contentId, event)
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

      {isContentModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">
              {selectedContent.contentId ? "Edit Content" : "Add Content"}
            </h2>
            <form>
              <div className="mb-4">
                <label className="block mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={selectedContent.title}
                  onChange={handleChangeContent}
                  className="w-full p-2 bg-gray-600 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Type</label>
                <select
                  name="type"
                  value={selectedContent.type}
                  onChange={handleChangeContent}
                  className="w-full p-2 bg-gray-600 rounded-lg"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Video">Video</option>
                  <option value="PDF">PDF</option>
                  <option value="Image">Image</option>
                  <option value="Audio">Audio</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Duration</label>
                <input
                  type="text"
                  name="duration"
                  value={selectedContent.duration}
                  onChange={handleChangeContent}
                  className="w-full p-2 bg-gray-600 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Description</label>
                <textarea
                  name="description"
                  value={selectedContent.description}
                  onChange={handleChangeContent}
                  className="w-full p-2 bg-gray-600 rounded-lg"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block mb-2">URL</label>
                <input
                  type="text"
                  name="url"
                  value={selectedContent.url}
                  onChange={handleChangeContent}
                  className="w-full p-2 bg-gray-600 rounded-lg"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsContentModalOpen(false)}
                  className="bg-red-600 text-white py-2 px-4 rounded-lg mr-2"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveContent}
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

export default ContentManagement;
