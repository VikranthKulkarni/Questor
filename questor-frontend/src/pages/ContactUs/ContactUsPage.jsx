import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import NavbarDynamic from '../../components/navbar/NavbarDynamic';
import { PhoneIcon, MailIcon, LocationMarkerIcon } from '@heroicons/react/solid';


const ContactUsPage = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [userId, setUserId] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const storedUserId = sessionStorage.getItem('userId');
    setUserId(storedUserId);
  }, []);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    try{
        const response = await fetch('http://localhost:8080/questor/contactus/addDetails',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({firstName, lastName, email, phoneNumber, message}),
        });

        if(response.ok){
            setStatusMessage('Your message has ben sent successfully!');
            setFirstName('');
            setLastName('');
            setEmail('');
            setPhoneNumber('');
            setMessage('');
        } else{
            const errorMessage = await response.text();
            setStatusMessage(`Error: ${errorMessage}`);
        }
    } catch(error){
        setStatusMessage(`Error: ${error.message}`);
    }
  };

  const navbarLinks = [
    { name: "Home", url: "/userDashboard" },
    { name: "Project Portal", url: `/projects/${userId}` },
    { name: "Wishlist", url: `/wishlist/${userId}` },
    { name: "Contact Us", url: "/contactUs" },
    { name: "My Requests", url: `/userRequests/${userId}` },
  ];
 
  return (
    <div className="bg-black min-h-screen flex flex-col text-white relative items-center">
    <div style={{zIndex:'9999999'}}>
      <NavbarDynamic links={navbarLinks}/>
    </div>
      <div className="w-3/4 p-8 mt-28">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="mt-2 text-lg">We are here for you. Just write us a message!</p>
        </div>
        <div className="mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-8 lg:space-y-0 lg:space-x-8">
          <div className="bg-gray-600 p-8 rounded-xl shadow-lg w-full lg:w-1/2 relative">
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
            <p className="mb-4">We are here for you. Just write a message to start a live chat!</p>
            <br/><br/>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <PhoneIcon className="w-6 h-6 text-white" />
                <span>+91 987654321</span>
              </div>
              <br/>
              <div className="flex items-center space-x-4">
                <MailIcon className="w-6 h-6 text-white" />
                <span>service@questor.com</span>
              </div>
              <br/>
              <div className="flex items-center space-x-4">
                <LocationMarkerIcon className="w-6 h-6 text-white" />
                <span>DLF Cyber City, Hyderabad</span>
              </div>
              <br/>
            </div>
            <img src="/images/contact.png" alt="Contact" className="absolute top-40 right-16 w-44 h-48"/>
            <img src="/images/contactbelow.png" alt="Contact" className="relative  left-4 w-48 h-40 mt-16"/>
           
          </div>
          <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full lg:w-1/2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-1/2 p-4 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="First Name"
                  required
                />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-1/2 p-4 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="Last Name"
                  required
                />
              </div>
              <div className="flex space-x-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="Email"
                  required
                />
              </div>
              <div className='flex space-x-4'>
              <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full p-4 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="Phone Number"
                  required
                />
              </div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-4 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Write your message..."
                rows="4"
                required
              ></textarea>
              <div className="flex justify-end">
                <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-md">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default ContactUsPage;