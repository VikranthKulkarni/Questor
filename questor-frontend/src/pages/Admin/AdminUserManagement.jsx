import React, { useState, useEffect } from 'react';
import { PencilAltIcon, TrashIcon, SortAscendingIcon, SortDescendingIcon } from '@heroicons/react/solid';
import AdminGreeting from '../../components/AdminGreeting/AdminGreeting';

const AdminUserManagement = () => {
  const userId = sessionStorage.getItem('userId')
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({
    userId: null,
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dob: '',
    bio: '',
    imageUrl: '',
  });
  const [sortCriteria, setSortCriteria] = useState({ key: 'userId', order: 'asc' });

  const usersPerPage = 10;
  const totalPages = Math.ceil(users.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const selectedUsers = users.slice(startIndex, startIndex + usersPerPage);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    fetch('http://localhost:8080/questor/user')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = (userId) => {
    fetch(`http://localhost:8080/questor/user/${userId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete user');
        }
        setUsers(users.filter(user => user.userId !== userId));
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  const handleSave = () => {
    const endpoint = selectedUser.userId ? `/questor/user/update/${selectedUser.userId}` : '/questor/user/saveUser';
    const method = selectedUser.userId ? 'PUT' : 'POST';

    fetch(`http://localhost:8080${endpoint}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedUser),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to save user');
        }
        setIsModalOpen(false);
        fetchUsers();
      })
      .catch(error => console.error('Error saving user:', error));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSort = (key) => {
    const order = sortCriteria.key === key && sortCriteria.order === 'asc' ? 'desc' : 'asc';
    const sortedUsers = [...users].sort((a, b) => {
      if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
      return 0;
    });
    setUsers(sortedUsers);
    setSortCriteria({ key, order });
  };

  return (
    <div className="bg-black min-h-screen flex flex-col text-white">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg flex items-center justify-between mb-8">
        <AdminGreeting userId={parseInt(userId)} />
      </div>
      <div className="p-8">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold">User Management</h2>
        </div>
        <table className="min-w-full bg-gray-800 rounded-lg">
          <thead>
            <tr>
              <th
                className="py-2 px-4 text-left cursor-pointer"
                onClick={() => handleSort("userName")}
              >
                Username{" "}
                {sortCriteria.key === "userName" &&
                  (sortCriteria.order === "asc" ? (
                    <SortAscendingIcon className="inline w-5 h-5" />
                  ) : (
                    <SortDescendingIcon className="inline w-5 h-5" />
                  ))}
              </th>
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
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {selectedUsers.map((user) => (
              <tr key={user.userId} className="border-b border-gray-700">
                <td className="py-2 px-4">{user.userName}</td>
                <td className="py-2 px-4">{user.firstName}</td>
                <td className="py-2 px-4">{user.lastName}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">{user.userId}</td>
                <td className="py-2 px-4 text-center">
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-blue-600 text-white py-1 px-3 rounded-full mr-2"
                  >
                    <PencilAltIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(user.userId)}
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
                {selectedUser.userId ? "Edit User" : "Create User"}
              </h2>
              <form>
                <div className="mb-4">
                  <label className="block mb-2">Username</label>
                  <input
                    type="text"
                    value={selectedUser.userName}
                    onChange={(e) =>
                      setSelectedUser({
                        ...selectedUser,
                        userName: e.target.value,
                      })
                    }
                    className="w-full p-2 bg-gray-600 rounded-lg"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">First Name</label>
                  <input
                    type="text"
                    value={selectedUser.firstName}
                    onChange={(e) =>
                      setSelectedUser({
                        ...selectedUser,
                        firstName: e.target.value,
                      })
                    }
                    className="w-full p-2 bg-gray-600 rounded-lg"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Last Name</label>
                  <input
                    type="text"
                    value={selectedUser.lastName}
                    onChange={(e) =>
                      setSelectedUser({
                        ...selectedUser,
                        lastName: e.target.value,
                      })
                    }
                    className="w-full p-2 bg-gray-600 rounded-lg"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Phone Number</label>
                  <input
                    type="text"
                    value={selectedUser.phoneNumber}
                    onChange={(e) =>
                      setSelectedUser({
                        ...selectedUser,
                        phoneNumber: e.target.value,
                      })
                    }
                    className="w-full p-2 bg-gray-600 rounded-lg"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Date of Birth</label>
                  <input
                    type="date"
                    value={
                      new Date(selectedUser.dob).toISOString().split("T")[0]
                    }
                    onChange={(e) =>
                      setSelectedUser({ ...selectedUser, dob: e.target.value })
                    }
                    className="w-full p-2 bg-gray-600 rounded-lg"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Bio</label>
                  <textarea
                    value={selectedUser.bio}
                    onChange={(e) =>
                      setSelectedUser({ ...selectedUser, bio: e.target.value })
                    }
                    className="w-full p-2 bg-gray-600 rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Image URL</label>
                  <input
                    type="text"
                    value={selectedUser.imageUrl}
                    onChange={(e) =>
                      setSelectedUser({
                        ...selectedUser,
                        imageUrl: e.target.value,
                      })
                    }
                    className="w-full p-2 bg-gray-600 rounded-lg"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-600 text-white py-2 px-4 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    className="bg-indigo-600 text-white py-2 px-4 rounded-lg"
                  >
                    {selectedUser.userId ? "Save" : "Create"}
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

export default AdminUserManagement;
