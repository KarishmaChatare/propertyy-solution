package com.valuation.management.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

import com.valuation.management.entity.Role;
import com.valuation.management.entity.Status;

@Entity
@Table(name = "users")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    private String phone;

    @CreationTimestamp
    private LocalDateTime createdAt;

    private LocalDateTime lastLogin;

    private Integer loginCount;

    @Enumerated(EnumType.STRING)
    private Status status;

    private Boolean active = true;
}
