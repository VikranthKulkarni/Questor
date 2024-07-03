import React from "react";
import { Link } from "react-router-dom";
import { XIcon } from "@heroicons/react/solid";

const WishlistCard = ({ courseId, title, image, onDelete }) => {
  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(courseId);
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg p-4 text-center relative">
      <div className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-600">
        <XIcon className="h-6 w-6 text-white" onClick={handleDelete} />
      </div>
      <Link to={`/course/${courseId}`} className="block">
        <img
          src={image}
          alt={title}
          className="w-full h-32 object-cover rounded-md mb-4"
        />
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
      </Link>
    </div>
  );
};

export default WishlistCard;
