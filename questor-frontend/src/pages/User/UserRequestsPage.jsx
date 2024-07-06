import React, { useEffect, useState } from "react";
import NavbarDynamic from "../../components/navbar/NavbarDynamic";
import Fotter from "../../components/footer/Fotter";

const UserRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/questor/courseRequests/byUser/${userId}`
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        setRequests(data);
      } else {
        console.error("Unexpected response format:", data);
        setRequests([]);
      }
    } catch (error) {
      console.error("Error fetching course requests:", error);
      setRequests([]);
    }
  };

  const navbarLinks = [
    { name: "Home", url: "/userDashboard" },
    { name: "Project Portal", url: `/projects/${userId}` },
    { name: "Wishlist", url: `/wishlist/${userId}` },
    { name: "Contact Us", url: "/contactUs" },
    { name: "My Requests", url: `/userRequests/${userId}` },
  ];

  return (
    <div className="bg-black min-h-screen flex flex-col text-white">
      <div style={{ zIndex: "9999999" }}>
        <NavbarDynamic links={navbarLinks} />
      </div>
      <div className="flex-grow w-full flex justify-center items-center mt-8 md:mt-32">
        <div className="mx-auto w-full md:w-3/4 p-4 mt-10">
          <h1 className="text-4xl font-bold mb-8 text-center md:text-left">
            My Course Requests
          </h1>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-700 rounded-lg">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-600 text-left">
                    Course Name
                  </th>
                  <th className="py-2 px-4 border-b border-gray-600 text-left">
                    Description
                  </th>
                  <th className="py-2 px-4 border-b border-gray-600 text-left">
                    Category
                  </th>
                  <th className="py-2 px-4 border-b border-gray-600 text-left">
                    Justification
                  </th>
                  <th className="py-2 px-4 border-b border-gray-600 text-left">
                    Requested Date
                  </th>
                  <th className="py-2 px-4 border-b border-gray-600 text-left">
                    Status
                  </th>
                  <th className="py-2 px-4 border-b border-gray-600 text-left">
                    Admin Comments
                  </th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr key={request.requestId}>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Footer Section */}
          <Fotter />
        </div>
      </div>
    </div>
  );
};

export default UserRequestsPage;
