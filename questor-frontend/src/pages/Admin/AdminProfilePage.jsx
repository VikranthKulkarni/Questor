import React, { useState, useEffect } from "react";

const AdminProfilePage = () => {
  const userId = sessionStorage.getItem("userId");
  const [user, setUser] = useState({
    userId: "",
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    phoneNumber: "",
    bio: "",
    dateOfBirth: "",
    imageUrl: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8080/questor/user/getUser/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUser({
          userId: data.userId,
          firstName: data.firstName,
          lastName: data.lastName,
          userName: data.userName,
          email: data.email,
          phoneNumber: data.phoneNumber || "",
          bio: data.bio || "",
          dateOfBirth: data.dob ? data.dob.split("T")[0] : "",
          imageUrl: data.imageUrl || "",
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();

    const updatedUser = { ...user };
    if (user.newPassword && user.confirmNewPassword) {
      if (user.newPassword !== user.confirmNewPassword) {
        alert("New password and confirm password do not match");
        return;
      }
      updatedUser.password = user.newPassword;
    }

    // Update DOB formatting if needed
    if (updatedUser.dateOfBirth) {
      updatedUser.dob = updatedUser.dateOfBirth;
    }

    fetch("http://localhost:8080/questor/user/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.dob) {
          const formattedDob = data.dob.split("T")[0];
          data.dob = formattedDob;
        }
        setUser(data);
        alert("Profile updated successfully");
      })
      .catch((error) => console.error("Error updating user data:", error));
  };

  const handleCancel = () => {
    console.log("Cancel clicked");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-800 min-h-screen flex flex-col text-white">
      <div className="w-full p-8 mt-28">
        <div className="mx-auto flex flex-col items-center">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold">User Profile</h1>
          </div>
          <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-4xl">
            <div className="flex flex-col items-center mb-8">
              <img
                src={
                  user.imageUrl ||
                  "https://tse3.mm.bing.net/th/id/OIP.wU8p3LA0N6n7XVmwyehlTQHaHa?w=182&h=182&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                }
                alt="Profile"
                className="w-32 h-32 rounded-full mb-4"
              />
              <h2 className="text-2xl font-bold mb-2">
                {user.firstName} {user.lastName}
              </h2>
              <div className="flex space-x-4">
                <button className="bg-gray-900 text-white py-2 px-4 rounded-full">
                  Upload New Photo
                </button>
                <button className="bg-gray-900 text-white py-2 px-4 rounded-full">
                  Delete
                </button>
              </div>
            </div>
            <form onSubmit={handleSaveChanges} className="space-y-6">
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={user.firstName}
                  onChange={handleInputChange}
                  name="firstName"
                  className="w-1/2 p-4 bg-gray-700 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="First Name"
                />
                <input
                  type="text"
                  value={user.lastName}
                  onChange={handleInputChange}
                  name="lastName"
                  className="w-1/2 p-4 bg-gray-700 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="Last Name"
                />
              </div>
              <input
                type="text"
                value={user.userName}
                onChange={handleInputChange}
                name="userName"
                className="w-full p-4 bg-gray-700 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="UserName"
              />
              <div className="flex space-x-4">
                <input
                  type="email"
                  value={user.email}
                  onChange={handleInputChange}
                  name="email"
                  className="w-1/2 p-4 bg-gray-700 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="Email Address"
                />
                <input
                  type="tel"
                  value={user.phoneNumber}
                  onChange={handleInputChange}
                  name="phoneNumber"
                  className="w-1/2 p-4 bg-gray-700 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="Phone Number"
                />
              </div>
              <input
                type="text"
                value={user.bio}
                onChange={handleInputChange}
                name="bio"
                className="w-full p-4 bg-gray-700 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Bio"
              />
              <input
                type="date"
                value={user.dateOfBirth}
                onChange={handleInputChange}
                name="dateOfBirth"
                className="w-full p-4 bg-gray-700 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              <input
                type="text"
                value={user.imageUrl}
                onChange={handleInputChange}
                name="imageUrl"
                className="w-full p-4 bg-gray-700 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Image URL"
              />
              <div className="flex space-x-4">
                <input
                  type="password"
                  value={user.currentPassword}
                  onChange={handleInputChange}
                  name="currentPassword"
                  className="w-1/3 p-4 bg-gray-700 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="Current Password"
                />
                <input
                  type="password"
                  value={user.newPassword}
                  onChange={handleInputChange}
                  name="newPassword"
                  className="w-1/3 p-4 bg-gray-700 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="New Password"
                />
                <input
                  type="password"
                  value={user.confirmNewPassword}
                  onChange={handleInputChange}
                  name="confirmNewPassword"
                  className="w-1/3 p-4 bg-gray-700 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="Confirm New Password"
                />
              </div>
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-white text-black py-2 px-4 rounded-full"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-white text-black py-2 px-4 rounded-full"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfilePage;
