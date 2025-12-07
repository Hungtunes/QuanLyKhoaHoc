package com.hungtunes.app.service;

import com.hungtunes.app.dto.UserCreationRequest;
import com.hungtunes.app.dto.UserUpdateRequest;
import com.hungtunes.app.entity.User;
import com.hungtunes.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public User createUser(UserCreationRequest request) {
        User user = new User();

        user.setEmail(request.getEmail());
        user.setPasswordHash(request.getPasswordHash());
        user.setHoTen(request.getHoTen());
        user.setSoDienThoai(request.getSoDienThoai());
        user.setNgaySinh(request.getNgaySinh());
        user.setGioiTinh(request.getGioiTinh());
        user.setTrangThai(request.getTrangThai());
        user.setChucNang(request.getChucNang());

        return userRepository.save(user);
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public User getUser(String id) {
        return userRepository.findById(id).orElse(null);
    }

    public User updateUser(String id, UserUpdateRequest request) {
        User user = getUser(id);

        if (request.getPasswordHash() != null && !request.getPasswordHash().isEmpty())
            user.setPasswordHash(request.getPasswordHash());
        user.setHoTen(request.getHoTen());
        user.setSoDienThoai(request.getSoDienThoai());
        user.setNgaySinh(request.getNgaySinh());
        user.setGioiTinh(request.getGioiTinh());
        user.setTrangThai(request.getTrangThai());
        user.setChucNang(request.getChucNang());

        return userRepository.save(user);
    }

    public boolean deleteUser(String userID) {
        Optional<User> user = userRepository.findById(userID);

        if (user.isEmpty()) {
            return false;
        }

        userRepository.deleteById(userID);
        return true;
    }
}
