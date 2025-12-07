package com.hungtunes.app.service;

import com.hungtunes.app.controller.CourseController;
import com.hungtunes.app.dto.CourseRequest;
import com.hungtunes.app.entity.Course;
import com.hungtunes.app.entity.User;
import com.hungtunes.app.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {
    @Autowired
    CourseRepository courseRepository;

    public Course createCourse(CourseRequest request) {
        Course course = new Course();

        course.setCourseName(request.getCourseName());
        course.setDes(request.getDes());

        return courseRepository.save(course);
    }

    public List<Course> getCourses() {
        return courseRepository.findAll();
    }

    public Course getCourse(String id) {
        return courseRepository.findById(id).orElse(null);
    }

    public Course updateCourse(String id, CourseRequest request) {
        Course course = getCourse(id);

        course.setCourseName(request.getCourseName());
        course.setDes(request.getDes());

        return courseRepository.save(course);
    }

    public boolean deleteCourse(String id) {
        Optional<Course> course = courseRepository.findById(id);

        if (course.isEmpty()) {
            return false;
        }

        courseRepository.deleteById(id);
        return true;
    }
}
