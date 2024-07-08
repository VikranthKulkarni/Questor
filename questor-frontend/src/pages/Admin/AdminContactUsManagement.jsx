import React, { useState, useEffect } from "react";
import { SortAscendingIcon, SortDescendingIcon } from "@heroicons/react/solid";
import AdminGreeting from "../../components/AdminGreeting/AdminGreeting";

const AdminContactUsManagement = () => {
  const userId = sessionStorage.getItem('userId');
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortCriteria, setSortCriteria] = useState({
    key: "id",
    order: "asc",
  });

  const contactsPerPage = 10;
  const totalPages = Math.ceil(contacts.length / contactsPerPage);
  const startIndex = (currentPage - 1) * contactsPerPage;
  const selectedContacts = contacts.slice(
    startIndex,
    startIndex + contactsPerPage
  );

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = () => {
    fetch("http://localhost:8080/questor/contactus/details")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setContacts(data))
      .catch((error) => console.error("Error fetching contacts:", error));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSort = (key) => {
    const order =
      sortCriteria.key === key && sortCriteria.order === "asc" ? "desc" : "asc";
    const sortedContacts = [...contacts].sort((a, b) => {
      if (a[key] < b[key]) return order === "asc" ? -1 : 1;
      if (a[key] > b[key]) return order === "asc" ? 1 : -1;
      return 0;
    });
    setContacts(sortedContacts);
    setSortCriteria({ key, order });
  };

  return (
    <div className="bg-black min-h-screen flex flex-col text-white">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg flex items-center justify-between mb-8">
        <AdminGreeting userId={parseInt(userId)} />
      </div>
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">Contact Us Management</h2>
        <table className="min-w-full bg-gray-800 rounded-lg">
          <thead>
            <tr>
              <th
                className="py-2 px-4 text-left cursor-pointer"
                onClick={() => handleSort("firstName")}
              >
                First Name{" "}
                {sortCriteria.key === "firstName" &&
                  (sortCriteria.order === "asc" ? (
                    <SortAscendingIcon className="inline w-5 h-5" />
                  ) : (
                    <SortDescendingIcon className="inline w-5 h-5" />
                  ))}
              </th>
              <th
                className="py-2 px-4 text-left cursor-pointer"
                onClick={() => handleSort("lastName")}
              >
                Last Name{" "}
                {sortCriteria.key === "lastName" &&
                  (sortCriteria.order === "asc" ? (
                    <SortAscendingIcon className="inline w-5 h-5" />
                  ) : (
                    <SortDescendingIcon className="inline w-5 h-5" />
                  ))}
              </th>
              <th
                className="py-2 px-4 text-left cursor-pointer"
                onClick={() => handleSort("email")}
              >
                Email{" "}
                {sortCriteria.key === "email" &&
                  (sortCriteria.order === "asc" ? (
                    <SortAscendingIcon className="inline w-5 h-5" />
                  ) : (
                    <SortDescendingIcon className="inline w-5 h-5" />
                  ))}
              </th>
              <th
                className="py-2 px-4 text-left cursor-pointer"
                onClick={() => handleSort("phoneNumber")}
              >
                Phone Number{" "}
                {sortCriteria.key === "phoneNumber" &&
                  (sortCriteria.order === "asc" ? (
                    <SortAscendingIcon className="inline w-5 h-5" />
                  ) : (
                    <SortDescendingIcon className="inline w-5 h-5" />
                  ))}
              </th>
              <th
                className="py-2 px-4 text-left cursor-pointer"
                onClick={() => handleSort("message")}
              >
                Message{" "}
                {sortCriteria.key === "message" &&
                  (sortCriteria.order === "asc" ? (
                    <SortAscendingIcon className="inline w-5 h-5" />
                  ) : (
                    <SortDescendingIcon className="inline w-5 h-5" />
                  ))}
              </th>
            </tr>
          </thead>
          <tbody>
            {selectedContacts.map((contact) => (
              <tr key={contact.id} className="border-b border-gray-700">
                <td className="py-2 px-4">{contact.firstName}</td>
                <td className="py-2 px-4">{contact.lastName}</td>
                <td className="py-2 px-4">{contact.email}</td>
                <td className="py-2 px-4">{contact.phoneNumber}</td>
                <td className="py-2 px-4">{contact.message}</td>
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

export default AdminContactUsManagement;
