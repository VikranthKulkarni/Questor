package com.virtusa.questor.service;

import com.virtusa.questor.dao.CourseSectionDAO;
import com.virtusa.questor.dto.CourseSectionDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseSectionService {

    @Autowired
    private CourseSectionDAO courseSectionDAO;

    public CourseSectionDTO save(CourseSectionDTO courseSectionDTO){
        return courseSectionDAO.save(courseSectionDTO);
    }

    public List<CourseSectionDTO> findAllSections(){
        return courseSectionDAO.findAll();
    }

    public CourseSectionDTO findSectionById(Long id){
        return courseSectionDAO.findById(id);
    }

    public void deleteSectionById(Long id){
        courseSectionDAO.deleteById(id);
    }

    public List<CourseSectionDTO> findByCourseId(Long courseId) {
        return courseSectionDAO.findByCourseId(courseId);
    }

    public CourseSectionDTO updateSectionById(Long id,CourseSectionDTO courseSectionDTO){
        return courseSectionDAO.updateById(id,courseSectionDTO);
    }

    public CourseSectionDTO updateSection(CourseSectionDTO courseSectionDTO){
        return courseSectionDAO.updateCourseSection(courseSectionDTO);
    }

}
