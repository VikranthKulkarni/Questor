package com.virtusa.questor.dao;

import com.virtusa.questor.dto.BoardDTO;
import com.virtusa.questor.dto.ProjectDTO;
import com.virtusa.questor.model.Board;
import com.virtusa.questor.model.Project;
import com.virtusa.questor.model.User;
import com.virtusa.questor.repository.ProjectRepository;
import com.virtusa.questor.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;

@Component
public class ProjectDAO {

    @Autowired
    private ProjectRepository projectRepo;

    @Autowired
    private BoardDAO boardDAO;

    @Autowired
    private UserRepository userRepo;

    public ProjectDTO save(ProjectDTO projectDTO) {
        Project projectModel = toModel(projectDTO);
        User userModel = userRepo.findById(projectDTO.getUserId()).orElse(null);
        if (userModel != null) {
            projectModel.setUser(userModel);
            projectModel = projectRepo.save(projectModel);
            return toDTO(projectModel);
        } else {
            throw new IllegalArgumentException("userId not Found:" + projectDTO.getUserId());
        }
    }

    public ProjectDTO findById(Long id) {
        Project projectModel = projectRepo.findById(id).orElse(null);
        return projectModel != null ? toDTO(projectModel) : null;
    }

    public List<ProjectDTO> findAll() {
        List<Project> projects = projectRepo.findAll();
        return projects.stream().map(this::toDTO).collect(Collectors.toList());
    }

    public ProjectDTO updateProjectById(Long id, ProjectDTO projectDTO) {
        Project existingProject = projectRepo.findById(id).orElse(null);
        if (existingProject != null) {
            updateProjectModel(existingProject, projectDTO);
            existingProject = projectRepo.save(existingProject);
            return toDTO(existingProject);
        } else {
            throw new IllegalArgumentException("Project Not found" + projectDTO.getUserId());
        }
    }

    public ProjectDTO updateProject(ProjectDTO projectDTO) {
        Project existingProject = projectRepo.findById(projectDTO.getProjectId()).orElse(null);
        if (existingProject != null) {
            updateProjectModel(existingProject, projectDTO);
            existingProject = projectRepo.save(existingProject);
            return toDTO(existingProject);
        } else {
            throw new IllegalArgumentException("Project not Found" + projectDTO.getProjectId());
        }
    }

    private void updateProjectModel(Project existingProject, ProjectDTO projectDTO) {
        existingProject.setTitle(projectDTO.getTitle());
        existingProject.setDescription(projectDTO.getDescription());
        existingProject.setStatus(projectDTO.getStatus());
        existingProject.setStartDate(projectDTO.getStartDate());

        if (projectDTO.getUserId() != null) {
            User userModel = userRepo.findById(projectDTO.getUserId()).orElse(null);
            if (userModel != null) {
                existingProject.setUser(userModel);
            }
        }

        updateProjectBoards(existingProject, projectDTO.getBoards());
    }

    private void updateProjectBoards(Project existingProject, List<BoardDTO> boardDTOs) {
        if (boardDTOs == null) {
            return;
        }

        Map<Long, Board> existingBoardsMap = existingProject.getBoards().stream()
                .collect(Collectors.toMap(Board::getBoardId, board -> board));

        List<Board> updatedBoards = new ArrayList<>();

        for (BoardDTO boardDTO : boardDTOs) {
            Board board = existingBoardsMap.getOrDefault(boardDTO.getBoardId(), new Board());
            board.setName(boardDTO.getName());
            board.setProject(existingProject);
            updatedBoards.add(board);
        }

        existingProject.getBoards().clear();
        existingProject.getBoards().addAll(updatedBoards);
    }

    public void deleteById(Long id) {
        Project project = projectRepo.findById(id).orElse(null);
        if (project != null) {
            projectRepo.delete(project);
        } else {
            throw new IllegalArgumentException("Project not found" + id);
        }
    }

    public List<ProjectDTO> findProjectsByUserID(Long userId) {
        List<Project> projects = projectRepo.findByUserId(userId);
        return projects.stream().map(this::toDTO).collect(Collectors.toList());
    }

    public ProjectDTO toDTO(Project project) {
        if (project == null) {
            return null;
        }
        return ProjectDTO.builder()
                .projectId(project.getProjectId())
                .title(project.getTitle())
                .description(project.getDescription())
                .status(project.getStatus())
                .startDate(project.getStartDate())
                .userId(project.getUser() != null ? project.getUser().getUserId() : null)
                .boards(project.getBoards() != null ? project.getBoards().stream().map(boardDAO::toDTO).collect(Collectors.toList()) : null)
                .build();
    }

    public Project toModel(ProjectDTO projectDTO) {
        if (projectDTO == null) {
            return null;
        }
        Project project = Project.builder()
                .projectId(projectDTO.getProjectId())
                .title(projectDTO.getTitle())
                .description(projectDTO.getDescription())
                .status(projectDTO.getStatus())
                .startDate(projectDTO.getStartDate())
                .build();

        if (projectDTO.getUserId() != null) {
            User user = userRepo.findById(projectDTO.getUserId()).orElse(null);
            if (user != null) {
                project.setUser(user);
            }
        }
        return project;
    }
}
