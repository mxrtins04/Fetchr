package com.fetchr.model.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public class SearchRequest {
    @NotBlank(message = "Keyword is required")
    private String keyword;
    
    @Min(value = 1, message = "Page must be at least 1")
    private int page = 1;
    
    @Min(value = 1, message = "PerPage must be at least 1")
    private int perPage = 30;
    
    @Min(value = 0, message = "SubjectType must be 0, 1, or 2")
    private int subjectType = 0;

    public SearchRequest() {}

    public SearchRequest(String keyword, int page, int perPage, int subjectType) {
        this.keyword = keyword;
        this.page = page;
        this.perPage = perPage;
        this.subjectType = subjectType;
    }

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getPerPage() {
        return perPage;
    }

    public void setPerPage(int perPage) {
        this.perPage = perPage;
    }

    public int getSubjectType() {
        return subjectType;
    }

    public void setSubjectType(int subjectType) {
        this.subjectType = subjectType;
    }
}
