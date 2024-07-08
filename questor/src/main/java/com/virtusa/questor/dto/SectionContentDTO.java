package com.virtusa.questor.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SectionContentDTO {

    private Long contentId;
    private String title;
    private String type;
    private String duration;
    private String description;
    private String url;
    private Long sectionId;

}
