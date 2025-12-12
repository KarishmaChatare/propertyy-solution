package com.valuation.management.controller;

import com.valuation.management.entity.Visitor;
import com.valuation.management.service.VisitorService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/visitors")
@RequiredArgsConstructor
public class VisitorController {

    private final VisitorService service;

    @GetMapping
    public List<Visitor> getAll() {
        return service.getAll();
    }

    @PostMapping
    public Visitor create(@RequestBody Map<String, String> body) {
        return service.add(body.get("name"));
    }

    @PutMapping("/{id}")
    public Visitor update(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return service.update(id, body.get("name"));
    }

    @DeleteMapping("/{id}")
    public Map<String, String> delete(@PathVariable Long id) {
        service.delete(id);
        return Map.of("message", "Deleted successfully");
    }

    @PostMapping("/seed-defaults")
    public String seedDefaults() {
        List<String> visitors = List.of(
                "Avinash Kalekar",
                "Pranav Deshpande",
                "Dabke",
                "Ranaware",
                "Nagesh",
                "Atul Gavali",
                "Pramod Taware",
                "Somnath Salunke",
                "Sainath Sawale",
                "Self",
                "Other"
        );

        visitors.forEach(v -> {
            try { service.add(v); } catch (Exception ignored) {}
        });

        return "Default visitors added.";
    }
}
