package com.valuation.management.repository;

import com.valuation.management.entity.Valuer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ValuerRepository extends JpaRepository<Valuer, Long> {
    boolean existsByName(String name);
}
