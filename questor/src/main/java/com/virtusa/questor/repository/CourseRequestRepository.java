package com.virtusa.questor.repository;

import com.virtusa.questor.model.CourseRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRequestRepository extends JpaRepository<CourseRequest, Long> {

    @Query("select c from CourseRequest c where c.user.userId = :userId")
    List<CourseRequest> findByUserId(Long userId);

}
