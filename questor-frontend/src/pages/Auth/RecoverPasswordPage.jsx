import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CSS/style.css";

const RecoverPasswordPage = () => {
  const [userName, setUserName] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userResponse = await fetch(
        `http://localhost:8080/questor/user/getUserByUserName/${userName}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!userResponse.ok) {
        throw new Error("User not found");
      }
      const user = await userResponse.json();

      const validateResponse = await fetch(
        "http://localhost:8080/questor/user/validateSecurityAnswer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user.userId, question, answer }),
        }
      );

      const isValid = await validateResponse.json();
      if (!isValid) {
        throw new Error("Invalid security answer");
      }

      if (newPassword !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      await fetch("http://localhost:8080/questor/user/updatePassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.userId, newPassword }),
      });
      toast.success("Password updated successfully");
      navigate("/");
    } catch (error) {
      if (error.message === "User not found") {
        toast.error("User not found");
      } else if (error.message === "Invalid security answer") {
        toast.error("Invalid security question or answer");
      } else if (error.message === "Passwords do not match") {
        toast.error("Passwords do not match");
      } else {
        toast.error("An error occurred");
      }
    }
  };

  return (
    <div className="bg-black min-h-screen flex flex-col text-white">
      <div className="flex-grow flex items-center justify-center">
        <div className="container mx-auto flex flex-col items-center justify-center space-y-8 p-8 bg-gray-800 rounded-xl shadow-lg">
          <div className="c1 text-center">
            <h1 className="text-4xl font-bold pr-4">We Value Your Trust</h1>
            <p className="mt-4 text-balance">
              "Your security is our priority. Let's recover your account."
            </p>
          </div>
          <div className="c2 flex items-center justify-center">
            <img src="/images/VRMAN.png" alt="girl" className="w-64 h-auto" />
          </div>
          <div className="c3 w-full max-w-md">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Enter Username"
                required
              />
              <select
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                required
              >
                <option value="" disabled>
                  Select your security question
                </option>
                <option value="What is your favorite color?">
                  What is your favorite color?
                </option>
                <option value="What is your pet's name?">
                  What is your pet's name?
                </option>
                <option value="What is your mother's maiden name?">
                  What is your mother's maiden name?
                </option>
                <option value="What was your first school?">
                  What was your first school?
                </option>
                <option value="What is your hometown?">
                  What is your hometown?
                </option>
              </select>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Answer"
                required
              />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="New Password"
                required
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Confirm Password"
                required
              />
              <button
                type="submit"
                className="w-full bg-gray-600 text-white py-3 rounded-md hover:bg-gray-500"
              >
                Recover Password
              </button>
              <Link
                to="/"
                className="block text-center text-sm text-gray-400 mt-4"
              >
                Remember What You Forgot!
              </Link>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
      <div className="circle circle1 bg-gray-700"></div>
      <div className="circle circle2 bg-gray-500"></div>
    </div>
  );
};

export default RecoverPasswordPage;
