package com.virtusa.questor.service;

import com.virtusa.questor.dao.SubscriptionDAO;
import com.virtusa.questor.dto.SubscriptionDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubscriptionService {

    @Autowired
    private SubscriptionDAO subscriptionDAO;

    public SubscriptionDTO saveSubscription(SubscriptionDTO subscriptionDTO) {
        return subscriptionDAO.save(subscriptionDTO);
    }

    public List<SubscriptionDTO> findAllSubscriptions() {
        return subscriptionDAO.findAllSubscriptions();
    }

    public SubscriptionDTO findSubscriptionById(Long id) {
        return subscriptionDAO.findSubscriptionById(id);
    }

    public SubscriptionDTO updateSubscription(SubscriptionDTO subscriptionDTO) {
        return subscriptionDAO.updateSubscription(subscriptionDTO);
    }

    public void deleteSubscription(Long id) {
        subscriptionDAO.deleteSubscriptionByID(id);
    }

    public SubscriptionDTO findSubscriptionByUserId(Long userId){
        return subscriptionDAO.findSubscriptionByUserId(userId);
    }

}
