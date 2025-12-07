import React, { useState, useEffect, useCallback } from 'react';
import type { Course, User } from '../types';
import { API_BASE_URL } from '../constants';
import Spinner from '../components/ui/Spinner';
import { DeleteIcon, PlusIcon } from '../components/ui/Icons';
import Modal from '../components/ui/Modal';
import EnrollStudentForm from '../components/forms/EnrollStudentForm';

interface CourseDetailsProps {
  course: Course;
}

const CourseDetails: React.FC<CourseDetailsProps> = ({ course }) => {
  const [enrolledStudents, setEnrolledStudents] = useState<User[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchEnrolledStudents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/usercourse/${course.id}`);

      if (response.status === 204) { // No content
        setEnrolledStudents([]);
        return;
      }
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Lỗi 404: Không tìm thấy. Không thể tìm thấy API endpoint để lấy danh sách học viên. Vui lòng đảm bảo backend UserCourseController có @GetMapping("/{courseId}").`);
        }
        const errorText = await response.text();
        throw new Error(`Lấy danh sách học viên thất bại (trạng thái: ${response.status}). Phản hồi từ server: ${errorText}`);
      }
      const data: User[] = await response.json();
      setEnrolledStudents(data);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi không xác định');
      setEnrolledStudents([]); // Reset on error
    } finally {
      setLoading(false);
    }
  }, [course.id]);

  const fetchAllUsers = useCallback(async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/users`);
        if(!response.ok) throw new Error("Lấy danh sách tất cả người dùng thất bại.");
        const data = await response.json();
        setAllUsers(data);
    } catch(err) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'Lấy danh sách tất cả người dùng thất bại.');
    }
  }, []);

  useEffect(() => {
    fetchEnrolledStudents();
    fetchAllUsers();
  }, [fetchEnrolledStudents, fetchAllUsers]);

  const handleEnrollStudent = async (userId: number) => {
    setError(null);
    try {
        const response = await fetch(`${API_BASE_URL}/usercourse`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, courseId: course.id }),
        });
        if(!response.ok) {
            const errorText = await response.text();
            throw new Error(`Ghi danh học viên thất bại. Phản hồi từ server: ${errorText}`);
        }
        fetchEnrolledStudents();
        fetchAllUsers(); // Re-fetch all users to update the unrolled list
        setIsModalOpen(false);
    } catch (err) {
        setError(err instanceof Error ? err.message : 'Ghi danh học viên thất bại');
    }
  }

  const handleRemoveStudent = async (userId: number) => {
    if(window.confirm('Bạn có chắc chắn muốn xóa học viên này khỏi khóa học không?')) {
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/usercourse`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, courseId: course.id }),
            });
            if(!response.ok) {
                const errorText = await response.text();
                throw new Error(`Xóa học viên thất bại. Phản hồi từ server: ${errorText}`);
            }
            fetchEnrolledStudents();
            fetchAllUsers(); // Re-fetch all users to update the unrolled list
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Xóa học viên thất bại');
        }
    }
  }

  const unrolledUsers = allUsers.filter(user => !enrolledStudents.some(student => student.maNguoiDung === user.maNguoiDung));

  return (
    <div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h1 className="text-3xl font-bold text-primary-600 dark:text-primary-400">{course.courseName}</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">{course.des}</p>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Học viên đã ghi danh</h2>
        <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
            <PlusIcon />
            Ghi danh học viên
        </button>
      </div>

      {error && <div className="mb-4 text-center p-4 bg-red-100 dark:bg-red-900/20 rounded-lg"><p className="text-red-500 font-semibold">{error}</p></div>}
      
      {loading ? <Spinner /> : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
          {enrolledStudents.length > 0 ? (
            <table className="w-full text-left">
              <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                      <th className="p-4 font-semibold">Họ tên</th>
                      <th className="p-4 font-semibold">Email</th>
                      <th className="p-4 font-semibold">Hành động</th>
                  </tr>
              </thead>
              <tbody>
                  {enrolledStudents.map(student => (
                      <tr key={student.maNguoiDung} className="border-t border-gray-200 dark:border-gray-600">
                          <td className="p-4">{student.hoTen}</td>
                          <td className="p-4">{student.email}</td>
                          <td className="p-4">
                              <button onClick={() => handleRemoveStudent(student.maNguoiDung)} className="p-2 text-red-500 hover:text-red-700">
                                  <DeleteIcon />
                              </button>
                          </td>
                      </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <p className="p-6 text-center text-gray-500 dark:text-gray-400">Chưa có học viên nào được ghi danh vào khóa học này.</p>
          )}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Ghi danh học viên">
        <EnrollStudentForm
          users={unrolledUsers}
          onEnroll={handleEnrollStudent}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>

    </div>
  );
};

export default CourseDetails;