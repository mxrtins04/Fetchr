package com.fetchr.model.entity;

public class SearchResult {
    private String subjectId;
    private int subjectType;
    private String title;
    private String genre;
    private String releaseDate;
    private String imdbRating;
    private String coverUrl;
    private String detailPath;
    private String subtitles;
    private boolean hasResource;

    public SearchResult() {}

    public SearchResult(String subjectId, int subjectType, String title, String genre, 
                       String releaseDate, String imdbRating, String coverUrl, 
                       String detailPath, String subtitles, boolean hasResource) {
        this.subjectId = subjectId;
        this.subjectType = subjectType;
        this.title = title;
        this.genre = genre;
        this.releaseDate = releaseDate;
        this.imdbRating = imdbRating;
        this.coverUrl = coverUrl;
        this.detailPath = detailPath;
        this.subtitles = subtitles;
        this.hasResource = hasResource;
    }

    public String getSubjectId() {
        return subjectId;
    }

    public void setSubjectId(String subjectId) {
        this.subjectId = subjectId;
    }

    public int getSubjectType() {
        return subjectType;
    }

    public void setSubjectType(int subjectType) {
        this.subjectType = subjectType;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(String releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getImdbRating() {
        return imdbRating;
    }

    public void setImdbRating(String imdbRating) {
        this.imdbRating = imdbRating;
    }

    public String getCoverUrl() {
        return coverUrl;
    }

    public void setCoverUrl(String coverUrl) {
        this.coverUrl = coverUrl;
    }

    public String getDetailPath() {
        return detailPath;
    }

    public void setDetailPath(String detailPath) {
        this.detailPath = detailPath;
    }

    public String getSubtitles() {
        return subtitles;
    }

    public void setSubtitles(String subtitles) {
        this.subtitles = subtitles;
    }

    public boolean isHasResource() {
        return hasResource;
    }

    public void setHasResource(boolean hasResource) {
        this.hasResource = hasResource;
    }
}
