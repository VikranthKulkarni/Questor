package com.virtusa.questor.dao;

import com.virtusa.questor.dto.CourseRequestDTO;
import com.virtusa.questor.dto.ProjectDTO;
import com.virtusa.questor.model.CourseRequest;
import com.virtusa.questor.model.Project;
import com.virtusa.questor.repository.CourseRequestRepository;
import com.virtusa.questor.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CourseRequestDAO {

    @Autowired
    private CourseRequestRepository courseRequestRepository;

    @Autowired
    private UserRepository userRepository;

    public CourseRequestDTO save(CourseRequestDTO courseRequestDTO) {
        CourseRequest courseRequest = toModel(courseRequestDTO);
        courseRequest = courseRequestRepository.save(courseRequest);
        return toDTO(courseRequest);
    }

    public CourseRequestDTO findById(Long id) {
        CourseRequest courseRequest = courseRequestRepository.findById(id).orElse(null);
        return courseRequest != null ? toDTO(courseRequest) : null;
    }

    public List<CourseRequestDTO> findAll() {
        List<CourseRequest> courseRequests = courseRequestRepository.findAll();
        return courseRequests.stream().map(this::toDTO).collect(Collectors.toList());
    }

    public CourseRequestDTO updateById(Long id, CourseRequestDTO courseRequestDTO) {
        CourseRequest existingCourseRequest = courseRequestRepository.findById(id).orElse(null);
        if (existingCourseRequest != null) {
            updateCourseRequestDetails(existingCourseRequest, courseRequestDTO);
            existingCourseRequest = courseRequestRepository.save(existingCourseRequest);
            return toDTO(existingCourseRequest);
        } else {
            throw new IllegalArgumentException("CourseRequest not found: " + id);
        }
    }

    public void deleteById(Long id) {
        CourseRequest courseRequest = courseRequestRepository.findById(id).orElse(null);
        if (courseRequest != null) {
            courseRequestRepository.delete(courseRequest);
        } else {
            throw new IllegalArgumentException("CourseRequest not found: " + id);
        }
    }

    private void updateCourseRequestDetails(CourseRequest existingCourseRequest, CourseRequestDTO courseRequestDTO) {
        existingCourseRequest.setCourseName(courseRequestDTO.getCourseName());
        existingCourseRequest.setCourseDescription(courseRequestDTO.getCourseDescription());
        existingCourseRequest.setCategory(courseRequestDTO.getCategory());
        existingCourseRequest.setJustification(courseRequestDTO.getJustification());
        existingCourseRequest.setRequestedDate(courseRequestDTO.getRequestedDate());
        existingCourseRequest.setStatus(courseRequestDTO.getStatus());
        existingCourseRequest.setAdminComments(courseRequestDTO.getAdminComments());
    }

    public List<CourseRequestDTO> findRequestsByUserId(Long userId){
        List<CourseRequest> courseRequests = courseRequestRepository.findByUserId(userId);
        return courseRequests.stream().map(this::toDTO).toList();
    }

    public CourseRequestDTO toDTO(CourseRequest courseRequest){
        if(courseRequest == null){
            return null;
        }

        return CourseRequestDTO.builder()
                .requestId(courseRequest.getRequestId())
                .courseName(courseRequest.getCourseName())
                .courseDescription(courseRequest.getCourseDescription())
                .category(courseRequest.getCategory())
                .justification(courseRequest.getJustification())
                .requestedDate(courseRequest.getRequestedDate())
                .status(courseRequest.getStatus())
                .adminComments(courseRequest.getAdminComments())
                .userId(courseRequest.getUser().getUserId())
                .build();
    }

    public CourseRequest toModel(CourseRequestDTO courseRequestDTO){
        if(courseRequestDTO == null){
            return null;
        }

        return CourseRequest.builder()
                .requestId(courseRequestDTO.getRequestId())
                .courseName(courseRequestDTO.getCourseName())
                .courseDescription(courseRequestDTO.getCourseDescription())
                .category(courseRequestDTO.getCategory())
                .justification(courseRequestDTO.getJustification())
                .requestedDate(courseRequestDTO.getRequestedDate())
                .status(courseRequestDTO.getStatus())
                .adminComments(courseRequestDTO.getAdminComments())
                .user(userRepository.findById(courseRequestDTO.getUserId()).orElse(null))
                .build();
    }


}
