package com.virtusa.questor.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SubscriptionDTO {

    private Long subscriptionId;
    private Long userId;
    private PlanDetails planDetails;
    private Date startDate;
    private Date endDate;
    private Status status;
    private List<TransactionDTO> transactionDTOS;

    public enum PlanDetails {
        BASIC, PREMIUM, FREE
    }

    public enum Status {
        ACTIVE, INACTIVE
    }

}
