create database quan_ly_khoa_hoc

use quan_ly_khoa_hoc

CREATE TABLE USER (
    MaNguoiDung INT PRIMARY KEY AUTO_INCREMENT, -- Mã Người Dùng (Khóa chính, tự tăng)
    Email VARCHAR(100) UNIQUE NOT NULL,       -- Email (Duy nhất, không được để trống)
    PasswordHash VARCHAR(255) NOT NULL,       -- Hash mật khẩu
    HoTen VARCHAR(100),                       -- Họ và Tên
    SoDienThoai VARCHAR(20),                  -- Số Điện Thoại
    NgayDangKy DATE NOT NULL,                 -- Ngày Đăng Ký
    NgaySinh DATE,                            -- Ngày Sinh
    GioiTinh VARCHAR(10),                     -- Giới Tính
    TrangThai VARCHAR(50),                    -- Trạng Thái (Ví dụ: Hoạt động, Bị khóa)
    ChucNang VARCHAR(50)					  -- Nguoi dung trong he thong
)user

CREATE TABLE KHOAHOC (
    MaKhoaHoc INT PRIMARY KEY AUTO_INCREMENT, -- Mã Khóa Học (Khóa chính)
    TenKhoaHoc VARCHAR(255) NOT NULL,         -- Tên Khóa Học
    HocPhi INT                                -- Học Phí
    -- Thuộc tính của quan hệ 'co' không rõ ràng, sẽ được thêm nếu có bảng liên quan
);
khoahoc
CREATE TABLE DANGKY (
    MaNguoiDung INT,                        -- Khóa ngoại từ bảng USER
    MaKhoaHoc INT,                          -- Khóa ngoại từ bảng KHOAHOC
    NgayDangKyKH DATE,                      -- Thuộc tính riêng của quan hệ DANGKY
    
    PRIMARY KEY (MaNguoiDung, MaKhoaHoc),   -- Khóa chính kép (Composite Primary Key)
    
    -- Định nghĩa Khóa ngoại
    FOREIGN KEY (MaNguoiDung) REFERENCES USER(MaNguoiDung),
    FOREIGN KEY (MaKhoaHoc) REFERENCES KHOAHOC(MaKhoaHoc)
);