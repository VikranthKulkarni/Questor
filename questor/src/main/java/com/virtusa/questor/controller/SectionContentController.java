package com.virtusa.questor.controller;

import com.virtusa.questor.dto.SectionContentDTO;
import com.virtusa.questor.service.SectionContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/questor/contents")
public class SectionContentController {

    @Autowired
    private SectionContentService sectionContentService;

    @PostMapping("/addContent")
    public ResponseEntity<SectionContentDTO> createContent(@RequestBody SectionContentDTO contentDTO){
        SectionContentDTO savedContent = sectionContentService.saveContent(contentDTO);
        return ResponseEntity.ok(savedContent);
    }

    @GetMapping("/getContent/{id}")
    public ResponseEntity<SectionContentDTO> getContentById(@PathVariable Long id){
        SectionContentDTO contentDTO = sectionContentService.findContentById(id);
        return ResponseEntity.ok(contentDTO);
    }

    @GetMapping("/getAllContents")
    public ResponseEntity<List<SectionContentDTO>> getAllContents(){
        List<SectionContentDTO> contents = sectionContentService.findAllContent();
        return ResponseEntity.ok(contents);
    }

    @DeleteMapping("/deleteContent/{id}")
    public ResponseEntity<Void> deleteContentById(@PathVariable Long id){
        sectionContentService.deleteContentById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/section/{sectionId}")
    public List<SectionContentDTO> findBySectionId(@PathVariable Long sectionId) {
        return sectionContentService.findBySectionId(sectionId);
    }

    @PutMapping("/updateContentById/{id}")
    public SectionContentDTO updateContentById(@PathVariable Long id,@RequestBody SectionContentDTO sectionContentDTO){
        return sectionContentService.updateContentById(id, sectionContentDTO);
    }

    @PutMapping("/updateContent")
    public SectionContentDTO updateContent(@RequestBody SectionContentDTO sectionContentDTO){
        return sectionContentService.updateContent(sectionContentDTO);
    }

}