import React, { useState } from 'react';
import type { User } from '../../types';

interface EnrollStudentFormProps {
  users: User[];
  onEnroll: (userId: number) => void;
  onCancel: () => void;
}

const EnrollStudentForm: React.FC<EnrollStudentFormProps> = ({ users, onEnroll, onCancel }) => {
  const [selectedUserId, setSelectedUserId] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUserId) {
      onEnroll(parseInt(selectedUserId, 10));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Chọn học viên</label>
        <select
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="" disabled>-- Chọn một học viên --</option>
          {users.map(user => (
            <option key={user.maNguoiDung} value={user.maNguoiDung}>
              {user.hoTen} ({user.email})
            </option>
          ))}
        </select>
        {users.length === 0 && (
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Không có học viên nào chưa được ghi danh.
          </p>
        )}
      </div>
      <div className="flex justify-end gap-4 pt-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500">Hủy</button>
        <button type="submit" disabled={!selectedUserId || users.length === 0} className="px-4 py-2 rounded-md text-white bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 dark:disabled:bg-gray-500">Ghi danh</button>
      </div>
    </form>
  );
};

export default EnrollStudentForm;