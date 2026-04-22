package com.fetchr;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import com.fetchr.config.AppProperties;

@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class FetchrApplication {
    public static void main(String[] args) {
        SpringApplication.run(FetchrApplication.class, args);
    }
}
