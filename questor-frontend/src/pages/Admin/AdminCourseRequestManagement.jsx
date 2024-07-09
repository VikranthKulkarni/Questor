import React, { useEffect, useState } from "react";
import AdminGreeting from "../../components/AdminGreeting/AdminGreeting";

const AdminCourseRequestManagement = () => {
  const userId = sessionStorage.getItem("userId");
  const [courseRequests, setCourseRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [adminComments, setAdminComments] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchCourseRequests();
  }, []);

  const fetchCourseRequests = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/questor/courseRequests"
      );
      const data = await response.json();
      setCourseRequests(data);
    } catch (error) {
      console.error("Error fetching course requests:", error);
    }
  };

  const handleSelectRequest = (request) => {
    setSelectedRequest(request);
    setAdminComments(request.adminComments);
    setStatus(request.status);
  };

  const handleUpdateRequest = async () => {
    if (!selectedRequest) return;

    const updatedRequest = {
      ...selectedRequest,
      adminComments,
      status,
    };

    try {
      const response = await fetch(
        `http://localhost:8080/questor/courseRequests/update/${selectedRequest.requestId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedRequest),
        }
      );

      if (response.ok) {
        fetchCourseRequests();
        setSelectedRequest(null);
        setAdminComments("");
        setStatus("");
      } else {
        console.error("Error updating course request");
      }
    } catch (error) {
      console.error("Error updating course request:", error);
    }
  };

  return (
    <div className="bg-black min-h-screen flex flex-col text-white">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg flex items-center justify-between mb-8">
        <AdminGreeting userId={parseInt(userId)} />
      </div>
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-8">Course Requests Management</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-700 rounded-lg">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-600">
                  Course Name
                </th>
                <th className="py-2 px-4 border-b border-gray-600">
                  Description
                </th>
                <th className="py-2 px-4 border-b border-gray-600">Category</th>
                <th className="py-2 px-4 border-b border-gray-600">
                  Justification
                </th>
                <th className="py-2 px-4 border-b border-gray-600">
                  Requested Date
                </th>
                <th className="py-2 px-4 border-b border-gray-600">Status</th>
                <th className="py-2 px-4 border-b border-gray-600">
                  Admin Comments
                </th>
                <th className="py-2 px-4 border-b border-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courseRequests.map((request) => (
                <tr
                  key={request.requestId}
                  className={
                    selectedRequest?.requestId === request.requestId
                      ? "bg-gray-600"
                      : ""
                  }
                >
                  <td className="py-2 px-4 border-b border-gray-600">
                    {request.courseName}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-600">
                    {request.courseDescription}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-600">
                    {request.category}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-600">
                    {request.justification}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-600">
                    {new Date(request.requestedDate).toLocaleDateString()}
                  </td>
                  <td
                    className={`py-2 px-4 border-b border-gray-600 ${
                      request.status === "Pending"
                        ? "text-yellow-500"
                        : request.status === "Approved"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {request.status}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-600">
                    {request.adminComments}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-600">
                    <button
                      onClick={() => handleSelectRequest(request)}
                      className="bg-blue-500 text-white px-2 py-1 rounded-md"
                    >
                      Select
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedRequest && (
          <div className="bg-gray-800 p-4 rounded-lg mt-8">
            <h2 className="text-2xl mb-4">Update Request</h2>
            <div className="mb-4">
              <label className="block text-white mb-2">Admin Comments</label>
              <textarea
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md"
                value={adminComments}
                onChange={(e) => setAdminComments(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2">Status</label>
              <select
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Denied">Denied</option>
              </select>
            </div>
            <button
              onClick={handleUpdateRequest}
              className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
              Update Request
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCourseRequestManagement;
