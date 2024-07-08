import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/solid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CourseCard = ({ courseId, title, image }) => {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    const checkIfInWishlist = async () => {
      try {
        const wishlistResponse = await fetch(
          `http://localhost:8080/questor/wishlists/getByUserId/${userId}`
        );
        const wishlist = await wishlistResponse.json();

        const courseAlreadyInWishlist = wishlist.courses.some(
          (course) => course.courseId === courseId
        );

        if (courseAlreadyInWishlist) {
          setIsInWishlist(true);
        }
      } catch (error) {
        console.error("Error checking wishlist:", error);
      }
    };

    checkIfInWishlist();
  }, [userId, courseId]);

  const handleCardClick = () => {
    navigate(`/course/${courseId}`);
  };

  const toggleWishlist = async (e) => {
    e.stopPropagation();
    try {
      let wishlistResponse = await fetch(
        `http://localhost:8080/questor/wishlists/getByUserId/${userId}`
      );
      let wishlist = await wishlistResponse.json();

      // Check if the wishlist exists, if not, create one
      if (!wishlist || !wishlist.wishlistId) {
        const createWishlistResponse = await fetch(
          "http://localhost:8080/questor/wishlists/addWishlist",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId, courses: [] }),
          }
        );
        wishlist = await createWishlistResponse.json();
      }

      const courseAlreadyInWishlist = wishlist.courses.some(
        (course) => course.courseId === courseId
      );

      if (courseAlreadyInWishlist) {
        // Remove course from wishlist
        await fetch(
          `http://localhost:8080/questor/wishlists/deleteCourseFromWishlist/${wishlist.wishlistId}/${courseId}`,
          {
            method: "DELETE",
          }
        );
        setIsInWishlist(false);
        // alert("Course has been removed from your wishlist");
        toast.success("Course removed from wishlist")
      } else {
        // Add course to wishlist
        await fetch(
          `http://localhost:8080/questor/wishlists/addCourseToWishlist/${wishlist.wishlistId}/${courseId}`,
          {
            method: "POST",
          }
        );
        setIsInWishlist(true);
        // alert("Course has been added to your wishlist");
        toast.success("Course added to wishlist")
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
    }
  };

  return (
    <div
      className="bg-gray-800 rounded-xl shadow-lg p-4 text-center cursor-pointer relative"
      onClick={handleCardClick}
    >
      <div className="absolute top-2 right-2">
        <button
          className="p-1 rounded-full hover:bg-gray-600 focus:outline-none"
          onClick={toggleWishlist}
        >
          <HeartIcon
            className={`h-6 w-6 ${
              isInWishlist ? "text-red-500" : "text-white"
            }`}
          />
        </button>
      </div>
      <img
        src={image}
        alt={title}
        className="w-full h-32 object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
    </div>
  );
};

export default CourseCard;
