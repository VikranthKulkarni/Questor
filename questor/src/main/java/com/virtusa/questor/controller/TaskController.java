package com.virtusa.questor.controller;

import com.virtusa.questor.dto.TaskDTO;
import com.virtusa.questor.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/questor/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping("/addTask")
    public ResponseEntity<TaskDTO> createTask(@RequestBody TaskDTO tasksDTO){
        TaskDTO savedTask = taskService.saveTask(tasksDTO);
        return ResponseEntity.ok(savedTask);
    }

    @GetMapping("/getTask/{id}")
    public ResponseEntity<TaskDTO> getTaskById(@PathVariable Long id){
        TaskDTO taskDTO = taskService.getTaskById(id);
        return ResponseEntity.ok(taskDTO);
    }

    @GetMapping
    public ResponseEntity<List<TaskDTO>> getAllTasks() {
        return ResponseEntity.ok(taskService.getAllTasks());
    }

    @GetMapping("/byBoardId/{boardId}")
    public List<TaskDTO> getTasksByBoardId(@PathVariable Long boardId){
        return taskService.findTasksByBoardId(boardId);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<TaskDTO> updateTaskById(@PathVariable Long id, @RequestBody TaskDTO taskDTO) {
        System.out.println("Controller: " + taskDTO);
        return ResponseEntity.ok(taskService.updateTaskById(id, taskDTO));
    }

    @PutMapping("/update")
    public ResponseEntity<TaskDTO> updateTask(@RequestBody TaskDTO taskDTO) {
        return ResponseEntity.ok(taskService.updateTask(taskDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTaskById(@PathVariable Long id) {
        taskService.deleteTaskById(id);
        return ResponseEntity.noContent().build();
    }

}