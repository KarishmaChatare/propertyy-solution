package com.valuation.management.service;

import com.valuation.management.entity.Visitor;
import com.valuation.management.repository.VisitorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VisitorService {

    private final VisitorRepository repo;

    public List<Visitor> getAll() {
        return repo.findAll();
    }

    public Visitor add(String name) {
        if (repo.existsByName(name)) {
            throw new RuntimeException("Visitor already exists");
        }

        return repo.save(Visitor.builder().name(name).build());
    }

    public Visitor update(Long id, String newName) {
        Visitor visitor = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Visitor not found"));

        visitor.setName(newName);
        return repo.save(visitor);
    }

    public void delete(Long id) {
        if (!repo.existsById(id)) {
            throw new RuntimeException("Visitor not found");
        }

        repo.deleteById(id);
    }
}
