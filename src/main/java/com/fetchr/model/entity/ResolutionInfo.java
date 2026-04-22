package com.fetchr.model.entity;

public class ResolutionInfo {
    private int resolution;
    private int episodeCount;

    public ResolutionInfo() {}

    public ResolutionInfo(int resolution, int episodeCount) {
        this.resolution = resolution;
        this.episodeCount = episodeCount;
    }

    public int getResolution() {
        return resolution;
    }

    public void setResolution(int resolution) {
        this.resolution = resolution;
    }

    public int getEpisodeCount() {
        return episodeCount;
    }

    public void setEpisodeCount(int episodeCount) {
        this.episodeCount = episodeCount;
    }
}
