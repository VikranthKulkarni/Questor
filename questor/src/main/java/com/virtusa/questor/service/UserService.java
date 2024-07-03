package com.virtusa.questor.service;

import com.virtusa.questor.dao.CourseDAO;
import com.virtusa.questor.dao.UserDAO;
import com.virtusa.questor.dto.CourseDTO;
import com.virtusa.questor.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserDAO userDAO;

    @Autowired
    private CourseDAO courseDAO;

    public UserDTO saveUser(UserDTO userDTO) {
        return userDAO.save(userDTO);
    }

    public UserDTO getUserById(Long userId){
        return userDAO.findById(userId);
    }

    public List<UserDTO> getAllUsers(){
        return userDAO.findAll();
    }

    public UserDTO updateUserById(Long id, UserDTO userDTO){
        return userDAO.updateById(id, userDTO);
    }

    public UserDTO updateUser(UserDTO userDTO){
        return userDAO.update(userDTO);
    }

    public void deleteUserById(Long id){
        userDAO.deleteByID(id);
    }

    public UserDTO findUserByUserName(String userName) {
        return userDAO.getUserByUserName(userName);
    }

    public boolean validatePassword(Long userId, String password){
        return userDAO.validatePassword(userId,password);
    }

    public long countUsers(){
        return userDAO.countUsers();
    }
}
