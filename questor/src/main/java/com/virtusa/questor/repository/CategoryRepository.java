package com.virtusa.questor.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.virtusa.questor.model.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
}