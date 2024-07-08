import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import ProjectDashBoardPage from "../pages/ProjectPortal/ProjectDashBoardPage";
import UserProfilePage from "../pages/User/UserProfilePage";
import UserDashboardPage from "../pages/User/UserDashboardPage";
import ContactUsPage from "../pages/ContactUs/ContactUsPage";
import ProjectLandingPage from "../pages/ProjectPortal/ProjectLandingPage";
import AdminDashboard from "../pages/Admin/AdminDashboardPage";
import AdminCourseDetails from "../pages/Admin/AdminCourseDetails";
import CourseViewPage from "../pages/Courses/CourseViewPage";
import PrivateRoute from "../components/Routes/PrivateRoute";
import PublicRoute from "../components/Routes/PublicRoute";
import WishlistPage from "../pages/User/WishlistPage";
import PricingPage from "../pages/User/PricingPage";
import PaymentPage from "../pages/User/PaymentPage";
import UserRequestsPage from "../pages/User/UserRequestsPage";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<PublicRoute element={LoginPage} />} />
        <Route
          path="/register"
          element={<PublicRoute element={RegisterPage} />}
        />

        {/* Pricing and Payment Routes */}
        <Route
          path="/pricing"
          element={
            <PrivateRoute element={PricingPage} allowedRoles={["isUser"]} />
          }
        />
        <Route
          path="/payment/:plan"
          element={
            <PrivateRoute element={PaymentPage} allowedRoles={["isUser"]} />
          }
        />

        {/* User Routes */}
        <Route
          path="/userDashboard"
          element={
            <PrivateRoute
              element={UserDashboardPage}
              allowedRoles={["isUser"]}
            />
          }
        />
        <Route
          path="/profile/:userId"
          element={
            <PrivateRoute element={UserProfilePage} allowedRoles={["isUser"]} />
          }
        />
        <Route
          path="/contactus"
          element={
            <PrivateRoute element={ContactUsPage} allowedRoles={["isUser"]} />
          }
        />
        <Route
          path="/course/:courseId"
          element={
            <PrivateRoute
              element={CourseViewPage}
              allowedRoles={["isUser"]}
              restrictedPlans={["FREE"]}
            />
          }
        />
        <Route
          path="/projects/:userId"
          element={
            <PrivateRoute
              element={ProjectDashBoardPage}
              allowedRoles={["isUser"]}
            />
          }
        />
        <Route
          path="/project/:projectId"
          element={
            <PrivateRoute
              element={ProjectLandingPage}
              allowedRoles={["isUser"]}
            />
          }
        />
        <Route
          path="/wishlist/:userId"
          element={
            <PrivateRoute element={WishlistPage} allowedRoles={["isUser"]} />
          }
        />

        <Route path = "/userRequests/:userId" element = {<PrivateRoute element={UserRequestsPage} allowedRoles={["isUser"]}/>}/>

        {/* Admin Routes */}
        <Route
          path="/admindashboard"
          element={
            <PrivateRoute element={AdminDashboard} allowedRoles={["isAdmin"]} />
          }
        />
        <Route
          path="/admin/course/:courseId"
          element={
            <PrivateRoute
              element={AdminCourseDetails}
              allowedRoles={["isAdmin"]}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default AppRoutes;
