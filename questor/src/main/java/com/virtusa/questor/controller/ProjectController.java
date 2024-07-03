package com.virtusa.questor.controller;

import com.virtusa.questor.dto.ProjectDTO;
import com.virtusa.questor.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/questor/projects")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @PostMapping("/addProject")
    public ResponseEntity<ProjectDTO> createProject(@RequestBody ProjectDTO projectDTO){
        ProjectDTO savedProject = projectService.saveProject(projectDTO);
        return ResponseEntity.ok(savedProject);
    }

    @GetMapping("/getProject/{id}")
    public ResponseEntity<ProjectDTO> getProjectById(@PathVariable Long id){
        ProjectDTO projectDTO = projectService.getProjectById(id);
        return ResponseEntity.ok(projectDTO);
    }

    @GetMapping
    public ResponseEntity<List<ProjectDTO>> getAllProjects() {
        return ResponseEntity.ok(projectService.getAllProjects());
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ProjectDTO> updateProjectById(@PathVariable Long id, @RequestBody ProjectDTO projectDTO) {
        return ResponseEntity.ok(projectService.updateProjectById(id, projectDTO));
    }

    @PutMapping("/update")
    public ResponseEntity<ProjectDTO> updateProject(@RequestBody ProjectDTO projectDTO) {
        return ResponseEntity.ok(projectService.updateProject(projectDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProjectById(@PathVariable Long id) {
        projectService.deleteProjectById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ProjectDTO>> getProjectsByUserId(@PathVariable Long userId) {
        List<ProjectDTO> projects = projectService.findByUserId(userId);
        return ResponseEntity.ok(projects);
    }

}
