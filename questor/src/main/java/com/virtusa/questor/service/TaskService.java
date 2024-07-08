package com.virtusa.questor.service;

import com.virtusa.questor.dao.TaskDAO;
import com.virtusa.questor.dto.TaskDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskDAO tasksDAO;

    public TaskDTO saveTask(TaskDTO tasksDTO){
        return tasksDAO.save(tasksDTO);
    }

    public TaskDTO getTaskById(Long id){
        return tasksDAO.findById(id);
    }

    public List<TaskDTO> getAllTasks() {
        return tasksDAO.getAllTasks();
    }

    public TaskDTO updateTaskById(Long id, TaskDTO tasksDTO) {
        return tasksDAO.updateTaskById(id, tasksDTO);
    }

    public TaskDTO updateTask(TaskDTO tasksDTO) {
        return tasksDAO.updateTask(tasksDTO);
    }

    public void deleteTaskById(Long id) {
        tasksDAO.deleteTaskById(id);
    }

    public List<TaskDTO> findTasksByBoardId(Long boardId){
        return tasksDAO.findTaskByBoardId(boardId);
    }

}