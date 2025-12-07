package com.hungtunes.app.repository;

import com.hungtunes.app.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, String> {

}
