package com.virtusa.questor.controller;

import com.virtusa.questor.dto.CourseRequestDTO;
import com.virtusa.questor.service.CourseRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/questor/courseRequests")
public class CourseRequestController {

    @Autowired
    private CourseRequestService courseRequestService;

    @PostMapping("/addCourseRequest")
    public ResponseEntity<CourseRequestDTO> createCourseRequest(@RequestBody CourseRequestDTO courseRequestDTO) {
        CourseRequestDTO savedCourseRequest = courseRequestService.saveCourseRequest(courseRequestDTO);
        return ResponseEntity.ok(savedCourseRequest);
    }

    @GetMapping("/getCourseRequest/{id}")
    public ResponseEntity<CourseRequestDTO> getCourseRequestById(@PathVariable Long id) {
        CourseRequestDTO courseRequestDTO = courseRequestService.getCourseRequestById(id);
        return ResponseEntity.ok(courseRequestDTO);
    }

    @GetMapping
    public ResponseEntity<List<CourseRequestDTO>> getAllCourseRequests() {
        return ResponseEntity.ok(courseRequestService.getAllCourseRequests());
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<CourseRequestDTO> updateCourseRequestById(@PathVariable Long id, @RequestBody CourseRequestDTO courseRequestDTO) {
        return ResponseEntity.ok(courseRequestService.updateCourseRequestById(id, courseRequestDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourseRequestById(@PathVariable Long id) {
        courseRequestService.deleteCourseRequestById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/byUser/{userId}")
    public List<CourseRequestDTO> findRequestsByUserId(@PathVariable Long userId){
        return courseRequestService.findRequestsByUserId(userId);
    }
}
