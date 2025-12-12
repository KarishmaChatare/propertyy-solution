package com.valuation.management.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Map;

@Data
@AllArgsConstructor
public class LoginResponse {
    private String status;
    private String message;
    private Map<String, Object> data;
}
