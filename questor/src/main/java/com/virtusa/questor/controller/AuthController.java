package com.virtusa.questor.controller;

import com.virtusa.questor.dto.UserDTO;
import com.virtusa.questor.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    @CrossOrigin(origins = "http://127.0.0.1:5500", allowCredentials = "true")
    public ResponseEntity<?> login(@RequestBody UserDTO loginDTO, HttpServletRequest request) {
        UserDTO userDTO = userService.findUserByUserName(loginDTO.getUserName());
        if (userDTO == null) {
            return ResponseEntity.status(404).body("Username not found");
        }
        if (!passwordEncoder.matches(loginDTO.getPassword(), userDTO.getPassword())) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
        if (userDTO.getUserStatus() == UserDTO.UserStatus.BLOCK) {
            return ResponseEntity.status(403).body("Your account is blocked");
        }
        HttpSession session = request.getSession();
        session.setAttribute("userId", userDTO.getUserId());

        Map<String, Object> response = new HashMap<>();
        response.put("userId", userDTO.getUserId());
        String role = "ADMIN".equals(userDTO.getUserName()) ? "isAdmin" : "isUser";
        response.put("role", role);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return ResponseEntity.ok().body("Logged out successfully");
    }
}
