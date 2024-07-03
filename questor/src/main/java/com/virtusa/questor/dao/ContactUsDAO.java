package com.virtusa.questor.dao;

import com.virtusa.questor.dto.ContactUsDTO;
import com.virtusa.questor.model.ContactUs;
import com.virtusa.questor.repository.ContactUsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

@Repository
public class ContactUsDAO {

    @Autowired
    private ContactUsRepository contactUsRepo;

    public void addDetails(ContactUsDTO contactUsDTO){
        System.out.println(contactUsDTO + "DAO Class");
        ContactUs contactUsModel = toModel(contactUsDTO);
        contactUsRepo.save(contactUsModel);
    }

    public List<ContactUsDTO> findAllDetails(){
        List<ContactUs> contactUsList = contactUsRepo.findAll();
        return contactUsList.stream().map(this::toDTO).collect(Collectors.toList());
    }

    public ContactUsDTO findDetailsById(Long id){
        ContactUs contactUsModel = contactUsRepo.getReferenceById(id);
        return toDTO(contactUsModel);
    }

    public void deleteDetailsById(Long id) {
        ContactUs contactUsModel = contactUsRepo.getReferenceById(id);
        contactUsRepo.delete(contactUsModel);
    }

    private ContactUsDTO toDTO(ContactUs contactUsModel){
        ContactUsDTO contactUsDTO = new ContactUsDTO();

        contactUsDTO.setId(contactUsModel.getId());
        contactUsDTO.setFirstName(contactUsModel.getFirstName());
        contactUsDTO.setLastName(contactUsModel.getLastName());
        contactUsDTO.setEmail(contactUsModel.getEmail());
        contactUsDTO.setPhoneNumber(contactUsModel.getPhoneNumber());
        contactUsDTO.setMessage(contactUsModel.getMessage());

        return contactUsDTO;
    }

    private ContactUs toModel(ContactUsDTO contactUsDTO){
        ContactUs contactUsModel = new ContactUs();

        contactUsModel.setId(contactUsDTO.getId());
        contactUsModel.setFirstName(contactUsDTO.getFirstName());
        contactUsModel.setLastName(contactUsDTO.getLastName());
        contactUsModel.setEmail(contactUsDTO.getEmail());
        contactUsModel.setPhoneNumber(contactUsDTO.getPhoneNumber());
        contactUsModel.setMessage(contactUsDTO.getMessage());

        return contactUsModel;
    }

}
