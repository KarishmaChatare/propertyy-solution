package com.valuation.management.controller;

import com.valuation.management.dto.ApiResponse;
import com.valuation.management.entity.User;
import com.valuation.management.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {

    private final UserRepository userRepository;

    // ---------------------------
    // GET all users
    // ---------------------------
    @GetMapping
    public ResponseEntity<ApiResponse<List<User>>> getAllUsers() {
        return ResponseEntity.ok(
                ApiResponse.success("Users retrieved successfully", userRepository.findAll())
        );
    }

    // ---------------------------
    // GET user by ID
    // ---------------------------
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<User>> getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(u -> ResponseEntity.ok(ApiResponse.success("User found", u)))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(ApiResponse.error("User not found")));
    }

    // ---------------------------
    // UPDATE user
    // ---------------------------
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<User>> updateUser(
            @PathVariable Long id,
            @RequestBody User req
    ) {
        return userRepository.findById(id)
                .map(u -> {
                    u.setName(req.getName());
                    u.setEmail(req.getEmail());
                    u.setRole(req.getRole());
                    u.setActive(req.getActive());
                    User saved = userRepository.save(u);
                    return ResponseEntity.ok(ApiResponse.success("User updated", saved));
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(ApiResponse.error("User not found")));
    }

    // ---------------------------
    // DELETE user
    // ---------------------------
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteUser(@PathVariable Long id) {
        if (!userRepository.existsById(id)) {
            return ResponseEntity.status(404).body(ApiResponse.error("User not found"));
        }
        userRepository.deleteById(id);
        return ResponseEntity.ok(ApiResponse.success("User deleted", null));
    }
}
