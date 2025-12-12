package com.valuation.management.controller;

import com.valuation.management.entity.Bank;
import com.valuation.management.service.BankService;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/banks")
@RequiredArgsConstructor
public class BankController {

    private final BankService service;

    @GetMapping
    public List<Bank> getAll() {
        return service.getAll();
    }

    @PostMapping
    public Bank create(
            @RequestBody(
                    description = "Create bank",
                    required = true,
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(example = "{\"name\": \"HDFC Bank\"}")
                    )
            )
            @org.springframework.web.bind.annotation.RequestBody Map<String, String> body
    ) {
        return service.add(body.get("name"));
    }

    @PutMapping("/{id}")
    public Bank update(
            @PathVariable Long id,
            @RequestBody(
                    description = "Update bank name",
                    required = true,
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(example = "{\"name\": \"State Bank of India\"}")
                    )
            )
            @org.springframework.web.bind.annotation.RequestBody Map<String, String> body
    ) {
        return service.update(id, body.get("name"));
    }

    @DeleteMapping("/{id}")
    public Map<String, String> delete(@PathVariable Long id) {
        service.delete(id);
        return Map.of("message", "Deleted successfully");
    }

    @PostMapping("/seed-defaults")
    public String seedDefaultBanks() {
        List<String> banks = List.of(
            "State Bank of India",
            "HDFC Bank",
            "ICICI Bank",
            "Punjab National Bank",
            "Bank of Baroda",
            "Canara Bank",
            "Union Bank of India",
            "Bank of India",
            "Axis Bank",
            "Kotak Mahindra Bank",
            "IndusInd Bank",
            "IDBI Bank",
            "Central Bank of India",
            "Indian Overseas Bank",
            "UCO Bank",
            "Punjab & Sind Bank",
            "Indian Bank",
            "Federal Bank",
            "IDFC First Bank",
            "Yes Bank",
            "Other"
        );

        banks.forEach(name -> {
            try { service.add(name); }
            catch (Exception ignored) {}
        });

        return "Default banks added.";
    }

}
