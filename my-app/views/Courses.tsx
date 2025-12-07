import React, { useState, useEffect, useCallback } from 'react';
import type { Course, CourseRequest } from '../types';
import { API_BASE_URL } from '../constants';
import { PlusIcon } from '../components/ui/Icons';
import Spinner from '../components/ui/Spinner';
import Modal from '../components/ui/Modal';
import CourseForm from '../components/forms/CourseForm';
import CourseCard from '../components/CourseCard';

interface CoursesProps {
  onViewCourse: (course: Course) => void;
}

const Courses: React.FC<CoursesProps> = ({ onViewCourse }) => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCourse, setCurrentCourse] = useState<Course | null>(null);

    const fetchCourses = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/courses`);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Lấy danh sách khóa học thất bại. Phản hồi từ server: ${errorText}`);
            }
            const data: Course[] = await response.json();
            setCourses(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi không xác định');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    const handleOpenModal = (course: Course | null = null) => {
        setCurrentCourse(course);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentCourse(null);
    };

    const handleSaveCourse = async (courseData: CourseRequest) => {
        const method = currentCourse ? 'PUT' : 'POST';
        const url = currentCourse ? `${API_BASE_URL}/courses/${currentCourse.id}` : `${API_BASE_URL}/courses`;
        
        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(courseData),
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Lưu khóa học thất bại. Phản hồi từ server: ${errorText}`);
            }
            await fetchCourses();
            handleCloseModal();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi không xác định');
        }
    };

    const handleDeleteCourse = async (courseId: number) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa khóa học này không?')) {
            try {
                const response = await fetch(`${API_BASE_URL}/courses/${courseId}`, { method: 'DELETE' });
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Xóa khóa học thất bại. Phản hồi từ server: ${errorText}`);
                }
                await fetchCourses();
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi không xác định');
            }
        }
    };

    if (loading) return <Spinner />;
    if (error) return <div className="text-red-500 text-center p-4 bg-red-100 rounded-md dark:bg-red-900/20">{error}</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Các khóa học</h2>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg shadow hover:bg-primary-700 transition"
                >
                    <PlusIcon />
                    Thêm khóa học
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <CourseCard 
                        key={course.id}
                        course={course}
                        onEdit={() => handleOpenModal(course)}
                        onDelete={() => handleDeleteCourse(course.id)}
                        onViewDetails={() => onViewCourse(course)}
                    />
                ))}
            </div>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={currentCourse ? 'Chỉnh sửa khóa học' : 'Thêm khóa học'}>
                <CourseForm course={currentCourse} onSave={handleSaveCourse} onCancel={handleCloseModal} />
            </Modal>
        </div>
    );
};

export default Courses;