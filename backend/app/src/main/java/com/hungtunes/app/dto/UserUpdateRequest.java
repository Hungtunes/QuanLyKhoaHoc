package com.hungtunes.app.dto;

import java.time.LocalDate;

public class UserUpdateRequest {

    private String passwordHash; // varchar(255)
    private String hoTen; // varchar(100)
    private String soDienThoai; // varchar(20)
    private LocalDate ngaySinh; // date
    private String gioiTinh; // varchar(10)
    private String trangThai; // varchar(50)
    private String chucNang; // varchar(50)

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
