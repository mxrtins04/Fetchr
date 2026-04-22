package com.fetchr.model.entity;

public class DownloadJob {
    private String jobId;
    private String batchId;
    private String title;
    private int season;
    private int episode;
    private String quality;
    private JobStatus status;
    private String errorMessage;
    private long totalBytes;
    private long downloadedBytes;
    private String videoFile;
    private String subtitleFile;

    public DownloadJob() {}

    public DownloadJob(String jobId, String batchId, String title, int season, int episode, String quality) {
        this.jobId = jobId;
        this.batchId = batchId;
        this.title = title;
        this.season = season;
        this.episode = episode;
        this.quality = quality;
        this.status = JobStatus.PENDING;
        this.downloadedBytes = 0;
    }

    public String getJobId() {
        return jobId;
    }

    public void setJobId(String jobId) {
        this.jobId = jobId;
    }

    public String getBatchId() {
        return batchId;
    }

    public void setBatchId(String batchId) {
        this.batchId = batchId;
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

    public int getEpisode() {
        return episode;
    }

    public void setEpisode(int episode) {
        this.episode = episode;
    }

    public String getQuality() {
        return quality;
    }

    public void setQuality(String quality) {
        this.quality = quality;
    }

    public JobStatus getStatus() {
        return status;
    }

    public void setStatus(JobStatus status) {
        this.status = status;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public long getTotalBytes() {
        return totalBytes;
    }

    public void setTotalBytes(long totalBytes) {
        this.totalBytes = totalBytes;
    }

    public long getDownloadedBytes() {
        return downloadedBytes;
    }

    public void setDownloadedBytes(long downloadedBytes) {
        this.downloadedBytes = downloadedBytes;
    }

    public String getVideoFile() {
        return videoFile;
    }

    public void setVideoFile(String videoFile) {
        this.videoFile = videoFile;
    }

    public String getSubtitleFile() {
        return subtitleFile;
    }

    public void setSubtitleFile(String subtitleFile) {
        this.subtitleFile = subtitleFile;
    }

    public int getProgressPercent() {
        return totalBytes > 0 ? (int) ((downloadedBytes * 100) / totalBytes) : 0;
    }
}
