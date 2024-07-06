package com.virtusa.questor.dao;

import com.virtusa.questor.dto.SubscriptionDTO;
import com.virtusa.questor.dto.TransactionDTO;
import com.virtusa.questor.model.Subscription;
import com.virtusa.questor.model.Transaction;
import com.virtusa.questor.model.User;
import com.virtusa.questor.repository.SubscriptionRepository;
import com.virtusa.questor.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class SubscriptionDAO {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SubscriptionRepository subscriptionRepository;

    @Autowired
    private TransactionDAO transactionDAO;

    public SubscriptionDTO save(SubscriptionDTO subscriptionDTO) {
        System.out.println("DAO:" + subscriptionDTO);
        Subscription subscription = toModel(subscriptionDTO);
        User user = userRepository.findById(subscriptionDTO.getUserId()).orElse(null);

        if (user != null) {
            subscription.setUser(user);
            subscription = subscriptionRepository.save(subscription);
            return toDTO(subscription);
        } else {
            throw new IllegalArgumentException("User not found: " + subscriptionDTO.getUserId());
        }
    }

    public List<SubscriptionDTO> findAllSubscriptions() {
        List<Subscription> subscriptions = subscriptionRepository.findAll();
        return subscriptions.stream().map(this::toDTO).collect(Collectors.toList());
    }

    public SubscriptionDTO findSubscriptionById(Long id) {
        Subscription subscription = subscriptionRepository.findById(id).orElse(null);
        return subscription != null ? toDTO(subscription) : null;
    }

    public SubscriptionDTO updateSubscription(SubscriptionDTO subscriptionDTO) {
        Subscription existingSubscription = subscriptionRepository.findById(subscriptionDTO.getSubscriptionId()).orElse(null);
        if (existingSubscription != null) {
            updateSubscriptionModel(existingSubscription, subscriptionDTO);
            existingSubscription = subscriptionRepository.save(existingSubscription);
            return toDTO(existingSubscription);
        } else {
            throw new IllegalArgumentException("Subscription not found: " + subscriptionDTO.getSubscriptionId());
        }
    }

    public SubscriptionDTO findSubscriptionByUserId(Long userId) {
        Subscription subscription = subscriptionRepository.findByUserId(userId);
        return toDTO(subscription);
    }

    public void deleteSubscriptionByID(Long id) {
        Subscription subscription = subscriptionRepository.findById(id).orElse(null);
        if (subscription != null) {
            subscriptionRepository.delete(subscription);
        } else {
            throw new IllegalArgumentException("Subscription not found: " + id);
        }
    }

    private void updateSubscriptionModel(Subscription existingSubscription, SubscriptionDTO subscriptionDTO) {
        existingSubscription.setPlanDetails(toModelPlanDetails(subscriptionDTO.getPlanDetails()));
        existingSubscription.setStartDate(subscriptionDTO.getStartDate());
        existingSubscription.setEndDate(subscriptionDTO.getEndDate());
        existingSubscription.setStatus(toModelStatus(subscriptionDTO.getStatus()));

        if (subscriptionDTO.getUserId() != null) {
            User user = userRepository.findById(subscriptionDTO.getUserId()).orElse(null);
            if (user != null) {
                existingSubscription.setUser(user);
            }
        }

        appendTransactions(existingSubscription, subscriptionDTO.getTransactionDTOS());
    }

    private void appendTransactions(Subscription existingSubscription, List<TransactionDTO> transactionDTOs) {
        if (transactionDTOs != null && !transactionDTOs.isEmpty()) {
            List<Transaction> newTransactions = transactionDTOs.stream()
                    .map(transactionDAO::toModel)
                    .toList();

            existingSubscription.getTransactions().addAll(newTransactions);
        }
    }

    public SubscriptionDTO toDTO(Subscription subscription) {
        if (subscription == null) {
            return null;
        }
        return SubscriptionDTO.builder()
                .subscriptionId(subscription.getSubscriptionId())
                .userId(subscription.getUser() != null ? subscription.getUser().getUserId() : null)
                .planDetails(toDTOPlanDetails(subscription.getPlanDetails()))
                .startDate(subscription.getStartDate())
                .endDate(subscription.getEndDate())
                .status(toDTOStatus(subscription.getStatus()))
                .transactionDTOS(subscription.getTransactions() != null ? subscription.getTransactions().stream().map(transactionDAO::toDTO).collect(Collectors.toList()) : null)
                .build();
    }

    public Subscription toModel(SubscriptionDTO subscriptionDTO) {
        Subscription subscription = Subscription.builder()
                .subscriptionId(subscriptionDTO.getSubscriptionId())
                .planDetails(toModelPlanDetails(subscriptionDTO.getPlanDetails()))
                .startDate(subscriptionDTO.getStartDate())
                .endDate(subscriptionDTO.getEndDate())
                .status(toModelStatus(subscriptionDTO.getStatus()))
                .build();

        if (subscriptionDTO.getUserId() != null) {
            User user = userRepository.findById(subscriptionDTO.getUserId()).orElse(null);
            if (user != null) {
                subscription.setUser(user);
            }
        }
        return subscription;
    }

    private SubscriptionDTO.PlanDetails toDTOPlanDetails(Subscription.PlanDetails planDetails) {
        if (planDetails == null) {
            return null;
        }
        return switch (planDetails) {
            case BASIC -> SubscriptionDTO.PlanDetails.BASIC;
            case PREMIUM -> SubscriptionDTO.PlanDetails.PREMIUM;
            case FREE -> SubscriptionDTO.PlanDetails.FREE;
        };
    }

    private Subscription.PlanDetails toModelPlanDetails(SubscriptionDTO.PlanDetails planDetails) {
        if (planDetails == null) {
            return null;
        }
        return switch (planDetails) {
            case BASIC -> Subscription.PlanDetails.BASIC;
            case PREMIUM -> Subscription.PlanDetails.PREMIUM;
            case FREE -> Subscription.PlanDetails.FREE;
        };
    }

    private SubscriptionDTO.Status toDTOStatus(Subscription.Status status) {
        if (status == null) {
            return null;
        }
        return switch (status) {
            case ACTIVE -> SubscriptionDTO.Status.ACTIVE;
            case INACTIVE -> SubscriptionDTO.Status.INACTIVE;
        };
    }

    private Subscription.Status toModelStatus(SubscriptionDTO.Status status) {
        if (status == null) {
            return null;
        }
        return switch (status) {
            case ACTIVE -> Subscription.Status.ACTIVE;
            case INACTIVE -> Subscription.Status.INACTIVE;
        };
    }
}
