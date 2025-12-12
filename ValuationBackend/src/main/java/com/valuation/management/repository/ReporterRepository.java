package com.valuation.management.repository;

import com.valuation.management.entity.Reporter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReporterRepository extends JpaRepository<Reporter, Long> {
    Optional<Reporter> findByName(String name);
    void deleteByName(String name);
    boolean existsByName(String name);
}
