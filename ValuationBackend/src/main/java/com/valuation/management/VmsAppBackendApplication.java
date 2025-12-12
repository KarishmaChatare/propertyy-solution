package com.valuation.management;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class VmsAppBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(VmsAppBackendApplication.class, args);
		System.out.println("Valuation Management System");
	}

}