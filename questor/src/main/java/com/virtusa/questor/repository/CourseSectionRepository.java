package com.virtusa.questor.repository;

import com.virtusa.questor.model.CourseSection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseSectionRepository extends JpaRepository<CourseSection, Long> {

    @Query("select c from CourseSection c where c.course.courseId = :courseId")
    List<CourseSection> findByCourseId(Long courseId);

}