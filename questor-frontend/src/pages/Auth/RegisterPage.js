import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/questor/user/saveUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName,userName, email, password }),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message);
      }

      const user = await response.json();
      console.log('Registered user:', user);
      // Redirect to the login page or dashboard
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="bg-black min-h-screen flex flex-col text-white">
      <div className="flex-grow flex items-center justify-center">
        <div className="container mx-auto mt-16 flex flex-col md:flex-row items-center justify-center space-y-8 p-8 bg-gray-800 rounded-xl shadow-lg">
          <div className="text-left md:w-3/2">
            <h1 className="text-4xl font-bold mb-4">Hey There, Welcome to Questor</h1>
            <p className="mb-2">Harness the power of technology with Questor</p>
            <p>Already have an account? <Link to="/" className="text-gray-400">Login here!</Link></p>
          </div>
          <div className="hidden md:block md:w-full text-center ml-6">
            <img src="/images/regi.png" alt="image" className="w-72 h-auto" />
          </div>
          <div className="w-full md:w-3/2">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-1/2 p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="First Name"
                  required
                />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-1/2 p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="Last Name"
                  required
                />
              </div>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Enter User Name"
                required
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Enter Email"
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
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Confirm Password"
                required
              />
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <button type="submit" className="w-full bg-gray-600 text-white py-3 rounded-md hover:bg-gray-500">Register</button>
              <div className="flex items-center my-4">
                <hr className="flex-grow border-gray-400" />
                <span className="px-2 text-sm text-gray-400">Or continue with</span>
                <hr className="flex-grow border-gray-400" />
              </div>
              <div className="flex justify-around">
                <button className="bg-white text-black p-2 rounded-md flex items-center justify-center">
                  <img src="/images/google.png" alt="Google" className="w-6 h-6" />
                </button>
                <button className="bg-white text-black p-2 rounded-md flex items-center justify-center">
                  <img src="/images/apple.png" alt="Apple" className="w-6 h-6" />
                </button>
                <button className="bg-white text-black p-2 rounded-md flex items-center justify-center">
                  <img src="/images/facebook.png" alt="Facebook" className="w-6 h-6" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="circle circle1 bg-gray-700"></div>
      <div className="circle circle2 bg-gray-500"></div>
    </div>
  );
};

export default RegisterPage;
