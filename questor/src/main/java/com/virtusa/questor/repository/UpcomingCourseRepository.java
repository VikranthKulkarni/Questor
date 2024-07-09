package com.virtusa.questor.repository;

import com.virtusa.questor.model.UpcomingCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UpcomingCourseRepository extends JpaRepository<UpcomingCourse, Long> {
    // Additional query methods if needed
}
