package com.valuation.management.repository;

import com.valuation.management.entity.Bank;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BankRepository extends JpaRepository<Bank, Long> {

    Optional<Bank> findByName(String name);

    void deleteByName(String name);

    boolean existsByName(String name);
}
