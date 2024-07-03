package com.virtusa.questor.service;

import com.virtusa.questor.dao.TransactionDAO;
import com.virtusa.questor.dto.TransactionDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private TransactionDAO transactionDAO;

    public Double findTotalAmount(){
        return transactionDAO.findTotalAmount();
    }

    public Double findTotalAmountInLastThreeMonths(){
        return transactionDAO.findTotalAmountInLastThreeMonths();
    }

    public TransactionDTO saveTransaction(TransactionDTO transactionDTO) {
        return transactionDAO.saveTransaction(transactionDTO);
    }

    public List<TransactionDTO> findAllTransactions() {
        return transactionDAO.findAllTransactions();
    }

    public TransactionDTO findTransactionById(Long id) {
        return transactionDAO.findTransactionById(id);
    }

    public TransactionDTO updateTransaction(TransactionDTO transactionDTO) {
        return transactionDAO.updateTransaction(transactionDTO);
    }

    public void deleteTransaction(Long id) {
        transactionDAO.deleteTransaction(id);
    }

    public List<TransactionDTO> findTransactionsBySubId(Long subscriptionId){
        return transactionDAO.findTransactionsBySubId(subscriptionId);
    }

    public List<TransactionDTO> findByUserId(Long userId){
        return transactionDAO.findByUserId(userId);
    }

}
