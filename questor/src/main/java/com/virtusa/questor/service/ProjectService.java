package com.virtusa.questor.service;

import com.virtusa.questor.dao.ProjectDAO;
import com.virtusa.questor.dto.ProjectDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    @Autowired
    private ProjectDAO projectDAO;

    public ProjectDTO saveProject(ProjectDTO projectDTO){
        return projectDAO.save(projectDTO);
    }

    public ProjectDTO getProjectById(Long id){
        return projectDAO.findById(id);
    }

    public List<ProjectDTO> getAllProjects() {
        return projectDAO.findAll();
    }

    public ProjectDTO updateProjectById(Long id, ProjectDTO projectDTO) {
        return projectDAO.updateProjectById(id, projectDTO);
    }

    public ProjectDTO updateProject(ProjectDTO projectDTO) {
        return projectDAO.updateProject(projectDTO);
    }

    public void deleteProjectById(Long id) {
        projectDAO.deleteById(id);
    }

    public List<ProjectDTO> findByUserId(Long userId){
        return  projectDAO.findProjectsByUserID(userId);
    }

}