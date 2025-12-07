import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../constants';
import type { User, Course, View } from '../types';
import { UsersIcon, CoursesIcon } from '../components/ui/Icons';
import Spinner from '../components/ui/Spinner';

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: number | string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, color }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex items-center space-x-4">
    <div className={`p-3 rounded-full ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
    </div>
  </div>
);

interface DashboardProps {
    setView: (view: View) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setView }) => {
  const [userCount, setUserCount] = useState(0);
  const [courseCount, setCourseCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [usersResponse, coursesResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/users`),
          fetch(`${API_BASE_URL}/courses`)
        ]);
        
        if (!usersResponse.ok) {
            const errorText = await usersResponse.text();
            throw new Error(`Failed to fetch users data (status: ${usersResponse.status}). Server response: ${errorText}`);
        }
        if (!coursesResponse.ok) {
            const errorText = await coursesResponse.text();
            throw new Error(`Failed to fetch courses data (status: ${coursesResponse.status}). Server response: ${errorText}`);
        }

        const usersData: User[] = await usersResponse.json();
        const coursesData: Course[] = await coursesResponse.json();
        setUserCount(usersData.length);
        setCourseCount(coursesData.length);
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        if (err instanceof TypeError && err.message === 'Failed to fetch') {
            setError(`Could not connect to the API server at ${API_BASE_URL}. Please make sure the server is running and accessible.`);
        } else {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-full"><Spinner /></div>;
  }
  
  if (error) {
    return (
        <div className="container mx-auto text-center p-8">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative dark:bg-red-900/20 dark:border-red-500/50 dark:text-red-300" role="alert">
                <strong className="font-bold">Error:</strong>
                <span className="block sm:inline ml-2">{error}</span>
            </div>
        </div>
    );
  }

  return (
    <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Welcome, Admin!</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <StatCard 
                icon={<UsersIcon className="w-7 h-7 text-white" />}
                title="Total Users"
                value={userCount}
                color="bg-blue-500"
            />
            <StatCard 
                icon={<CoursesIcon className="w-7 h-7 text-white" />}
                title="Total Courses"
                value={courseCount}
                color="bg-green-500"
            />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Quick Actions</h3>
            <div className="flex flex-col sm:flex-row gap-4">
                <button 
                    onClick={() => setView('users')}
                    className="w-full sm:w-auto px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg shadow-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-75 transition-transform transform hover:scale-105"
                >
                    Manage Users
                </button>
                <button 
                    onClick={() => setView('courses')}
                    className="w-full sm:w-auto px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75 transition-transform transform hover:scale-105"
                >
                    Manage Courses
                </button>
            </div>
        </div>
    </div>
  );
};

export default Dashboard;