package com.virtusa.questor.service;

import com.virtusa.questor.dao.UpcomingCourseDAO;
import com.virtusa.questor.dto.UpcomingCourseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UpcomingCourseService {

    @Autowired
    private UpcomingCourseDAO upcomingCourseDAO;

    public UpcomingCourseDTO saveUpcomingCourse(UpcomingCourseDTO upcomingCourseDTO) {
        return upcomingCourseDAO.save(upcomingCourseDTO);
    }

    public List<UpcomingCourseDTO> findAllUpcomingCourses() {
        return upcomingCourseDAO.findAll();
    }

    public UpcomingCourseDTO findUpcomingCourseById(Long id) {
        return upcomingCourseDAO.findById(id);
    }

    public void deleteUpcomingCourseById(Long id) {
        upcomingCourseDAO.deleteById(id);
    }

    public UpcomingCourseDTO updateUpcomingCourseById(Long id, UpcomingCourseDTO upcomingCourseDTO) {
        return upcomingCourseDAO.updateById(id, upcomingCourseDTO);
    }

    public long upcomingCourseCount() {
        return upcomingCourseDAO.upcomingCourseCount();
    }
}
