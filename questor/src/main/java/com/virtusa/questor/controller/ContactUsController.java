package com.virtusa.questor.controller;

import com.virtusa.questor.dto.ContactUsDTO;
import com.virtusa.questor.service.ContactUsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("questor/contactus")
public class ContactUsController {

    @Autowired
    private ContactUsService contactUsService;

    @GetMapping("/details")
    public List<ContactUsDTO> getAllDetails(){
        return contactUsService.getAllDetails();
    }

    @PostMapping("/addDetails")
    public void saveDetails(@RequestBody ContactUsDTO contactUs){
        contactUsService.addDetails(contactUs);
    }

    @GetMapping("/details/{id}")
    public ContactUsDTO getDetailsById(@PathVariable("id") Long id){
        return contactUsService.getById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteDetailsById(@PathVariable("id") Long id) {
        contactUsService.deleteDetails(id);
    }

}
