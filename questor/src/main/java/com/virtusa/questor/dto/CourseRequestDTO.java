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
public class CourseRequestDTO {

    private Long requestId;
    private String courseName;
    private String courseDescription;
    private String category;
    private String justification;
    private Date requestedDate;
    private String status;
    private String adminComments;
    private Long userId;

}
