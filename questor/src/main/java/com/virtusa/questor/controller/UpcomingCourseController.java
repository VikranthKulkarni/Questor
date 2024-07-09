package com.virtusa.questor.controller;

import com.virtusa.questor.dto.UpcomingCourseDTO;
import com.virtusa.questor.service.UpcomingCourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/questor/upcoming-courses")
public class UpcomingCourseController {

    @Autowired
    private UpcomingCourseService upcomingCourseService;

    @GetMapping("/count")
    public long upcomingCourseCount() {
        return upcomingCourseService.upcomingCourseCount();
    }

    @PostMapping("/addUpcomingCourse")
    public ResponseEntity<UpcomingCourseDTO> createUpcomingCourse(@RequestBody UpcomingCourseDTO upcomingCourseDTO) {
        UpcomingCourseDTO savedUpcomingCourse = upcomingCourseService.saveUpcomingCourse(upcomingCourseDTO);
        return ResponseEntity.ok(savedUpcomingCourse);
    }

    @GetMapping("/getUpcomingCourse/{id}")
    public ResponseEntity<UpcomingCourseDTO> getUpcomingCourseById(@PathVariable Long id) {
        UpcomingCourseDTO upcomingCourseDTO = upcomingCourseService.findUpcomingCourseById(id);
        return ResponseEntity.ok(upcomingCourseDTO);
    }

    @GetMapping("/getAllUpcomingCourses")
    public ResponseEntity<List<UpcomingCourseDTO>> getAllUpcomingCourses() {
        List<UpcomingCourseDTO> upcomingCourses = upcomingCourseService.findAllUpcomingCourses();
        return ResponseEntity.ok(upcomingCourses);
    }

    @DeleteMapping("/deleteUpcomingCourse/{id}")
    public ResponseEntity<Void> deleteUpcomingCourseById(@PathVariable Long id) {
        upcomingCourseService.deleteUpcomingCourseById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/updateUpcomingCourseById/{id}")
    public UpcomingCourseDTO updateUpcomingCourseById(@PathVariable Long id, @RequestBody UpcomingCourseDTO upcomingCourseDTO) {
        return upcomingCourseService.updateUpcomingCourseById(id, upcomingCourseDTO);
    }

    @PutMapping("/updateUpcomingCourse")
    public UpcomingCourseDTO updateUpcomingCourse(@RequestBody UpcomingCourseDTO upcomingCourseDTO) {
        return upcomingCourseService.updateUpcomingCourseById(upcomingCourseDTO.getUpcomingCourseId(), upcomingCourseDTO);
    }
}
