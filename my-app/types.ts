
export interface User {
  maNguoiDung: number;
  email: string;
  passwordHash: string;
  hoTen: string;
  soDienThoai: string;
  ngayDangKy: string; // Assuming LocalDate is serialized to string
  ngaySinh: string;   // Assuming LocalDate is serialized to string
  gioiTinh: string;
  trangThai: string;
  chucNang: string;
}

export type UserCreationRequest = Omit<User, 'maNguoiDung' | 'ngayDangKy'>;
export type UserUpdateRequest = Omit<User, 'maNguoiDung' | 'ngayDangKy' | 'email'>;

export interface Course {
  id: number;
  courseName: string;
  des: string;
}

export type CourseRequest = Omit<Course, 'id'>;

export interface UserCourseRequest {
  userId: number;
  courseId: number;
}

export type View = 'dashboard' | 'users' | 'courses' | 'course-details';
