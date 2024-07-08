import React, { useState, useEffect } from "react";
import { SortAscendingIcon, SortDescendingIcon } from "@heroicons/react/solid";
import AdminGreeting from "../../components/AdminGreeting/AdminGreeting";

const AdminSubscriptionManagement = () => {
  const userId = sessionStorage.getItem("userId");
  const [subscriptions, setSubscriptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortCriteria, setSortCriteria] = useState({
    key: "subscriptionId",
    order: "asc",
  });

  const subscriptionsPerPage = 10;
  const totalPages = Math.ceil(subscriptions.length / subscriptionsPerPage);
  const startIndex = (currentPage - 1) * subscriptionsPerPage;
  const selectedSubscriptions = subscriptions.slice(
    startIndex,
    startIndex + subscriptionsPerPage
  );

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = () => {
    fetch("http://localhost:8080/subscriptions")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setSubscriptions(data))
      .catch((error) => console.error("Error fetching subscriptions:", error));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSort = (key) => {
    const order =
      sortCriteria.key === key && sortCriteria.order === "asc" ? "desc" : "asc";
    const sortedSubscriptions = [...subscriptions].sort((a, b) => {
      if (a[key] < b[key]) return order === "asc" ? -1 : 1;
      if (a[key] > b[key]) return order === "asc" ? 1 : -1;
      return 0;
    });
    setSubscriptions(sortedSubscriptions);
    setSortCriteria({ key, order });
  };

  return (
    <div className="bg-black min-h-screen flex flex-col text-white">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg flex items-center justify-between mb-8">
        <AdminGreeting userId={parseInt(userId)} />
      </div>
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">Subscription Management</h2>
        <table className="min-w-full bg-gray-800 rounded-lg">
          <thead>
            <tr>
              <th
                className="py-2 px-4 text-left cursor-pointer"
                onClick={() => handleSort("subscriptionId")}
              >
                ID{" "}
                {sortCriteria.key === "subscriptionId" &&
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
              <th
                className="py-2 px-4 text-left cursor-pointer"
                onClick={() => handleSort("planDetails")}
              >
                Plan{" "}
                {sortCriteria.key === "planDetails" &&
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
                onClick={() => handleSort("endDate")}
              >
                End Date{" "}
                {sortCriteria.key === "endDate" &&
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
            </tr>
          </thead>
          <tbody>
            {selectedSubscriptions.map((subscription) => (
              <tr
                key={subscription.subscriptionId}
                className="border-b border-gray-700"
              >
                <td className="py-2 px-4">{subscription.subscriptionId}</td>
                <td className="py-2 px-4">{subscription.userId}</td>
                <td className="py-2 px-4">{subscription.planDetails}</td>
                <td className="py-2 px-4">
                  {new Date(subscription.startDate).toISOString().split("T")[0]}
                </td>
                <td className="py-2 px-4">
                  {new Date(subscription.endDate).toISOString().split("T")[0]}
                </td>
                <td className="py-2 px-4">{subscription.status}</td>
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

export default AdminSubscriptionManagement;
