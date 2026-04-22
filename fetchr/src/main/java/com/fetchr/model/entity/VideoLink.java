package com.fetchr.model.entity;

public class VideoLink {
    private String id;
    private String url;
    private int resolution;
    private long sizeBytes;
    private int duration;
    private String format;
    private String codecName;

    public VideoLink() {}

    public VideoLink(String id, String url, int resolution, long sizeBytes, int duration, String format, String codecName) {
        this.id = id;
        this.url = url;
        this.resolution = resolution;
        this.sizeBytes = sizeBytes;
        this.duration = duration;
        this.format = format;
        this.codecName = codecName;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public int getResolution() {
        return resolution;
    }

    public void setResolution(int resolution) {
        this.resolution = resolution;
    }

    public long getSizeBytes() {
        return sizeBytes;
    }

    public void setSizeBytes(long sizeBytes) {
        this.sizeBytes = sizeBytes;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public String getFormat() {
        return format;
    }

    public void setFormat(String format) {
        this.format = format;
    }

    public String getCodecName() {
        return codecName;
    }

    public void setCodecName(String codecName) {
        this.codecName = codecName;
    }
}
