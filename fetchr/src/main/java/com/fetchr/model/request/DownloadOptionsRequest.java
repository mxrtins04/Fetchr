package com.fetchr.model.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public class DownloadOptionsRequest {
    @NotBlank(message = "SubjectId is required")
    private String subjectId;
    
    @Min(value = 1, message = "Season must be at least 1")
    private int season;
    
    @Min(value = 1, message = "Episode must be at least 1")
    private int episode;
    
    @NotBlank(message = "DetailPath is required")
    private String detailPath;

    public DownloadOptionsRequest() {}

    public DownloadOptionsRequest(String subjectId, int season, int episode, String detailPath) {
        this.subjectId = subjectId;
        this.season = season;
        this.episode = episode;
        this.detailPath = detailPath;
    }

    public String getSubjectId() {
        return subjectId;
    }

    public void setSubjectId(String subjectId) {
        this.subjectId = subjectId;
    }

    public int getSeason() {
        return season;
    }

    public void setSeason(int season) {
        this.season = season;
    }

    public int getEpisode() {
        return episode;
    }

    public void setEpisode(int episode) {
        this.episode = episode;
    }

    public String getDetailPath() {
        return detailPath;
    }

    public void setDetailPath(String detailPath) {
        this.detailPath = detailPath;
    }
}
