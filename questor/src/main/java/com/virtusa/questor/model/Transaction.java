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
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, unique = true)
    private Long transactionId;

    @ManyToOne
    @JoinColumn(name = "subscription_id")
    private Subscription subscription;

    private Date paymentDate;
    private Double amount;
    private String paymentMethod;


}
