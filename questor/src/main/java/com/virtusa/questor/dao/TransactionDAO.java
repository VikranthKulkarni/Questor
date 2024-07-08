package com.virtusa.questor.dao;

import com.virtusa.questor.dto.TransactionDTO;
import com.virtusa.questor.model.Subscription;
import com.virtusa.questor.model.Transaction;
import com.virtusa.questor.repository.SubscriptionRepository;
import com.virtusa.questor.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class TransactionDAO {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private SubscriptionRepository subscriptionRepository;

    public Double findTotalAmount(){
        return transactionRepository.findTotalAmount();
    }


    public Double findTotalAmountInLastThreeMonths(){
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MONTH, -3);
        Date threeMonthsAgo = calendar.getTime();
        return transactionRepository.findTotalAmountInLastThreeMonths(threeMonthsAgo);
    }


    public List<TransactionDTO> getRevenueDataByMonth() {
        List<Object[]> results = transactionRepository.findRevenueDataByMonth();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM");

        return results.stream()
                .map(result -> TransactionDTO.builder()
                        .paymentDate(parseDate(result[0].toString(), dateFormat))
                        .amount((Double) result[1])
                        .build())
                .collect(Collectors.toList());
    }

    private Date parseDate(String dateStr, SimpleDateFormat dateFormat) {
        try {
            return dateFormat.parse(dateStr);
        } catch (Exception e) {
            throw new RuntimeException("Error parsing date: " + dateStr, e);
        }
    }

    public TransactionDTO saveTransaction(TransactionDTO transactionDTO){
        System.out.println("DAO:" + transactionDTO);
        Transaction transaction = toModel(transactionDTO);
        Subscription subscription = subscriptionRepository.findById(transactionDTO.getSubscriptionId()).orElse(null);

        if (subscription != null) {
            transaction.setSubscription(subscription);
            transaction = transactionRepository.save(transaction);
            return toDTO(transaction);
        } else {
            throw new IllegalArgumentException("Subscription not found: " + transactionDTO.getSubscriptionId());
        }
    }

    public List<TransactionDTO> findAllTransactions(){
        List<Transaction> transactions = transactionRepository.findAll();
        return transactions.stream().map(this::toDTO).collect(Collectors.toList());
    }

    public TransactionDTO findTransactionById(Long id){
        Transaction transaction = transactionRepository.findById(id).orElse(null);
        return toDTO(transaction);
    }

    public List<TransactionDTO> findTransactionsBySubId(Long subscriptionId){
        List<Transaction> transactions = transactionRepository.findBySubscriptionId(subscriptionId);
        return transactions.stream().map(this::toDTO).collect(Collectors.toList());
    }

    public List<TransactionDTO> findByUserId(Long userId){
        List<Transaction> transactions = transactionRepository.findByUserId(userId);
        return transactions.stream().map(this::toDTO).collect(Collectors.toList());
    }

    public TransactionDTO updateTransaction(TransactionDTO transactionDTO){
        Transaction existingTransaction = transactionRepository.findById(transactionDTO.getTransactionId()).orElse(null);
        if (existingTransaction != null){
            Transaction updatedTransaction = toModel(transactionDTO);
            updatedTransaction = transactionRepository.save(updatedTransaction);
            return toDTO(updatedTransaction);
        } else {
            throw new IllegalArgumentException("Transaction not found: " + transactionDTO.getTransactionId());
        }
    }

    public void deleteTransaction(Long id){
        Transaction transaction = transactionRepository.findById(id).orElse(null);
        if (transaction != null){
            transactionRepository.delete(transaction);
        } else {
            throw new IllegalArgumentException("Transaction not found: " + id);
        }
    }

    public TransactionDTO toDTO(Transaction transaction){
        return TransactionDTO.builder()
                .transactionId(transaction.getTransactionId())
                .paymentDate(transaction.getPaymentDate())
                .amount(transaction.getAmount())
                .paymentMethod(transaction.getPaymentMethod())
                .subscriptionId(transaction.getSubscription() != null ? transaction.getSubscription().getSubscriptionId() : null)
                .build();
    }

    public Transaction toModel(TransactionDTO transactionDTO){
        Transaction transaction = Transaction.builder()
                .transactionId(transactionDTO.getTransactionId())
                .paymentDate(transactionDTO.getPaymentDate())
                .amount(transactionDTO.getAmount())
                .paymentMethod(transactionDTO.getPaymentMethod())
                .build();

        if(transactionDTO.getSubscriptionId() != null){
            Subscription subscription = subscriptionRepository.findById(transactionDTO.getSubscriptionId()).orElse(null);
            if (subscription != null){
                transaction.setSubscription(subscription);
            }
        }
        return transaction;
    }

}
