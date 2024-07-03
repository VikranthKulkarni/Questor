package com.virtusa.questor.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProjectDTO {

    private Long projectId;
    private String title;
    private String description;
    private String status;
    private Date startDate;
    private Long userId;
    private List<BoardDTO> boards;

}