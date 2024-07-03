package com.virtusa.questor.service;

import com.virtusa.questor.dao.ContactUsDAO;
import com.virtusa.questor.dto.ContactUsDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactUsService {

    @Autowired
    private ContactUsDAO contactUsDAO;

    public List<ContactUsDTO> getAllDetails(){
        return contactUsDAO.findAllDetails();
    }

    public ContactUsDTO getById(Long id){
        return contactUsDAO.findDetailsById(id);
    }

    public void addDetails(ContactUsDTO contactUsDTO){
        System.out.println(contactUsDTO + "Service class");
        contactUsDAO.addDetails(contactUsDTO);
    }

    public void deleteDetails(Long id){
        contactUsDAO.deleteDetailsById(id);
    }

    public void updateDetails(Long id, ContactUsDTO contactUs){
        ContactUsDTO existingContact = contactUsDAO.findDetailsById(id);
        if(existingContact != null){
            contactUs.setId(id);
            contactUsDAO.addDetails(contactUs);
        }
    }

}
