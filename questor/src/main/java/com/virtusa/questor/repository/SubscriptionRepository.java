package com.virtusa.questor.repository;

import com.virtusa.questor.model.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription , Long> {

    @Query("select s from Subscription s where s.user.userId = :userId")
    Subscription findByUserId(Long userId);

}
