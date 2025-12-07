import React, { useState, useEffect } from 'react';
import type { User, UserCreationRequest, UserUpdateRequest } from '../../types';

interface UserFormProps {
  user: User | null;
  onSave: (data: UserCreationRequest | UserUpdateRequest) => void;
  onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    email: '',
    passwordHash: '',
    hoTen: '',
    soDienThoai: '',
    ngaySinh: '',
    gioiTinh: 'Nam',
    trangThai: 'Hoạt động',
    chucNang: 'User',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email,
        passwordHash: '', // Không điền sẵn mật khẩu vì lý do bảo mật
        hoTen: user.hoTen,
        soDienThoai: user.soDienThoai,
        ngaySinh: user.ngaySinh ? user.ngaySinh.split('T')[0] : '',
        gioiTinh: user.gioiTinh,
        trangThai: user.trangThai,
        chucNang: user.chucNang,
      });
    } else {
        setFormData({
            email: '',
            passwordHash: '',
            hoTen: '',
            soDienThoai: '',
            ngaySinh: '',
            gioiTinh: 'Nam',
            trangThai: 'Hoạt động',
            chucNang: 'User',
        });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Xây dựng payload, loại trừ email khi cập nhật và chỉ gửi mật khẩu nếu nó được thay đổi
    const payload = { ...formData };
    if (!payload.passwordHash) {
        // @ts-ignore
        delete payload.passwordHash;
    }
    
    if (user) {
        const updatePayload: UserUpdateRequest = payload;
        // @ts-ignore
        delete updatePayload.email;
        onSave(updatePayload);
    } else {
        const createPayload: UserCreationRequest = payload as UserCreationRequest;
        onSave(createPayload);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Họ và tên</label>
        <input type="text" name="hoTen" value={formData.hoTen} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500" />
      </div>
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required disabled={!!user} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100 dark:disabled:bg-gray-600" />
      </div>
      <div>
        <label className="block text-sm font-medium">Mật khẩu</label>
        <input type="password" name="passwordHash" value={formData.passwordHash} onChange={handleChange} placeholder={user ? "Để trống nếu không muốn đổi mật khẩu" : ""} required={!user} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Số điện thoại</label>
          <input type="tel" name="soDienThoai" value={formData.soDienThoai} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-sm font-medium">Ngày sinh</label>
          <input type="date" name="ngaySinh" value={formData.ngaySinh} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Giới tính</label>
            <select name="gioiTinh" value={formData.gioiTinh} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500">
                <option>Nam</option>
                <option>Nữ</option>
                <option>Khác</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Trạng thái</label>
            <select name="trangThai" value={formData.trangThai} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500">
                <option>Hoạt động</option>
                <option>Không hoạt động</option>
            </select>
          </div>
      </div>
      <div>
        <label className="block text-sm font-medium">Vai trò</label>
        <select name="chucNang" value={formData.chucNang} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500">
            <option>User</option>
            <option>Admin</option>
        </select>
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500">Hủy</button>
        <button type="submit" className="px-4 py-2 rounded-md text-white bg-primary-600 hover:bg-primary-700">Lưu</button>
      </div>
    </form>
  );
};

export default UserForm;