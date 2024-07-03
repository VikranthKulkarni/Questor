package com.virtusa.questor.service;

import com.virtusa.questor.dao.CourseDAO;
import com.virtusa.questor.dto.CourseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {

    @Autowired
    private CourseDAO courseDAO;

    public CourseDTO saveCourse(CourseDTO courseDTO){
        return courseDAO.save(courseDTO);
    }

    public List<CourseDTO> findAllCourses(){
        return courseDAO.findAll();
    }

    public CourseDTO findCourseById(Long id){
        return courseDAO.findById(id);
    }

    public void deleteCourseById(Long id){
        courseDAO.deleteById(id);
    }

    public List<CourseDTO> findByCategoryId(Long categoryId){
        return courseDAO.findByCategoryId(categoryId);
    }

    public CourseDTO updateById(Long id, CourseDTO courseDTO){
        return courseDAO.updateById(id,courseDTO);
    }

    public CourseDTO updateCourse(CourseDTO courseDTO){
        return courseDAO.updateCourse(courseDTO);
    }

    public long courseCount(){
        return courseDAO.courseCount();
    }

}
