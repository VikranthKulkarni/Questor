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
public class UpcomingCourseDTO {

    private Long upcomingCourseId;
    private String courseName;
    private String description;
    private String expectedDuration;
    private Long categoryId;
    private String promotionalImage;
    private Date expectedReleaseDate;
    private String status;
    private String prerequisites;
    private String promotionalDescription;

}
