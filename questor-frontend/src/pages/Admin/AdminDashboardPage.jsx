import React, { useState, useEffect } from 'react';
import { HomeIcon, UserGroupIcon, BookOpenIcon, UserIcon, LogoutIcon } from '@heroicons/react/solid';
import AdminProfilePage from './AdminProfilePage';
import AdminContactUsManagement from './AdminContactUsManagement';
import AdminCategories from './AdminCategories';
import AdminProjectManagement from './AdminProjectManagement';
import AdminUserManagement from './AdminUserManagement';
import AdminCourseManagement from './AdminCourseManagement';
import AdminSidebar from '../../components/SideBar/AdminSideBar';
import AdminSubscriptionManagement from './AdminSubscriptionManagement';
import AdminTransactionManagement from './AdminTransactionManagement';
import AdminGreeting from '../../components/AdminGreeting/AdminGreeting';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [userCount, setUserCount] = useState(0);
  const [courseCount, setCourseCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalAmountLastThreeMonths, setTotalAmountLastThreeMonths] = useState(0);
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    // Fetch user count
    fetch('http://localhost:8080/questor/user/count')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setUserCount(data))
      .catch(error => console.error('Error fetching user count:', error));

    // Fetch course count
    fetch('http://localhost:8080/questor/courses/count')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setCourseCount(data))
      .catch(error => console.error('Error fetching course count:', error));

    // Fetch total amount
    fetch('http://localhost:8080/transactions/totalRevenue')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setTotalAmount(data))
      .catch(error => console.error('Error fetching total amount:', error));

    // Fetch total amount in last three months
    fetch('http://localhost:8080/transactions/revenueInThreeMonths')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setTotalAmountLastThreeMonths(data))
      .catch(error => console.error('Error fetching total amount in last three months:', error));
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case 'courseManagement':
        return <AdminCourseManagement />;
      case 'usersManagement':
        return <AdminUserManagement />;
      case 'projectManagement':
        return <AdminProjectManagement />;
      case 'categoriesManagement':
        return <AdminCategories />;
      case 'ContactUsManagement':
        return <AdminContactUsManagement />;
      case 'subscriptionManagement':
        return <AdminSubscriptionManagement />;
      case 'transactionManagement':
        return <AdminTransactionManagement />;
      case 'profile':
        return <AdminProfilePage />;
      case 'dashboard':
      default:
        return (
          <>
            <div className="bg-gray-800 p-8 rounded-xl shadow-lg flex items-center justify-between mb-8">
              <AdminGreeting userId={parseInt(userId)}/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-gray-700 p-4 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold">Users Gained</h3>
                <p className="text-4xl">{userCount}</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold">Total Courses</h3>
                <p className="text-4xl">{courseCount}</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold">Total Revenue</h3>
                <p className="text-4xl">${totalAmount.toFixed(4)}</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold">Revenue in Last 3 Months</h3>
                <p className="text-4xl">${totalAmountLastThreeMonths.toFixed(4)}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-700 p-4 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold">Revenue Graph</h3>
                <div className="h-64 bg-gray-600 rounded-lg"></div>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold">Users Chart</h3>
                <div className="flex items-center justify-center h-64 bg-gray-600 rounded-lg"></div>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-700 p-4 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold">Courses Chart</h3>
                <div className="h-64 bg-gray-600 rounded-lg"></div>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold">Project Chart</h3>
                <div className="flex items-center justify-center h-64 bg-gray-600 rounded-lg"></div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="bg-black min-h-screen flex flex-col text-white">
      <div className="flex flex-row">
        <AdminSidebar setActiveSection={setActiveSection} />
        <div className="flex-grow p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
