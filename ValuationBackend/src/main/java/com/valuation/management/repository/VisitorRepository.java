package com.valuation.management.repository;

import com.valuation.management.entity.Visitor;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface VisitorRepository extends JpaRepository<Visitor, Long> {
    Optional<Visitor> findByName(String name);
    void deleteByName(String name);
    boolean existsByName(String name);
}
