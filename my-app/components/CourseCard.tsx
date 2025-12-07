
import React from 'react';
import type { Course } from '../types';
import { EditIcon, DeleteIcon } from './ui/Icons';

interface CourseCardProps {
  course: Course;
  onEdit: () => void;
  onDelete: () => void;
  onViewDetails: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onEdit, onDelete, onViewDetails }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-bold text-primary-600 dark:text-primary-400 mb-2">{course.courseName}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">{course.des}</p>
      </div>
      <div className="p-4 bg-gray-50 dark:bg-gray-700 border-t dark:border-gray-600 flex justify-between items-center">
        <button
          onClick={onViewDetails}
          className="px-3 py-1.5 text-sm font-semibold text-white bg-primary-500 rounded-md hover:bg-primary-600 transition"
        >
          View Students
        </button>
        <div className="flex gap-2">
          <button onClick={onEdit} className="p-2 text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition">
            <EditIcon />
          </button>
          <button onClick={onDelete} className="p-2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition">
            <DeleteIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
