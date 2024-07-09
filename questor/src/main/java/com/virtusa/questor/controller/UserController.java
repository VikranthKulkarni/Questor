package com.virtusa.questor.controller;

import com.virtusa.questor.dto.UserDTO;
import com.virtusa.questor.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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

    @GetMapping("/getUserByUserName/{userName}")
    public ResponseEntity<UserDTO> getUserByUserName(@PathVariable String userName) {
        UserDTO userDTO = userService.findUserByUserName(userName);
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
        UserDTO updatedUser = userService.blockUser(id);
        return ResponseEntity.ok(updatedUser);
    }

    @PutMapping("/unblock/{id}")
    public ResponseEntity<UserDTO> unblockUser(@PathVariable Long id) {
        UserDTO updatedUser = userService.unblockUser(id);
        return ResponseEntity.ok(updatedUser);
    }

    @PostMapping("/validateSecurityAnswer")
    public ResponseEntity<Boolean> validateSecurityAnswer(@RequestBody Map<String, String> request) {
        Long userId = Long.valueOf(request.get("userId"));
        String question = request.get("question");
        String answer = request.get("answer");
        boolean isValid = userService.validateSecurityAnswer(userId, question, answer);
        return ResponseEntity.ok(isValid);
    }

    @PostMapping("/updatePassword")
    public ResponseEntity<UserDTO> updatePassword(@RequestBody Map<String, String> request) {
        Long userId = Long.valueOf(request.get("userId"));
        String newPassword = request.get("newPassword");
        UserDTO updatedUser = userService.updatePassword(userId, newPassword);
        return ResponseEntity.ok(updatedUser);
    }

}
