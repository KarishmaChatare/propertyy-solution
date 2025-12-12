package com.valuation.management.service;

import com.valuation.management.dto.LoginRequest;
import com.valuation.management.dto.RegisterRequest;
import com.valuation.management.dto.LoginResponse;
import com.valuation.management.entity.Role;
import com.valuation.management.entity.Status;
import com.valuation.management.entity.User;
import com.valuation.management.repository.UserRepository;
import com.valuation.management.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;   // ✅ Use JwtUtil instead of JwtService

    // ============================
    // REGISTER USER
    // ============================
    public String register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        Role selectedRole = request.getRole().equalsIgnoreCase("admin")
                ? Role.ADMIN
                : Role.USER;

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .role(selectedRole)
                .active(true)
                .status(Status.ACTIVE)
                .loginCount(0)
                .lastLogin(null)
                .build();

        userRepository.save(user);
        return "User registered successfully";
    }

    // ============================
    // LOGIN USER
    // ============================
    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        // Role check
        if (!user.getRole().name().equalsIgnoreCase(request.getRole())) {
            throw new RuntimeException("Invalid role selected for this account");
        }

        // Update login details
        user.setLastLogin(LocalDateTime.now());
        user.setLoginCount(user.getLoginCount() + 1);
        user.setStatus(Status.ACTIVE);
        userRepository.save(user);

        // ✅ Generate JWT using JwtUtil
        String token = jwtUtil.generateToken(user);

        // Prepare Response
        Map<String, Object> data = new HashMap<>();
        data.put("token", token);
        data.put("user", user);

        return new LoginResponse(
                "success",
                "Login successful",
                data
        );
    }
}

