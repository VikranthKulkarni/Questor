package com.virtusa.questor.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SectionContent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="content_id")
    private Long contentId;

    private String title;
    private String type;
    private String duration;
    private String description;
    private String url;

    @ManyToOne
    @JoinColumn(name = "section_id")
    private CourseSection section;

}
