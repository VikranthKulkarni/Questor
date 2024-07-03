import React, { useState, useEffect } from "react";
import { SortAscendingIcon, SortDescendingIcon } from "@heroicons/react/solid";
import AdminGreeting from "../../components/AdminGreeting/AdminGreeting";

const AdminTransactionManagement = () => {
  const userId = sessionStorage.getItem("userId");
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortCriteria, setSortCriteria] = useState({
    key: "transactionId",
    order: "asc",
  });

  const transactionsPerPage = 10;
  const totalPages = Math.ceil(transactions.length / transactionsPerPage);
  const startIndex = (currentPage - 1) * transactionsPerPage;
  const selectedTransactions = transactions.slice(
    startIndex,
    startIndex + transactionsPerPage
  );

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = () => {
    fetch("http://localhost:8080/transactions")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setTransactions(data))
      .catch((error) => console.error("Error fetching transactions:", error));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSort = (key) => {
    const order =
      sortCriteria.key === key && sortCriteria.order === "asc" ? "desc" : "asc";
    const sortedTransactions = [...transactions].sort((a, b) => {
      if (a[key] < b[key]) return order === "asc" ? -1 : 1;
      if (a[key] > b[key]) return order === "asc" ? 1 : -1;
      return 0;
    });
    setTransactions(sortedTransactions);
    setSortCriteria({ key, order });
  };

  return (
    <div className="bg-black min-h-screen flex flex-col text-white">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg flex items-center justify-between mb-8">
        <AdminGreeting userId={parseInt(userId)} />
      </div>
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">Transaction Management</h2>
        <table className="min-w-full bg-gray-800 rounded-lg">
          <thead>
            <tr>
              <th
                className="py-2 px-4 text-left cursor-pointer"
                onClick={() => handleSort("transactionId")}
              >
                ID{" "}
                {sortCriteria.key === "transactionId" &&
                  (sortCriteria.order === "asc" ? (
                    <SortAscendingIcon className="inline w-5 h-5" />
                  ) : (
                    <SortDescendingIcon className="inline w-5 h-5" />
                  ))}
              </th>
              <th
                className="py-2 px-4 text-left cursor-pointer"
                onClick={() => handleSort("subscriptionId")}
              >
                Subscription ID{" "}
                {sortCriteria.key === "subscriptionId" &&
                  (sortCriteria.order === "asc" ? (
                    <SortAscendingIcon className="inline w-5 h-5" />
                  ) : (
                    <SortDescendingIcon className="inline w-5 h-5" />
                  ))}
              </th>
              <th
                className="py-2 px-4 text-left cursor-pointer"
                onClick={() => handleSort("paymentDate")}
              >
                Payment Date{" "}
                {sortCriteria.key === "paymentDate" &&
                  (sortCriteria.order === "asc" ? (
                    <SortAscendingIcon className="inline w-5 h-5" />
                  ) : (
                    <SortDescendingIcon className="inline w-5 h-5" />
                  ))}
              </th>
              <th
                className="py-2 px-4 text-left cursor-pointer"
                onClick={() => handleSort("amount")}
              >
                Amount{" "}
                {sortCriteria.key === "amount" &&
                  (sortCriteria.order === "asc" ? (
                    <SortAscendingIcon className="inline w-5 h-5" />
                  ) : (
                    <SortDescendingIcon className="inline w-5 h-5" />
                  ))}
              </th>
              <th
                className="py-2 px-4 text-left cursor-pointer"
                onClick={() => handleSort("paymentMethod")}
              >
                Payment Method{" "}
                {sortCriteria.key === "paymentMethod" &&
                  (sortCriteria.order === "asc" ? (
                    <SortAscendingIcon className="inline w-5 h-5" />
                  ) : (
                    <SortDescendingIcon className="inline w-5 h-5" />
                  ))}
              </th>
            </tr>
          </thead>
          <tbody>
            {selectedTransactions.map((transaction) => (
              <tr
                key={transaction.transactionId}
                className="border-b border-gray-700"
              >
                <td className="py-2 px-4">{transaction.transactionId}</td>
                <td className="py-2 px-4">{transaction.subscriptionId}</td>
                <td className="py-2 px-4">
                  {
                    new Date(transaction.paymentDate)
                      .toISOString()
                      .split("T")[0]
                  }
                </td>
                <td className="py-2 px-4">{transaction.amount}</td>
                <td className="py-2 px-4">{transaction.paymentMethod}</td>
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

export default AdminTransactionManagement;
