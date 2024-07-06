package com.virtusa.questor.service;

import com.virtusa.questor.dao.CourseRequestDAO;
import com.virtusa.questor.dto.CourseRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseRequestService {

    @Autowired
    private CourseRequestDAO courseRequestDAO;

    public CourseRequestDTO saveCourseRequest(CourseRequestDTO courseRequestDTO) {
        return courseRequestDAO.save(courseRequestDTO);
    }

    public CourseRequestDTO getCourseRequestById(Long id) {
        return courseRequestDAO.findById(id);
    }

    public List<CourseRequestDTO> getAllCourseRequests() {
        return courseRequestDAO.findAll();
    }

    public CourseRequestDTO updateCourseRequestById(Long id, CourseRequestDTO courseRequestDTO) {
        return courseRequestDAO.updateById(id, courseRequestDTO);
    }

    public void deleteCourseRequestById(Long id) {
        courseRequestDAO.deleteById(id);
    }

    public List<CourseRequestDTO> findRequestsByUserId(Long userId){
        return courseRequestDAO.findRequestsByUserId(userId);
    }
}
