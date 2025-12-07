package com.hungtunes.app.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaNguoiDung")
    private Integer maNguoiDung; // int AI PK

    @Column(name = "Email", length = 100, unique = true, nullable = false)
    private String email; // varchar(100)

    @Column(name = "PasswordHash", length = 255, nullable = false)
    private String passwordHash; // varchar(255)

    @Column(name = "HoTen", length = 100)
    private String hoTen; // varchar(100)

    @Column(name = "SoDienThoai", length = 20)
    private String soDienThoai; // varchar(20)

    @Column(name = "NgayDangKy", nullable = false)
    private LocalDate ngayDangKy = LocalDate.now(); // date

    @Column(name = "NgaySinh")
    private LocalDate ngaySinh; // date

    @Column(name = "GioiTinh", length = 10)
    private String gioiTinh; // varchar(10)

    @Column(name = "TrangThai", length = 50)
    private String trangThai; // varchar(50)

    @Column(name = "ChucNang", length = 50)
    private String chucNang; // varchar(50)

    // Constructor mặc định (cần thiết cho JPA)
    public User() {
    }

    public User(Integer maNguoiDung, String email, String passwordHash, String hoTen, String soDienThoai, LocalDate ngayDangKy, LocalDate ngaySinh, String gioiTinh, String trangThai, String chucNang) {
        this.maNguoiDung = maNguoiDung;
        this.email = email;
        this.passwordHash = passwordHash;
        this.hoTen = hoTen;
        this.soDienThoai = soDienThoai;
        this.ngayDangKy = ngayDangKy;
        this.ngaySinh = ngaySinh;
        this.gioiTinh = gioiTinh;
        this.trangThai = trangThai;
        this.chucNang = chucNang;
    }

    public Integer getMaNguoiDung() {
        return maNguoiDung;
    }

    public void setMaNguoiDung(Integer maNguoiDung) {
        this.maNguoiDung = maNguoiDung;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public String getHoTen() {
        return hoTen;
    }

    public void setHoTen(String hoTen) {
        this.hoTen = hoTen;
    }

    public String getSoDienThoai() {
        return soDienThoai;
    }

    public void setSoDienThoai(String soDienThoai) {
        this.soDienThoai = soDienThoai;
    }

    public LocalDate getNgayDangKy() {
        return ngayDangKy;
    }

    public void setNgayDangKy(LocalDate ngayDangKy) {
        this.ngayDangKy = ngayDangKy;
    }

    public LocalDate getNgaySinh() {
        return ngaySinh;
    }

    public void setNgaySinh(LocalDate ngaySinh) {
        this.ngaySinh = ngaySinh;
    }

    public String getGioiTinh() {
        return gioiTinh;
    }

    public void setGioiTinh(String gioiTinh) {
        this.gioiTinh = gioiTinh;
    }

    public String getTrangThai() {
        return trangThai;
    }

    public void setTrangThai(String trangThai) {
        this.trangThai = trangThai;
    }

    public String getChucNang() {
        return chucNang;
    }

    public void setChucNang(String chucNang) {
        this.chucNang = chucNang;
    }
}
