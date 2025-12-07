
import React, { useState, useEffect } from 'react';
import type { Course, CourseRequest } from '../../types';

interface CourseFormProps {
  course: Course | null;
  onSave: (data: CourseRequest) => void;
  onCancel: () => void;
}

const CourseForm: React.FC<CourseFormProps> = ({ course, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    courseName: '',
    des: '',
  });

  useEffect(() => {
    if (course) {
      setFormData({
        courseName: course.courseName,
        des: course.des,
      });
    } else {
        setFormData({
            courseName: '',
            des: '',
        });
    }
  }, [course]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Course Name</label>
        <input
          type="text"
          name="courseName"
          value={formData.courseName}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
        <textarea
          name="des"
          value={formData.des}
          onChange={handleChange}
          rows={4}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500"
        ></textarea>
      </div>
      <div className="flex justify-end gap-4 pt-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500">Cancel</button>
        <button type="submit" className="px-4 py-2 rounded-md text-white bg-primary-600 hover:bg-primary-700">Save</button>
      </div>
    </form>
  );
};

export default CourseForm;
