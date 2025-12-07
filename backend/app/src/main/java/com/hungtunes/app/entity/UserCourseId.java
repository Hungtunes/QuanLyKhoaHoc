package com.hungtunes.app.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class UserCourseId implements Serializable {

    @Column(name = "userid")
    private Integer userId;

    @Column(name = "courseid")
    private Integer courseId;

    public UserCourseId() {}

    public UserCourseId(Integer userId, Integer courseId) {
        this.userId = userId;
        this.courseId = courseId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UserCourseId)) return false;
        UserCourseId that = (UserCourseId) o;
        return Objects.equals(userId, that.userId) &&
                Objects.equals(courseId, that.courseId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, courseId);
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getCourseId() {
        return courseId;
    }

    public void setCourseId(Integer courseId) {
        this.courseId = courseId;
    }
}
