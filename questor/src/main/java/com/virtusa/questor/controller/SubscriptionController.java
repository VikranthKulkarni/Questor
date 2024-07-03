package com.virtusa.questor.controller;

import com.virtusa.questor.dto.SubscriptionDTO;
import com.virtusa.questor.service.SubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/subscriptions")
public class SubscriptionController {

    @Autowired
    private SubscriptionService subscriptionService;

    @PostMapping
    public ResponseEntity<SubscriptionDTO> saveSubscription(@RequestBody SubscriptionDTO subscriptionDTO) {
        System.out.println("controller:" + subscriptionDTO);
        SubscriptionDTO savedSubscription = subscriptionService.saveSubscription(subscriptionDTO);
        return new ResponseEntity<>(savedSubscription, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<SubscriptionDTO>> findAllSubscriptions() {
        List<SubscriptionDTO> subscriptions = subscriptionService.findAllSubscriptions();
        return new ResponseEntity<>(subscriptions, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SubscriptionDTO> findSubscriptionById(@PathVariable("id") Long id) {
        SubscriptionDTO subscription = subscriptionService.findSubscriptionById(id);
        return ResponseEntity.ok(subscription);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SubscriptionDTO> updateSubscription(@PathVariable("id") Long id, @RequestBody SubscriptionDTO subscriptionDTO) {
        subscriptionDTO.setSubscriptionId(id);
        SubscriptionDTO updatedSubscription = subscriptionService.updateSubscription(subscriptionDTO);
        return ResponseEntity.ok(updatedSubscription);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSubscription(@PathVariable("id") Long id) {
        subscriptionService.deleteSubscription(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/byUserId/{userId}")
    public SubscriptionDTO getSubscriptionByUserId(@PathVariable Long userId){
        SubscriptionDTO subscriptionDTO = subscriptionService.findSubscriptionByUserId(userId);
        return subscriptionDTO != null ? subscriptionDTO : new SubscriptionDTO();
    }
}
