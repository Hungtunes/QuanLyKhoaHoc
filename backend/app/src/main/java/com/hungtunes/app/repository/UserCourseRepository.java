package com.hungtunes.app.repository;

import com.hungtunes.app.entity.User;
import com.hungtunes.app.entity.UserCourse;
import com.hungtunes.app.entity.UserCourseId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserCourseRepository extends JpaRepository<UserCourse, UserCourseId> {
    @Query("SELECT uc.user FROM UserCourse uc WHERE uc.id.courseId = :courseId")
    List<User> findUsersByCourseId(@Param("courseId") int courseId);
}

