package com.virtusa.questor.repository;

import com.virtusa.questor.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    @Query("select p from Project p where p.user.userId = :userId")
    List<Project> findByUserId(Long userId);

}