package com.virtusa.questor.repository;

import com.virtusa.questor.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction,Long> {

    @Query("select t from Transaction t where t.subscription.subscriptionId = :subscriptionId")
    List<Transaction> findBySubscriptionId(Long subscriptionId);

    @Query("SELECT t FROM Transaction t WHERE t.subscription.user.userId = :userId")
    List<Transaction> findByUserId(Long userId);

    @Query("select sum(t.amount) from Transaction t")
    Double findTotalAmount();

    @Query("select sum(t.amount) from Transaction t where t.paymentDate >= :startDate")
    Double findTotalAmountInLastThreeMonths(Date startDate);

    @Query("SELECT FUNCTION('DATE_FORMAT', t.paymentDate, '%Y-%m') as month, SUM(t.amount) as revenue " +
            "FROM Transaction t " +
            "GROUP BY FUNCTION('DATE_FORMAT', t.paymentDate, '%Y-%m')")
    List<Object[]> findRevenueDataByMonth();

}
