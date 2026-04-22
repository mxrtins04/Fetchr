package com.fetchr.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "siphon")
public class AppProperties {
    private String downloadDir = "./downloads";
    private int maxConcurrentDownloads = 3;
    private String defaultQuality = "1080P";
    private String defaultSubtitleLanguage = "en";

    public String getDownloadDir() {
        return downloadDir;
    }

    public void setDownloadDir(String downloadDir) {
        this.downloadDir = downloadDir;
    }

    public int getMaxConcurrentDownloads() {
        return maxConcurrentDownloads;
    }

    public void setMaxConcurrentDownloads(int maxConcurrentDownloads) {
        this.maxConcurrentDownloads = maxConcurrentDownloads;
    }

    public String getDefaultQuality() {
        return defaultQuality;
    }

    public void setDefaultQuality(String defaultQuality) {
        this.defaultQuality = defaultQuality;
    }

    public String getDefaultSubtitleLanguage() {
        return defaultSubtitleLanguage;
    }

    public void setDefaultSubtitleLanguage(String defaultSubtitleLanguage) {
        this.defaultSubtitleLanguage = defaultSubtitleLanguage;
    }
}
