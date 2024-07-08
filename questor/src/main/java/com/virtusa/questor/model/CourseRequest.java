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
public class CourseRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long requestId;
    private String courseName;
    private String courseDescription;
    private String category;
    private String justification;
    private Date requestedDate;
    private String status;
    private String adminComments;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
