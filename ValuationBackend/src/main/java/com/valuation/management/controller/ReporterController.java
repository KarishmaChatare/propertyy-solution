package com.valuation.management.controller;

import com.valuation.management.entity.Reporter;
import com.valuation.management.service.ReporterService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reporters")
@RequiredArgsConstructor
public class ReporterController {

    private final ReporterService service;

    @GetMapping
    public List<Reporter> getAll() {
        return service.getAll();
    }

    @PostMapping
    public Reporter create(@RequestBody Map<String, String> body) {
        return service.add(body.get("name"));
    }

    @PutMapping("/{id}")
    public Reporter update(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return service.update(id, body.get("name"));
    }

    @DeleteMapping("/{id}")
    public Map<String, String> delete(@PathVariable Long id) {
        service.delete(id);
        return Map.of("message", "Deleted successfully");
    }

    @PostMapping("/seed-defaults")
    public String seedDefaults() {
        List<String> reporters = List.of(
                "Sainath Sawale",
                "Sanika Sonap",
                "Other"
        );

        reporters.forEach(r -> {
            try { service.add(r); } catch (Exception ignored) {}
        });

        return "Default reporters added.";
    }
}
