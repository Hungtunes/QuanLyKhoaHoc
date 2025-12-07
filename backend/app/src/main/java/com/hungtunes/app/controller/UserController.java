package com.hungtunes.app.controller;

import com.hungtunes.app.dto.UserCreationRequest;
import com.hungtunes.app.dto.UserUpdateRequest;
import com.hungtunes.app.entity.User;
import com.hungtunes.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping
    User createUser(@RequestBody UserCreationRequest request) {
        return userService.createUser(request);
    }

    @GetMapping
    List<User> getUsers() {
        return userService.getUsers();
    }

    @GetMapping("/{userID}")
    User getUser(@PathVariable String userID) {
        return  userService.getUser(userID);
    }

    @PutMapping("/{userID}")
    User updateUser(@PathVariable String userID, @RequestBody UserUpdateRequest request) {
        return userService.updateUser(userID, request);
    }

    @DeleteMapping("/{userID}")
    String deleteUser(@PathVariable String userID) {
        boolean check = userService.deleteUser(userID);
        if (check) return "Da xoa user";
        return "Khong ton tai user";
    }
}
