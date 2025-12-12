package com.valuation.management.service;

import com.valuation.management.entity.Bank;
import com.valuation.management.repository.BankRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BankService {

    private final BankRepository repo;

    public List<Bank> getAll() {
        return repo.findAll();
    }

    public Bank add(String name) {
        if (repo.existsByName(name)) {
            throw new RuntimeException("Bank already exists");
        }

        return repo.save(Bank.builder().name(name).build());
    }

    public Bank update(Long id, String newName) {
        Bank bank = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Bank not found"));

        bank.setName(newName);
        return repo.save(bank);
    }

    public void delete(Long id) {
        if (!repo.existsById(id)) {
            throw new RuntimeException("Bank not found");
        }
        repo.deleteById(id);
    }
}
