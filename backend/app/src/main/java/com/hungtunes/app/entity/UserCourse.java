package com.hungtunes.app.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "usercourse")
public class UserCourse {

    @EmbeddedId
    private UserCourseId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")   // ánh xạ userId trong UserCourseId
    @JoinColumn(name = "userid")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("courseId") // ánh xạ courseId trong UserCourseId
    @JoinColumn(name = "courseid")
    private Course course;

    @Column(name = "dayadd")
    private LocalDate dayAdd = LocalDate.now();

    public UserCourse() {}

    public UserCourse(User user, Course course, LocalDate dayAdd) {
        this.user = user;
        this.course = course;
        this.dayAdd = dayAdd;

        this.id = new UserCourseId(user.getMaNguoiDung(), course.getId());
    }

    public UserCourseId getId() {
        return id;
    }

    public void setId(UserCourseId id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

}

