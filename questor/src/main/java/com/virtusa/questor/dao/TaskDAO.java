package com.virtusa.questor.dao;

import com.virtusa.questor.dto.TaskDTO;
import com.virtusa.questor.model.Board;
import com.virtusa.questor.model.Task;
import com.virtusa.questor.repository.BoardRepository;
import com.virtusa.questor.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class TaskDAO {

    @Autowired
    private TaskRepository tasksRepo;

    @Autowired
    private BoardRepository boardRepo;

    public TaskDTO save(TaskDTO tasksDTO){
        Task tasksModel = toModel(tasksDTO);
        Board board = boardRepo.findById(tasksDTO.getBoardId()).orElse(null);

        if (board != null){
            tasksModel.setBoard(board);
            tasksModel = tasksRepo.save(tasksModel);
            return toDTO(tasksModel);
        } else {
            throw new IllegalArgumentException("Board not found" + tasksDTO.getBoardId());
        }

    }

    public TaskDTO findById(Long id) {
        Task tasks = tasksRepo.findById(id).orElse(null);
        return tasks != null ? toDTO(tasks) : null;
    }

    public List<TaskDTO> getAllTasks(){
        List<Task> tasks = tasksRepo.findAll();
        return tasks.stream().map(this::toDTO).collect(Collectors.toList());
    }

    public List<TaskDTO> findTaskByBoardId(Long boardId){
        List<Task> tasks = tasksRepo.findByBoardId(boardId);
        return tasks.stream().map(this::toDTO).collect(Collectors.toList());
    }

    public TaskDTO updateTaskById(Long id, TaskDTO tasksDTO){
        Task existingTasks = tasksRepo.findById(id).orElse(null);
        if (existingTasks != null){
            Task updatedTask = toModel(tasksDTO);
            updatedTask.setTaskId(id);
            updatedTask = tasksRepo.save(updatedTask);
            return toDTO(updatedTask);
        } else {
            throw new IllegalArgumentException("Tasks not  found" + id);
        }
    }

    public TaskDTO updateTask(TaskDTO tasksDTO){
        Task existingTask = tasksRepo.findById(tasksDTO.getTaskId()).orElse(null);
        if (existingTask != null){
            Task updatedTask = toModel(tasksDTO);
            updatedTask = tasksRepo.save(updatedTask);
            return toDTO(updatedTask);
        } else {
            throw new IllegalArgumentException("Tasks not found" + tasksDTO.getTaskId());
        }
    }

    public void deleteTaskById(Long id){
        Task task = tasksRepo.findById(id).orElse(null);
        if (task != null) {
            tasksRepo.delete(task);
        } else {
            throw new IllegalArgumentException("Tasks not found" + id);
        }
    }

    public TaskDTO toDTO(Task task) {

        if(task == null){
            return null;
        }
        return TaskDTO.builder()
                .taskId(task.getTaskId())
                .name(task.getName())
                .description(task.getDescription())
                .dueDate(task.getDueDate())
                .priority(toDTOPriority(task.getPriority()))
                .boardId(task.getBoard() != null ? task.getBoard().getBoardId() : null)
                .build();
    }

    public Task toModel(TaskDTO tasksDTO){
        Task tasks =  Task.builder()
                .taskId(tasksDTO.getTaskId())
                .name(tasksDTO.getName())
                .description(tasksDTO.getDescription())
                .dueDate(tasksDTO.getDueDate())
                .priority(toModelPriority(tasksDTO.getPriority()))
                .build();

        if (tasksDTO.getBoardId() != null){
            Board board = boardRepo.findById(tasksDTO.getBoardId()).orElse(null);
            if(board != null){
                tasks.setBoard(board);
            }
        }

        return tasks;
    }

    private TaskDTO.Priority toDTOPriority(Task.Priority priority){
        if (priority == null){
            return null;
        }
        switch (priority){
            case LOW:
                return TaskDTO.Priority.LOW;
            case MED:
                return TaskDTO.Priority.MED;
            case HIGH:
                return TaskDTO.Priority.HIGH;
            default:
                throw new IllegalArgumentException("Unknown priority"+priority);
        }
    }

    private Task.Priority toModelPriority(TaskDTO.Priority priority){
        if (priority == null){
            return null;
        }
        switch (priority){
            case LOW:
                return Task.Priority.LOW;
            case MED:
                return Task.Priority.MED;
            case HIGH:
                return Task.Priority.HIGH;
            default:
                throw new IllegalArgumentException("Unknown priority" + priority);
        }
    }

}