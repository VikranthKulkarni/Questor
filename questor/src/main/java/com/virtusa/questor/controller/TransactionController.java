package com.virtusa.questor.controller;

import com.virtusa.questor.dto.TransactionDTO;
import com.virtusa.questor.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @GetMapping("/revenueData")
    public ResponseEntity<List<TransactionDTO>> getRevenueDataByMonth() {
        List<TransactionDTO> revenueData = transactionService.getRevenueDataByMonth();
        return new ResponseEntity<>(revenueData, HttpStatus.OK);
    }

    @GetMapping("/totalRevenue")
    public Double totalRevenue(){
        return transactionService.findTotalAmount();
    }

    @GetMapping("/revenueInThreeMonths")
    public Double totalRevenueInThreeMonths(){
        return transactionService.findTotalAmountInLastThreeMonths();
    }

    @PostMapping
    public ResponseEntity<TransactionDTO> saveTransaction(@RequestBody TransactionDTO transactionDTO) {
        System.out.println("controller:" + transactionDTO);
        TransactionDTO savedTransaction = transactionService.saveTransaction(transactionDTO);
        return new ResponseEntity<>(savedTransaction, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<TransactionDTO>> findAllTransactions() {
        List<TransactionDTO> transactions = transactionService.findAllTransactions();
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TransactionDTO> findTransactionById(@PathVariable("id") Long id) {
        TransactionDTO transaction = transactionService.findTransactionById(id);
        return ResponseEntity.ok(transaction);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TransactionDTO> updateTransaction(@PathVariable("id") Long id, @RequestBody TransactionDTO transactionDTO) {
        transactionDTO.setTransactionId(id);
        TransactionDTO updatedTransaction = transactionService.updateTransaction(transactionDTO);
        return ResponseEntity.ok(updatedTransaction);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTransaction(@PathVariable("id") Long id) {
        transactionService.deleteTransaction(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/bySubscriptionId/{subscriptionId}")
    public List<TransactionDTO> getTransactionsBySubscriptionId(@PathVariable Long subscriptionId){
        return transactionService.findTransactionsBySubId(subscriptionId);
    }

    @GetMapping("/byUserId/{userId}")
    public List<TransactionDTO> getTransactionsByUserId(@PathVariable Long userId){
        return transactionService.findByUserId(userId);
    }
}
