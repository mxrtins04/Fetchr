package com.fetchr.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.concurrent.TimeUnit;

@Configuration
public class AppConfig {

    @Autowired
    private AppProperties appProperties;

    @Bean
    public OkHttpClient okHttpClient() {
        return new OkHttpClient.Builder()
                .addInterceptor(chain -> {
                    Request original = chain.request();
                    Request request = original.newBuilder()
                            .header("Content-Type", "application/json")
                            .header("Accept", "application/json")
                            .header("Origin", "https://videodownloader.site")
                            .header("Referer", "https://videodownloader.site/")
                            .header("User-Agent",
                                    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36")
                            .header("x-client-info", "{\"timezone\":\"Africa/Lagos\"}")
                            .header("x-request-lang", "en")
                            .header("x-source", "downloader")
                            .build();
                    return chain.proceed(request);
                })
                .connectTimeout(30, TimeUnit.SECONDS)
                .readTimeout(120, TimeUnit.SECONDS)
                .writeTimeout(30, TimeUnit.SECONDS)
                .followRedirects(true)
                .build();
    }

    @Bean
    public ObjectMapper objectMapper() {
        return new ObjectMapper();
    }

    @Bean
    public ThreadPoolTaskExecutor downloadExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(appProperties.getMaxConcurrentDownloads());
        executor.setMaxPoolSize(appProperties.getMaxConcurrentDownloads());
        executor.setQueueCapacity(100);
        executor.setThreadNamePrefix("fetchr-download-");
        executor.initialize();
        return executor;
    }
}
