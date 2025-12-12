package com.valuation.management.service;

import com.valuation.management.entity.Reporter;
import com.valuation.management.repository.ReporterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReporterService {

    private final ReporterRepository repo;

    public List<Reporter> getAll() {
        return repo.findAll();
    }

    public Reporter add(String name) {
        if (repo.existsByName(name)) {
            throw new RuntimeException("Reporter already exists");
        }

        return repo.save(Reporter.builder().name(name).build());
    }

    public Reporter update(Long id, String newName) {
        Reporter reporter = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Reporter not found"));

        reporter.setName(newName);
        return repo.save(reporter);
    }

    public void delete(Long id) {
        if (!repo.existsById(id)) {
            throw new RuntimeException("Reporter not found");
        }

        repo.deleteById(id);
    }
}
