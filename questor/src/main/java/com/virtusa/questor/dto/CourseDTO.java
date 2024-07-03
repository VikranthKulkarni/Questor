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
public class CourseDTO {

    private Long courseId;
    private String courseName;
    private String description;
    private String duration;
    private Long categoryId;
    private String courseImage;
    private List<CourseSectionDTO> courseSections;
    private List<WishlistDTO> wishlists;
    private List<UserDTO> users;


}
