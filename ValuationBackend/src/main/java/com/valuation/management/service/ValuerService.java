package com.valuation.management.service;

import com.valuation.management.entity.Valuer;
import com.valuation.management.repository.ValuerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ValuerService {

    private final ValuerRepository repo;

    public List<Valuer> getAll() {
        return repo.findAll();
    }

    public Valuer add(String name) {
        if (repo.existsByName(name)) {
            throw new RuntimeException("Valuer already exists");
        }

        return repo.save(Valuer.builder().name(name).build());
    }

    public Valuer update(Long id, String newName) {
        Valuer valuer = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Valuer not found"));

        valuer.setName(newName);
        return repo.save(valuer);
    }

    public void delete(Long id) {
        if (!repo.existsById(id)) {
            throw new RuntimeException("Valuer not found");
        }

        repo.deleteById(id);
    }
}
