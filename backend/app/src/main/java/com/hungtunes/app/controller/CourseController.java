package com.hungtunes.app.controller;

import com.hungtunes.app.dto.CourseRequest;
import com.hungtunes.app.entity.Course;
import com.hungtunes.app.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/courses")
@CrossOrigin(origins = "http://localhost:3000")
public class CourseController {
    @Autowired
    private CourseService courseService;

    @PostMapping
    Course createCourse(@RequestBody CourseRequest request) {
        return courseService.createCourse(request);
    }

    @GetMapping
    List<Course> getCourse() {
        return courseService.getCourses();
    }

    @PutMapping("/{id}")
    Course updateCourse(@PathVariable String id, @RequestBody CourseRequest request) {
        return courseService.updateCourse(id, request);
    }

    @DeleteMapping("/{id}")
    String deleteCourse(@PathVariable String id) {
        boolean check = courseService.deleteCourse(id);
        if (check) return "Da xoa khoa hoc";
        return "Khong ton tai khoa hoc";
    }
}
