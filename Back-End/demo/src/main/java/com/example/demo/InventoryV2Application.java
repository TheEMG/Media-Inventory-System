package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main Spring Boot Application class for InventoryV2.
 * This class serves as the entry point for the Spring Boot application.
 * It uses Spring Boot's autoconfiguration mechanism to bootstrap and launch the application.
 */
@SpringBootApplication
public class InventoryV2Application {

	public static void main(String[] args) {
		SpringApplication.run(InventoryV2Application.class, args);
	}

}
