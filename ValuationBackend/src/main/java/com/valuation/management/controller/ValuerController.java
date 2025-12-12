package com.valuation.management.controller;

import com.valuation.management.entity.Valuer;
import com.valuation.management.service.ValuerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/valuers")
@RequiredArgsConstructor
public class ValuerController {

    private final ValuerService service;

    @GetMapping
    public List<Valuer> getAll() {
        return service.getAll();
    }

    @PostMapping
    public Valuer create(@RequestBody Map<String, String> body) {
        return service.add(body.get("name"));
    }

    @PutMapping("/{id}")
    public Valuer update(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return service.update(id, body.get("name"));
    }

    @DeleteMapping("/{id}")
    public Map<String, String> delete(@PathVariable Long id) {
        service.delete(id);
        return Map.of("message", "Deleted successfully");
    }

    @PostMapping("/seed-defaults")
    public String seedDefaults() {
        List<String> valuers = List.of(
                "Sunil Balaji Jain",
                "Ashok D Kadam",
                "Other"
        );

        valuers.forEach(name -> {
            try { service.add(name); } catch (Exception ignored) {}
        });

        return "Default valuers added.";
    }
}
