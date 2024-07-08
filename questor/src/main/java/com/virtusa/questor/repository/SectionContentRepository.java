package com.virtusa.questor.repository;

import com.virtusa.questor.model.SectionContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SectionContentRepository extends JpaRepository<SectionContent, Long> {

    @Query("select c from SectionContent c where c.section.sectionId= :sectionId")
    List<SectionContent> findBySectionId(Long sectionId);

}