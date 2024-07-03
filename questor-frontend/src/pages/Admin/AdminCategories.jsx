import React, { useState, useEffect } from "react";
import {
  PencilAltIcon,
  TrashIcon,
  SortAscendingIcon,
  SortDescendingIcon,
  PlusIcon,
} from "@heroicons/react/solid";
import AdminGreeting from "../../components/AdminGreeting/AdminGreeting";

const AdminCategories = () => {
  const userId = sessionStorage.getItem('userId');
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({
    categoryId: null,
    categoryName: "",
  });
  const [sortCriteria, setSortCriteria] = useState({
    key: "categoryId",
    order: "asc",
  });

  const categoriesPerPage = 10;
  const totalPages = Math.ceil(categories.length / categoriesPerPage);
  const startIndex = (currentPage - 1) * categoriesPerPage;
  const selectedCategories = categories.slice(
    startIndex,
    startIndex + categoriesPerPage
  );

  useEffect(() => {
    fetchCategories();
  }, []);

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

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedCategory({ categoryId: null, categoryName: "" });
    setIsModalOpen(true);
  };

  const handleDelete = (categoryId) => {
    fetch(
      `http://localhost:8080/questor/categories/deleteCategory/${categoryId}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete category");
        }
        setCategories(
          categories.filter((category) => category.categoryId !== categoryId)
        );
      })
      .catch((error) => console.error("Error deleting category:", error));
  };

  const handleSave = () => {
    const endpoint = selectedCategory.categoryId
      ? `/questor/categories/updateById/${selectedCategory.categoryId}`
      : "/questor/categories/addCategory";
    const method = selectedCategory.categoryId ? "PUT" : "POST";

    fetch(`http://localhost:8080${endpoint}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedCategory),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save category");
        }
        setIsModalOpen(false);
        fetchCategories();
      })
      .catch((error) => console.error("Error saving category:", error));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSort = (key) => {
    const order =
      sortCriteria.key === key && sortCriteria.order === "asc" ? "desc" : "asc";
    const sortedCategories = [...categories].sort((a, b) => {
      if (a[key] < b[key]) return order === "asc" ? -1 : 1;
      if (a[key] > b[key]) return order === "asc" ? 1 : -1;
      return 0;
    });
    setCategories(sortedCategories);
    setSortCriteria({ key, order });
  };

  return (
    <div className="bg-black min-h-screen flex flex-col text-white">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg flex items-center justify-between mb-8">
        <AdminGreeting userId={parseInt(userId)} />
      </div>
      <div className="p-8">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold">Category Management</h2>
          <div className="flex space-x-2">
            <button
              onClick={handleCreate}
              className="bg-gray-700 text-white py-2 px-4 rounded-full flex items-center"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Create Category
            </button>
          </div>
        </div>
        <table className="min-w-full bg-gray-800 rounded-lg">
          <thead>
            <tr>
              <th
                className="py-2 px-4 text-left cursor-pointer"
                onClick={() => handleSort("categoryName")}
              >
                Category Name{" "}
                {sortCriteria.key === "categoryName" &&
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
            {selectedCategories.map((category) => (
              <tr
                key={category.categoryId}
                className="border-b border-gray-700"
              >
                <td className="py-2 px-4">{category.categoryName}</td>
                <td className="py-2 px-4 text-center">
                  <button
                    onClick={() => handleEdit(category)}
                    className="bg-blue-600 text-white py-1 px-3 rounded-full mr-2"
                  >
                    <PencilAltIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(category.categoryId)}
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
                {selectedCategory.categoryId
                  ? "Edit Category"
                  : "Create Category"}
              </h2>
              <form>
                <div className="mb-4">
                  <label className="block mb-2">Category Name</label>
                  <input
                    type="text"
                    value={selectedCategory.categoryName}
                    onChange={(e) =>
                      setSelectedCategory({
                        ...selectedCategory,
                        categoryName: e.target.value,
                      })
                    }
                    className="w-full p-2 bg-gray-600 rounded-lg"
                    required
                  />
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

export default AdminCategories;
