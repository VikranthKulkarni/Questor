package com.virtusa.questor.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CourseSectionDTO {

    private Long sectionId;
    private String sectionName;
    private String description;
    private Long courseId;
    private List<SectionContentDTO> contents;

}
