package com.fetchr.model.entity;

import java.util.List;

public class Season {
    private int seasonNumber;
    private int maxEpisodes;
    private List<ResolutionInfo> resolutions;

    public Season() {}

    public Season(int seasonNumber, int maxEpisodes, List<ResolutionInfo> resolutions) {
        this.seasonNumber = seasonNumber;
        this.maxEpisodes = maxEpisodes;
        this.resolutions = resolutions;
    }

    public int getSeasonNumber() {
        return seasonNumber;
    }

    public void setSeasonNumber(int seasonNumber) {
        this.seasonNumber = seasonNumber;
    }

    public int getMaxEpisodes() {
        return maxEpisodes;
    }

    public void setMaxEpisodes(int maxEpisodes) {
        this.maxEpisodes = maxEpisodes;
    }

    public List<ResolutionInfo> getResolutions() {
        return resolutions;
    }

    public void setResolutions(List<ResolutionInfo> resolutions) {
        this.resolutions = resolutions;
    }
}
