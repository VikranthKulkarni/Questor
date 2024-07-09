package com.virtusa.questor.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpcomingCourse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "upcoming_course_id")
    private Long upcomingCourseId;

    @Column(name = "course_name", nullable = false)
    private String courseName;

    private String description;

    private String expectedDuration;

    private String promotionalImage;

    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "category_id")
    private Category category;

    @Column(name = "expected_release_date")
    private Date expectedReleaseDate;

    @Column(name = "status")
    private String status;  // e.g., "In Development", "Coming Soon", "Announced"


    @Column(name = "prerequisites")
    private String prerequisites;

    @Column(name = "promotional_description")
    private String promotionalDescription;

    // Other fields relevant to an upcoming course can be added here
}
