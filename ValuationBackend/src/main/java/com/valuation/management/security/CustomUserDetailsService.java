package com.valuation.management.security;

import com.valuation.management.entity.User;
import com.valuation.management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository repo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User u = repo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        boolean enabled = u.getStatus() == null || u.getStatus().name().equalsIgnoreCase("ACTIVE");
        String password = u.getPassword() == null ? "" : u.getPassword();

        // Build authority exactly as ROLE_<NAME>
        String authority = "ROLE_" + (u.getRole() != null ? u.getRole().name() : "USER");

        return new org.springframework.security.core.userdetails.User(
                u.getEmail(),
                password,
                enabled,
                true, true, true,
                List.of(new SimpleGrantedAuthority(authority))
        );
    }
}
