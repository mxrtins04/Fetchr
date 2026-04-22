package com.fetchr.model.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Min;
import java.util.List;

public class BatchDownloadRequest {
    @NotBlank(message = "DetailPath is required")
    private String detailPath;
    
    @NotBlank(message = "SubjectId is required")
    private String subjectId;
    
    @NotBlank(message = "Title is required")
    private String title;
    
    @Min(value = 1, message = "Season must be at least 1")
    private int season;
    
    @NotEmpty(message = "Episodes list cannot be empty")
    private List<Integer> episodes;
    
    private String preferredQuality = "1080P";
    private boolean downloadSubtitles = true;
    private String subtitleLanguage = "en";

    public BatchDownloadRequest() {}

    public String getDetailPath() {
        return detailPath;
    }

    public void setDetailPath(String detailPath) {
        this.detailPath = detailPath;
    }

    public String getSubjectId() {
        return subjectId;
    }

    public void setSubjectId(String subjectId) {
        this.subjectId = subjectId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getSeason() {
        return season;
    }

    public void setSeason(int season) {
        this.season = season;
    }

    public List<Integer> getEpisodes() {
        return episodes;
    }

    public void setEpisodes(List<Integer> episodes) {
        this.episodes = episodes;
    }

    public String getPreferredQuality() {
        return preferredQuality;
    }

    public void setPreferredQuality(String preferredQuality) {
        this.preferredQuality = preferredQuality;
    }

    public boolean isDownloadSubtitles() {
        return downloadSubtitles;
    }

    public void setDownloadSubtitles(boolean downloadSubtitles) {
        this.downloadSubtitles = downloadSubtitles;
    }

    public String getSubtitleLanguage() {
        return subtitleLanguage;
    }

    public void setSubtitleLanguage(String subtitleLanguage) {
        this.subtitleLanguage = subtitleLanguage;
    }
}
