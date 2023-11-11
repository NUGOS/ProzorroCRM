package ua.ldv.databaseservise.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ua.ldv.databaseservise.entity.User;
import ua.ldv.databaseservise.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // Create a new user
    @PostMapping("/")
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    // Retrieve all users
    @GetMapping("/")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Retrieve a single user by ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable(value = "id") Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if(user.isPresent()) {
            return ResponseEntity.ok().body(user.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Update a user
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable(value = "id") Long userId, @RequestBody User userDetails) {
        Optional<User> user = userRepository.findById(userId);
        if(user.isPresent()) {
            User updatedUser = user.get();
            updatedUser.setUsername(userDetails.getUsername());
            updatedUser.setPassword(userDetails.getPassword());
            updatedUser.setEnabled(userDetails.getEnabled());
            updatedUser.setEmail(userDetails.getEmail());
            userRepository.save(updatedUser);
            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a user
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable(value = "id") Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if(user.isPresent()) {
            userRepository.delete(user.get());
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
