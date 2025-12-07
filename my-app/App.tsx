
import React, { useState, useCallback } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './views/Dashboard';
import Users from './views/Users';
import Courses from './views/Courses';
import type { View, Course } from './types';
import CourseDetails from './views/CourseDetails';


const App: React.FC = () => {
  const [view, setView] = useState<View>('dashboard');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);


  const handleViewCourse = useCallback((course: Course) => {
    setSelectedCourse(course);
    setView('course-details');
  }, []);

  const renderView = () => {
    switch (view) {
      case 'dashboard':
        return <Dashboard setView={setView} />;
      case 'users':
        return <Users />;
      case 'courses':
        return <Courses onViewCourse={handleViewCourse} />;
      case 'course-details':
        return selectedCourse ? <CourseDetails course={selectedCourse} /> : <Courses onViewCourse={handleViewCourse} />;
      default:
        return <Dashboard setView={setView} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <Sidebar currentView={view} setView={setView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header currentView={view} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;
