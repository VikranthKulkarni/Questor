package com.virtusa.questor.controller;

import com.virtusa.questor.dto.CourseSectionDTO;
import com.virtusa.questor.service.CourseSectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/questor/sections")
public class CourseSectionController {

    @Autowired
    private CourseSectionService courseSectionService;

    @PostMapping("/addSection")
    public ResponseEntity<CourseSectionDTO> createSection(@RequestBody CourseSectionDTO sectionDTO){
        CourseSectionDTO savedSection = courseSectionService.save(sectionDTO);
        return ResponseEntity.ok(savedSection);
    }

    @GetMapping("/getSection/{id}")
    public ResponseEntity<CourseSectionDTO> getSectionById(@PathVariable Long id){
        CourseSectionDTO sectionDTO = courseSectionService.findSectionById(id);
        return ResponseEntity.ok(sectionDTO);
    }

    @GetMapping("/getAllSections")
    public ResponseEntity<List<CourseSectionDTO>> getAllSections(){
        List<CourseSectionDTO> sections = courseSectionService.findAllSections();
        return ResponseEntity.ok(sections);
    }

    @DeleteMapping("/deleteSection/{id}")
    public ResponseEntity<Void> deleteSectionById(@PathVariable Long id){
        courseSectionService.deleteSectionById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/course/{courseId}")
    public List<CourseSectionDTO> findByCourseId(@PathVariable Long courseId) {
        return courseSectionService.findByCourseId(courseId);
    }

    @PutMapping("/updateSectionById/{id}")
    public CourseSectionDTO updateSectionById(@PathVariable Long id,@RequestBody CourseSectionDTO courseSectionDTO){
        System.out.println("controller:" + courseSectionDTO);
        return courseSectionService.updateSectionById(id,courseSectionDTO);
    }

    @PutMapping("/updateSection")
    public CourseSectionDTO updateSection(@RequestBody CourseSectionDTO courseSectionDTO){
        System.out.println("controller: " + courseSectionDTO);
        return courseSectionService.updateSection(courseSectionDTO);
    }
}
