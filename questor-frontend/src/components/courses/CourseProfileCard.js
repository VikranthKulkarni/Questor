import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CourseProfileCard = () => {
  const [user, setUser] = useState({});
  const userId = sessionStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/questor/user/getUser/${userId}`
      );
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleProfileClick = () => {
    navigate(`/profile/${userId}`);
  };

  return (
    <div
      className="bg-gray-700 p-8 rounded-xl text-left w-full flex flex-col md:flex-row"
      style={{ height: "200px" }}
    >
      <div className="flex items-center mb-4 md:mb-0 md:mr-4">
        <div className="bg-black rounded-full w-16 h-16 flex items-center justify-center">
          <img
            src={
              user.imageData
                ? `data:image/jpeg;base64,${user.imageData}`
                : "https://tse3.mm.bing.net/th/id/OIP.wU8p3LA0N6n7XVmwyehlTQHaHa?w=182&h=182&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            }
            alt="Profile Icon"
            className="w-12 h-12 rounded-full object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col justify-between w-full items-center mt-6">
        <div className="flex justify-between items-center w-full">
          <div>
            <h1 className="text-xl font-bold text-white">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-gray-300">@{user.userName}</p>
          </div>
          <button
            className="bg-black text-white py-2 px-4 rounded-full"
            onClick={handleProfileClick}
          >
            Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseProfileCard;