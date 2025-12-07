package com.hungtunes.app.dto;

import com.hungtunes.app.entity.Course;
import com.hungtunes.app.entity.User;

public class UserCourseRequest {
    private int userId;
    private int courseId;

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getCourseId() {
        return courseId;
    }

    public void setCourseId(int courseId) {
        this.courseId = courseId;
    }
}
