package com.valuation.management.controller;

import com.valuation.management.dto.*;
import com.valuation.management.service.AuthService;
//import com.valuation.management.service.PasswordResetService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
   // private final PasswordResetService passwordResetService;

    @PostMapping("/register")
    public ApiResponse<?> register(@RequestBody RegisterRequest request) {
        String message = authService.register(request);
        return new ApiResponse<>(true, message, null);  // ✔ FIX
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }

}