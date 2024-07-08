package com.virtusa.questor.dto;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;

import java.util.Date;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    private Long userId;
    private String userName;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private Date dob;
    private String bio;
    private byte[] imageData;
    private String phoneNumber;

    private Date createdDate;

    @Enumerated(EnumType.STRING)
    private UserStatus userStatus;



    private List<ProjectDTO> projects;
    private WishlistDTO wishlist;
    private List<CourseRequestDTO> courseRequests;

    public enum UserStatus {
        BLOCK, UNBLOCK
    }

}