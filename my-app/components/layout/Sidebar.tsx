
import React from 'react';
import type { View } from '../../types';
import { DashboardIcon, UsersIcon, CoursesIcon } from '../ui/Icons';

interface SidebarProps {
  currentView: View;
  setView: (view: View) => void;
}

const NavLink: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
  <a
    href="#"
    onClick={(e) => {
      e.preventDefault();
      onClick();
    }}
    className={`flex items-center px-4 py-2.5 rounded-lg transition-colors duration-200 ${
      isActive
        ? 'bg-primary-500 text-white shadow-lg'
        : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
    }`}
  >
    {icon}
    <span className="ml-4 font-medium">{label}</span>
  </a>
);

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  return (
    <aside className="w-64 flex-shrink-0 bg-white dark:bg-gray-800 p-4 border-r border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-center mb-10">
        <CoursesIcon className="w-10 h-10 text-primary-500" />
        <h1 className="text-2xl font-bold ml-2 text-gray-800 dark:text-white">
          CourseDash
        </h1>
      </div>
      <nav className="space-y-2">
        <NavLink
          icon={<DashboardIcon className="w-6 h-6" />}
          label="Dashboard"
          isActive={currentView === 'dashboard'}
          onClick={() => setView('dashboard')}
        />
        <NavLink
          icon={<UsersIcon className="w-6 h-6" />}
          label="Users"
          isActive={currentView === 'users'}
          onClick={() => setView('users')}
        />
        <NavLink
          icon={<CoursesIcon className="w-6 h-6" />}
          label="Courses"
          isActive={currentView === 'courses' || currentView === 'course-details'}
          onClick={() => setView('courses')}
        />
      </nav>
    </aside>
  );
};

export default Sidebar;
