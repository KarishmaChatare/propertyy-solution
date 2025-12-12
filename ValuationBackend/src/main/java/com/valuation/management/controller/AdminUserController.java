package com.valuation.management.controller;

import com.valuation.management.dto.AdminUserDto;
import com.valuation.management.entity.Role;
import com.valuation.management.entity.Status;
import com.valuation.management.entity.User;
import com.valuation.management.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AdminUserController {

    private final UserRepository repo;

    // ---------------------------
    // GET all users (Admin only)
    // ---------------------------
    @GetMapping
    public ResponseEntity<?> listAll() {

        List<Map<String, Object>> users = repo.findAll().stream().map(u -> {

            Map<String, Object> map = new HashMap<>();
            map.put("id", u.getId());
            map.put("name", u.getName());
            map.put("email", u.getEmail());
            map.put("role", u.getRole() != null ? u.getRole().name() : "USER");
            map.put("phone", u.getPhone());
            map.put("createdAt", u.getCreatedAt());
            map.put("lastLogin", u.getLastLogin());
            map.put("loginCount", u.getLoginCount());
            map.put("status", u.getStatus() != null ? u.getStatus().name() : "INACTIVE");

            return map;

        }).toList();

        return ResponseEntity.ok(users);
    }


    // ---------------------------
    // CREATE user
    // ---------------------------
    @PostMapping
    public ResponseEntity<?> create(@RequestBody AdminUserDto dto) {

        if (dto.email == null || dto.name == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Missing required fields"));
        }

        if (repo.existsByEmail(dto.email)) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email already exists"));
        }

        Role role = "admin".equalsIgnoreCase(dto.role) ? Role.ADMIN : Role.USER;
        Status status = "active".equalsIgnoreCase(dto.status) ? Status.ACTIVE : Status.INACTIVE;

        User u = User.builder()
                .name(dto.name)
                .email(dto.email)
                .phone(dto.phone)
                .password(null) // admin does not set password
                .role(role)
                .loginCount(0)
                .status(status)
                .build();

        repo.save(u);
        return ResponseEntity.ok(Map.of("message", "User created successfully"));
    }

    // ---------------------------
    // UPDATE user
    // ---------------------------
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody AdminUserDto dto) {
        Optional<User> o = repo.findById(id);
        if (o.isEmpty()) return ResponseEntity.status(404).body(Map.of("error", "User not found"));

        User u = o.get();

        if (dto.name != null) u.setName(dto.name);
        if (dto.email != null && !dto.email.equals(u.getEmail())) {
            if (repo.existsByEmail(dto.email)) {
                return ResponseEntity.badRequest().body(Map.of("error", "Email already exists"));
            }
            u.setEmail(dto.email);
        }
        if (dto.role != null) {
            u.setRole(dto.role.equalsIgnoreCase("admin") ? Role.ADMIN : Role.USER);
        }
        if (dto.status != null) {
            u.setStatus(dto.status.equalsIgnoreCase("active") ? Status.ACTIVE : Status.INACTIVE);
        }
        if (dto.phone != null) u.setPhone(dto.phone);

        repo.save(u);
        return ResponseEntity.ok(Map.of("message", "User updated successfully"));
    }

    // ---------------------------
    // DELETE user
    // ---------------------------
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        if (!repo.existsById(id)) {
            return ResponseEntity.status(404).body(Map.of("error", "User not found"));
        }
        repo.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "User deleted successfully"));
    }
}

