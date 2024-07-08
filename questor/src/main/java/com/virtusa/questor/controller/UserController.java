package com.virtusa.questor.controller;

import com.virtusa.questor.dto.UserDTO;
import com.virtusa.questor.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/questor/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/count")
    public long countUsers() {
        return userService.countUsers();
    }

    @PostMapping("/saveUser")
    public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDTO) {
        UserDTO savedUser = userService.saveUser(userDTO);
        return ResponseEntity.ok(savedUser);
    }

    @GetMapping("/getUser/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        UserDTO userDTO = userService.getUserById(id);
        return ResponseEntity.ok(userDTO);
    }

    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<UserDTO> updateUserById(@PathVariable Long id, @RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userService.updateUserById(id, userDTO));
    }

    @PutMapping("/update")
    public ResponseEntity<UserDTO> updateUser(@RequestBody UserDTO userDTO) {
        // Set default userStatus if null
        if (userDTO.getUserStatus() == null) {
            userDTO.setUserStatus(UserDTO.UserStatus.UNBLOCK);
        }
        System.out.println("Controller: " + userDTO);
        return ResponseEntity.ok(userService.updateUser(userDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserById(@PathVariable Long id) {
        userService.deleteUserById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/validatePassword")
    public ResponseEntity<Boolean> validatePassword(@RequestBody UserDTO userDTO) {
        boolean isValid = userService.validatePassword(userDTO.getUserId(), userDTO.getPassword());
        return ResponseEntity.ok(isValid);
    }

    @PutMapping("/block/{id}")
    public ResponseEntity<UserDTO> blockUser(@PathVariable Long id) {
        System.out.println(id);
        UserDTO updatedUser = userService.blockUser(id);
        System.out.println("After update :" + updatedUser);
        return ResponseEntity.ok(updatedUser);
    }

    @PutMapping("/unblock/{id}")
    public ResponseEntity<UserDTO> unblockUser(@PathVariable Long id) {
        System.out.println(id);
        UserDTO updatedUser = userService.unblockUser(id);
        System.out.println("After update :" + updatedUser);
        return ResponseEntity.ok(updatedUser);
    }

}
