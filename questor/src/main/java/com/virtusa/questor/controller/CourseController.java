package com.virtusa.questor.controller;

import com.virtusa.questor.dto.CourseDTO;
import com.virtusa.questor.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/questor/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @GetMapping("/count")
    public long courseCount(){
        return courseService.courseCount();
    }

    @PostMapping("/addCourse")
    public ResponseEntity<CourseDTO> createCourse(@RequestBody CourseDTO courseDTO){
        CourseDTO savedCourse = courseService.saveCourse(courseDTO);
        return ResponseEntity.ok(savedCourse);
    }

    @GetMapping("/getCourse/{id}")
    public ResponseEntity<CourseDTO> getCourseById(@PathVariable Long id){
        CourseDTO courseDTO = courseService.findCourseById(id);
        return ResponseEntity.ok(courseDTO);
    }

    @GetMapping("/getAllCourses")
    public ResponseEntity<List<CourseDTO>> getAllCourses(){
        List<CourseDTO> courses = courseService.findAllCourses();
        return ResponseEntity.ok(courses);
    }

    @GetMapping("/getByCategoryId/{categoryId}")
    public List<CourseDTO> getCoursesByCategoryId(@PathVariable Long categoryId){
        return courseService.findByCategoryId(categoryId);
    }

    @DeleteMapping("/deleteCourse/{id}")
    public ResponseEntity<Void> deleteCourseById(@PathVariable Long id){
        courseService.deleteCourseById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/updateById/{id}")
    public CourseDTO updateCourseById(@PathVariable Long id, @RequestBody CourseDTO courseDTO){
        return courseService.updateById(id,courseDTO);
    }

    @PutMapping("/updateCourse")
    public CourseDTO updateCourse(@RequestBody CourseDTO courseDTO){
        return courseService.updateCourse(courseDTO);
    }

}