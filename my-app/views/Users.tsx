import React, { useState, useEffect, useCallback } from 'react';
import type { User, UserCreationRequest, UserUpdateRequest } from '../types';
import { API_BASE_URL } from '../constants';
import { PlusIcon, EditIcon, DeleteIcon } from '../components/ui/Icons';
import Spinner from '../components/ui/Spinner';
import Modal from '../components/ui/Modal';
import UserForm from '../components/forms/UserForm';

const Users: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/users`);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Lấy danh sách người dùng thất bại. Phản hồi từ server: ${errorText}`);
            }
            const data: User[] = await response.json();
            setUsers(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi không xác định');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleOpenModal = (user: User | null = null) => {
        setCurrentUser(user);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentUser(null);
    };

    const handleSaveUser = async (userData: UserCreationRequest | UserUpdateRequest) => {
        const method = currentUser ? 'PUT' : 'POST';
        const url = currentUser ? `${API_BASE_URL}/users/${currentUser.maNguoiDung}` : `${API_BASE_URL}/users`;
        
        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Lưu người dùng thất bại. Phản hồi từ server: ${errorText}`);
            }
            await fetchUsers();
            handleCloseModal();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi không xác định');
        }
    };

    const handleDeleteUser = async (userId: number) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này không?')) {
            try {
                const response = await fetch(`${API_BASE_URL}/users/${userId}`, { method: 'DELETE' });
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Xóa người dùng thất bại. Phản hồi từ server: ${errorText}`);
                }
                await fetchUsers();
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
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Quản lý người dùng</h2>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg shadow hover:bg-primary-700 transition"
                >
                    <PlusIcon />
                    Thêm người dùng
                </button>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-100 dark:bg-gray-700">
                        <tr>
                            <th className="p-4 font-semibold">Họ tên</th>
                            <th className="p-4 font-semibold">Email</th>
                            <th className="p-4 font-semibold">Vai trò</th>
                            <th className="p-4 font-semibold">Trạng thái</th>
                            <th className="p-4 font-semibold">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.maNguoiDung} className="border-t border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                                <td className="p-4">{user.hoTen}</td>
                                <td className="p-4">{user.email}</td>
                                <td className="p-4">{user.chucNang}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                        user.trangThai === 'Active' || user.trangThai === 'Hoạt động' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                                    }`}>
                                        {user.trangThai === 'Active' || user.trangThai === 'Hoạt động' ? 'Hoạt động' : 'Không hoạt động'}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <div className="flex gap-2">
                                        <button onClick={() => handleOpenModal(user)} className="p-2 text-blue-500 hover:text-blue-700"><EditIcon /></button>
                                        <button onClick={() => handleDeleteUser(user.maNguoiDung)} className="p-2 text-red-500 hover:text-red-700"><DeleteIcon /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={currentUser ? 'Chỉnh sửa người dùng' : 'Thêm người dùng'}>
                <UserForm user={currentUser} onSave={handleSaveUser} onCancel={handleCloseModal} />
            </Modal>
        </div>
    );
};

export default Users;