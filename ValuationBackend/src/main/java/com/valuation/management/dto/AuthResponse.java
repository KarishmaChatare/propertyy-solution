package com.valuation.management.dto;

import java.time.LocalDateTime;

public class AuthResponse {
    public String token;
    public String tokenType = "Bearer";

    public Long id;
    public String email;
    public String name;
    public String role;

    public LocalDateTime createdAt;
    public LocalDateTime lastLogin;
    public Integer loginCount;
    public String status;
}
