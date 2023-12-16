package com.example.demo.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

/**
 * Configuration class for application-wide beans and properties.
 * <p>
 * This class is responsible for creating and configuring beans that are used across the application.
 * It also provides access to certain properties loaded from the application's configuration.
 * </p>
 */
@Configuration
public class AppConfig {

    /**
     * The Google Books API key, loaded from the application properties.
     */
    @Value("${google.books.api.key}")
    private String googleBooksApiKey;

    /**
     * Gets the Google Books API key.
     *
     * @return The Google Books API key.
     */
    public String getGoogleBooksApiKey() {
        return googleBooksApiKey;
    }

    /**
     * Bean definition for {@link RestTemplate}.
     * <p>
     * The {@link RestTemplate} is used for making HTTP requests in the application.
     * This method provides a centrally defined {@link RestTemplate} bean that can be autowired
     * and used in various components of the application.
     * </p>
     *
     * @return A new instance of {@link RestTemplate}.
     */
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
