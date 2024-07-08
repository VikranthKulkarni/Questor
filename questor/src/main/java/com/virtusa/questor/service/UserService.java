package com.virtusa.questor.service;

import com.virtusa.questor.dao.UserDAO;
import com.virtusa.questor.dto.UserDTO;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserDAO userDAO;

    public UserDTO saveUser(UserDTO userDTO) {
        return userDAO.save(userDTO);
    }

    public UserDTO getUserById(Long userId) {
        return userDAO.findById(userId);
    }

    public List<UserDTO> getAllUsers() {
        return userDAO.findAll();
    }

    public UserDTO updateUserById(Long id, UserDTO userDTO) {
        return userDAO.updateById(id, userDTO);
    }

    public UserDTO updateUser(UserDTO userDTO) {
        return userDAO.update(userDTO);
    }

    public void deleteUserById(Long id) {
        userDAO.deleteByID(id);
    }

    public UserDTO findUserByUserName(String userName) {
        return userDAO.getUserByUserName(userName);
    }

    public boolean validatePassword(Long userId, String password) {
        return userDAO.validatePassword(userId, password);
    }

    public long countUsers() {
        return userDAO.countUsers();
    }

    @Transactional
    public UserDTO blockUser(Long id) {
        UserDTO userDTO = userDAO.findById(id);
        if (userDTO != null) {
            userDTO.setUserStatus(UserDTO.UserStatus.BLOCK);
            UserDTO updatedUser = userDAO.update(userDTO);
            System.out.println("Blocked user: " + updatedUser);
            return updatedUser;
        }
        return null;
    }

    @Transactional
    public UserDTO unblockUser(Long id) {
        UserDTO userDTO = userDAO.findById(id);
        if (userDTO != null) {
            userDTO.setUserStatus(UserDTO.UserStatus.UNBLOCK);
            UserDTO updatedUser = userDAO.update(userDTO);
            System.out.println("Unblocked user: " + updatedUser);
            return updatedUser;
        }
        return null;
    }
}
