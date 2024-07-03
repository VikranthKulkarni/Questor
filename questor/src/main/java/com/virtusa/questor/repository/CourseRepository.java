package com.virtusa.questor.repository;

import com.virtusa.questor.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {

    @Query("select c from Course c where c.category.categoryId = :categoryId")
    List<Course> findByCategoryId(Long categoryId);

}