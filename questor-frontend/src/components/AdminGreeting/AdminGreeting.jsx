import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const AdminGreeting = ({ userId }) => {
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    // Fetch admin's name based on userId
    fetch(`http://localhost:8080/questor/user/getUser/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Assuming data contains firstName and lastName fields
        const { firstName, lastName } = data;
        setAdminName(`${firstName} ${lastName}`);
      })
      .catch((error) => console.error("Error fetching admin name:", error));
  }, [userId]);

  return (
      <div>
        <h2 className="text-2xl font-bold">Hola, {adminName}</h2>
        <span className="text-lg">
          Welcome to Admin Dashboard. Have a great day!
        </span>
      </div>

  );
};

AdminGreeting.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default AdminGreeting;
