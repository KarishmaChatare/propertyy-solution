package com.valuation.management.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest {
    public String email;
    public String password;
    public String role; // "admin" or "user" from frontend selection
}
