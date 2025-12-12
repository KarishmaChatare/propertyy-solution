package com.valuation.management.controller;

import com.valuation.management.entity.CaseEntity;
import com.valuation.management.service.CaseService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cases")
@CrossOrigin(origins = "http://localhost:3000") // Your React app origin
public class CaseController {

    private final CaseService caseService;

    public CaseController(CaseService caseService) {
        this.caseService = caseService;
    }

    @GetMapping
    public List<CaseEntity> getAllCases() {
        return caseService.getAllCases();
    }

    @GetMapping("/{id}")
    public CaseEntity getCaseById(@PathVariable Long id) {
        return caseService.getCaseById(id).orElseThrow(() -> new RuntimeException("Case not found"));
    }

    @PostMapping
    public CaseEntity createCase(@RequestBody CaseEntity c) {
        return caseService.createCase(c);
    }

    @PutMapping("/{id}")
    public CaseEntity updateCase(@PathVariable Long id, @RequestBody CaseEntity c) {
        return caseService.updateCase(id, c);
    }

    @DeleteMapping("/{id}")
    public void deleteCase(@PathVariable Long id) {
        caseService.deleteCase(id);
    }
}
