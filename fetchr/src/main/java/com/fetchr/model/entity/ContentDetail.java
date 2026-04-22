package com.fetchr.model.entity;

public class ContentDetail {
    private String subjectId;
    private int subjectType;
    private String title;
    private String description;
    private String genre;
    private String coverUrl;
    private String detailPath;
    private String releaseDate;
    private String imdbRating;

    public ContentDetail() {}

    public ContentDetail(String subjectId, int subjectType, String title, String description,
                        String genre, String coverUrl, String detailPath, String releaseDate, String imdbRating) {
        this.subjectId = subjectId;
        this.subjectType = subjectType;
        this.title = title;
        this.description = description;
        this.genre = genre;
        this.coverUrl = coverUrl;
        this.detailPath = detailPath;
        this.releaseDate = releaseDate;
        this.imdbRating = imdbRating;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
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
}
