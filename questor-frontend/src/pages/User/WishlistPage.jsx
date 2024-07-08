import React, { useEffect, useState } from "react";
import NavbarDynamic from "../../components/navbar/NavbarDynamic";
import WishlistCard from "../../components/courses/WishlistCard";
import Fotter from "../../components/footer/Fotter";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const userId = sessionStorage.getItem("userId");

  const navbarLinks = [
    { name: "Home", url: "/userDashboard" },
    { name: "Project Portal", url: `/projects/${userId}` },
    { name: "Wishlist", url: `/wishlist/${userId}` },
    { name: "Contact Us", url: "/contactUs" },
    { name: "My Requests", url: `/userRequests/${userId}` },
    { name: "About Us", url: "/about-us" },
  ];

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/questor/wishlists/getByUserId/${userId}`
        );
        const data = await response.json();
        setWishlist(data.courses || []);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, [userId]);

  const handleDelete = async (courseId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/questor/wishlists/getByUserId/${userId}`
      );
      const wishlist = await response.json();

      await fetch(
        `http://localhost:8080/questor/wishlists/deleteCourseFromWishlist/${wishlist.wishlistId}/${courseId}`,
        {
          method: "DELETE",
        }
      );

      setWishlist((prevWishlist) =>
        prevWishlist.filter((course) => course.courseId !== courseId)
      );
      toast.success("Course removed from wishlist!")
    } catch (error) {
      console.error("Error deleting course from wishlist:", error);
      toast.error("Failed to remove course from wishlist.")
    }
  };

  return (
    <div className="bg-black min-h-screen flex flex-col text-white">
      <div style={{ zIndex: "999" }}>
        <NavbarDynamic links={navbarLinks} />
      </div>
      <div className="flex-grow  pt-32 mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="bg-gray-900 shadow mb-4 rounded-xl">
          <div className="px-4 py-6 sm:px-6 lg:px-8 ">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Your Wishlist
            </h1>
          </div>
        </header>
        <main>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {wishlist.map((course, index) => (
              <WishlistCard
                key={`${course.courseId}-${index}`} // Ensure unique key
                courseId={course.courseId}
                title={course.courseName}
                image={course.courseImage}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </main>
      </div>
      <Fotter/>
    </div>
  );
};

export default WishlistPage;
