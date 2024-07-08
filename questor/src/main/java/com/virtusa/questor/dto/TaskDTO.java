package com.virtusa.questor.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TaskDTO {

    private Long taskId;
    private String name;
    private String description;
    private Date dueDate;
    private Priority priority;
    private Long boardId;

    public enum Priority {
        LOW, MED, HIGH
    }

}