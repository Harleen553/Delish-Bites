package com.fooddelivery.service;

import com.fooddelivery.model.User;
import com.fooddelivery.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Transactional
    public User registerUser(User user) {
        try {
            if (user.getRole() == null || user.getRole().isEmpty()) {
                user.setRole("USER"); // default
            }
            return userRepository.save(user);
        } catch (Exception e) {
            throw new RuntimeException("Error saving user: " + e.getMessage());
        }
    }

    public User authenticateUser(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
        return null; // or throw custom exception
    }
}
