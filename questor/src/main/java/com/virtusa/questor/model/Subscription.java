package com.virtusa.questor.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Subscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long subscriptionId;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "subscription", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Transaction> transactions;

    @Enumerated(EnumType.STRING)
    private PlanDetails planDetails;

    private Date startDate;
    private Date endDate;

    @Enumerated(EnumType.STRING)
    private Status status;


    public enum PlanDetails {
        BASIC, PREMIUM, FREE
    }

    public enum Status {
        ACTIVE, INACTIVE
    }

}
