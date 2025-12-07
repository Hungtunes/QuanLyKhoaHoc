package com.hungtunes.app.service;

import com.hungtunes.app.dto.UserCourseRequest;
import com.hungtunes.app.entity.Course;
import com.hungtunes.app.entity.User;
import com.hungtunes.app.entity.UserCourse;
import com.hungtunes.app.entity.UserCourseId;
import com.hungtunes.app.repository.UserCourseRepository;
import com.hungtunes.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserCourseService {
    @Autowired
    private UserCourseRepository userCourseRepository;

    @Autowired
    private UserService userService; // Remove " = new UserService()"

    @Autowired
    private CourseService courseService; // Remove " = new CourseService()"

    public UserCourse addStudentCourse(UserCourseRequest request) {
        if (userService.getUser(String.valueOf(request.getUserId())) == null) {
            return null;
        }
        if (courseService.getCourse(String.valueOf(request.getCourseId())) == null) {
            return null;
        }
        // Tạo composite key
        UserCourseId id = new UserCourseId(request.getUserId(), request.getCourseId());
        User user = userService.getUser(String.valueOf(request.getUserId()));
        Course course = courseService.getCourse(String.valueOf(request.getCourseId()));
        // Tạo entity UserCourse
        UserCourse userCourse = new UserCourse();
        userCourse.setId(id);
        userCourse.setUser(user);
        userCourse.setCourse(course);

        // Lưu vào DB
        return userCourseRepository.save(userCourse);
    }

    public boolean deleteStudentCourse(UserCourseRequest request) {
        UserCourseId id = new UserCourseId(request.getUserId(), request.getCourseId());
        Optional<UserCourse> userCourseOpt = userCourseRepository.findById(id);
        if (userCourseOpt.isPresent()) {
            userCourseRepository.deleteById(id);
            return true;
        } else {
            return false; // Không tìm thấy bản ghi
        }
    }

    public List<User> getStudentsInCourse(int courseId) {
        // Gọi hàm repository vừa viết ở trên
        return userCourseRepository.findUsersByCourseId(courseId);
    }
}
