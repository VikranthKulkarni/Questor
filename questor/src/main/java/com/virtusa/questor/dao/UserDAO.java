package com.virtusa.questor.dao;

import com.virtusa.questor.dto.UserDTO;
import com.virtusa.questor.model.User;
import com.virtusa.questor.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class UserDAO {

    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserDAO(UserRepository userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public long countUsers() {
        return userRepo.count();
    }

    public UserDTO save(UserDTO userDTO) {
        userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        User userModel = toModel(userDTO);
        userModel = userRepo.save(userModel);
        return toDTO(userModel);
    }

    public UserDTO findById(Long id) {
        User userModel = userRepo.findById(id).orElse(null);
        return userModel != null ? toDTO(userModel) : null;
    }

    public List<UserDTO> findAll(){
        List<User> users = userRepo.findAll();
        return users.stream().map(this::toDTO).collect(Collectors.toList());
    }

    public UserDTO updateById(Long id, UserDTO userDTO){
        User existingUser = userRepo.findById(id).orElse(null);
        if (existingUser != null){
            updateUserDetails(existingUser, userDTO);
            existingUser = userRepo.save(existingUser);
            return toDTO(existingUser);
        } else {
            throw new IllegalArgumentException("User not found: " + id);
        }
    }

    public UserDTO update(UserDTO userDTO){
        User existingUser = userRepo.findById(userDTO.getUserId()).orElse(null);
        if (existingUser != null){
            updateUserDetails(existingUser, userDTO);
            existingUser = userRepo.save(existingUser);
            return toDTO(existingUser);
        } else {
            throw new IllegalArgumentException("User not found: " + userDTO.getUserId());
        }
    }

    public void deleteByID(Long id){
        User user = userRepo.findById(id).orElse(null);
        if (user != null) {
            userRepo.delete(user);
        } else {
            throw new IllegalArgumentException("User not found: " + id);
        }
    }

    public boolean validatePassword(Long userId, String password) {
        User user = userRepo.findById(userId).orElse(null);
        return user != null && passwordEncoder.matches(password, user.getPassword());
    }

    public UserDTO getUserByUserName(String userName) {
        return userRepo.findByUserName(userName).map(this::toDTO).orElseThrow(() -> new RuntimeException("User not found with username: " + userName));
    }

    private void updateUserDetails(User existingUser, UserDTO userDTO) {
        existingUser.setFirstName(userDTO.getFirstName());
        existingUser.setLastName(userDTO.getLastName());
        existingUser.setUserName(userDTO.getUserName());
        existingUser.setEmail(userDTO.getEmail());
        existingUser.setPhoneNumber(userDTO.getPhoneNumber());
        existingUser.setBio(userDTO.getBio());
        existingUser.setDob(userDTO.getDob());
        existingUser.setImageData(userDTO.getImageData());
        if (userDTO.getPassword() != null && !userDTO.getPassword().isEmpty()){
            existingUser.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        }
    }

    public UserDTO toDTO(User user){
        return UserDTO.builder()
                .userId(user.getUserId())
                .userName(user.getUserName())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .password(user.getPassword())
                .dob(user.getDob())
                .bio(user.getBio())
                .phoneNumber(user.getPhoneNumber())
                .imageData(user.getImageData())
                .build();
    }

    public User toModel(UserDTO userDTO){
        return User.builder()
                .userId(userDTO.getUserId())
                .userName(userDTO.getUserName())
                .firstName(userDTO.getFirstName())
                .lastName(userDTO.getLastName())
                .email(userDTO.getEmail())
                .password(userDTO.getPassword())
                .dob(userDTO.getDob())
                .bio(userDTO.getBio())
                .imageData(userDTO.getImageData())
                .phoneNumber(userDTO.getPhoneNumber())
                .build();
    }
}
