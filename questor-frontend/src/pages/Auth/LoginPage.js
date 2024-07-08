import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CSS/style.css";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ userName, password }),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message);
      }

      const data = await response.json();
      console.log("Logged in user data: ", data);
      sessionStorage.setItem("userId", data.userId);
      sessionStorage.setItem("role", data.role);

      toast.success("Login successful!");

      if (data.role === "isAdmin") {
        navigate("/adminDashboard");
      } else {
        // Check user's subscription status
        const subscriptionResponse = await fetch(
          `http://localhost:8080/subscriptions/byUserId/${data.userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!subscriptionResponse.ok) {
          throw new Error("Failed to fetch subscription details");
        }

        const subscriptionText = await subscriptionResponse.text();
        const subscriptionData = subscriptionText
          ? JSON.parse(subscriptionText)
          : null;

        console.log("User subscription data: ", subscriptionData);

        if (!subscriptionData || subscriptionData.status === "INACTIVE") {
          console.log("Redirecting to pricing page");
          navigate("/pricing");
        } else {
          const today = new Date();
          const endDate = new Date(subscriptionData.endDate);

          if (endDate <= today) {
            // Update subscription status to INACTIVE
            if (subscriptionData.subscriptionId) {
              const updateSubscriptionResponse = await fetch(
                `http://localhost:8080/subscriptions/${subscriptionData.subscriptionId}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    ...subscriptionData,
                    status: "INACTIVE",
                  }),
                }
              );

              if (!updateSubscriptionResponse.ok) {
                throw new Error("Failed to update subscription status");
              }

              alert(
                "Your Subscription has ended. Would you like to resubscribe?"
              );
              navigate("/pricing");
            } else {
              console.error("Subscription ID is null");
              navigate("/pricing");
            }
          } else {
            console.log("Redirecting to user dashboard");
            navigate("/userDashboard");
          }
        }
      }
    } catch (error) {
      console.error("Login error: ", error);
      // setError(error.message);
      toast.error("Login failed: " + error.message);
    }
  };

  return (
    <div className="bg-black min-h-screen flex flex-col text-white">
      <div className="flex-grow flex items-center justify-center">
        <div className="container mx-auto flex flex-col items-center justify-center space-y-8 p-8 bg-gray-800 rounded-xl shadow-lg">
          <div className="c1 text-center">
            <h1 className="text-4xl font-bold  pr-4">
              Start Your Journey to Expertise
            </h1>
            <p className="mt-4  text-balance">
              Don't have an account? You can{" "}
              <Link to="/register" className="text-gray-400 ">
                Register here!
              </Link>
            </p>
          </div>
          <div className="c2 flex items-center justify-center">
            <img src="/images/image1.png" alt="girl" className="w-64 h-auto" />
          </div>
          <div className="c3 w-full max-w-md">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Enter Username Or Email"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Enter Password"
                required
              />
              <Link
                to="/recover"
                className="block text-right text-sm text-gray-400"
              >
                Recover Password?
              </Link>
              <button
                type="submit"
                className="w-full bg-gray-600 text-white py-3 rounded-md hover:bg-gray-500"
              >
                Login
              </button>
              <div className="flex items-center my-4">
                <hr className="flex-grow border-gray-400" />
                <span className="px-2 text-sm text-gray-400">
                  Or continue with
                </span>
                <hr className="flex-grow border-gray-400" />
              </div>
              <div className="flex justify-around">
                <button className="bg-white text-black p-2 rounded-md flex items-center justify-center">
                  <img
                    src="/images/google.png"
                    alt="Google"
                    className="w-6 h-6"
                  />
                </button>
                <button className="bg-white text-black p-2 rounded-md flex items-center justify-center">
                  <img
                    src="/images/apple.png"
                    alt="Apple"
                    className="w-6 h-6"
                  />
                </button>
                <button className="bg-white text-black p-2 rounded-md flex items-center justify-center">
                  <img
                    src="/images/facebook.png"
                    alt="Facebook"
                    className="w-6 h-6"
                  />
                </button>
              </div>
            </form>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </div>
        </div>
      </div>
      <div className="circle circle1 bg-gray-700"></div>
      <div className="circle circle2 bg-gray-500"></div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
