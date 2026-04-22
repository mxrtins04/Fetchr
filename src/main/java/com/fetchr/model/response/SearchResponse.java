package com.fetchr.model.response;

import com.fetchr.model.entity.SearchResult;
import java.util.List;

public class SearchResponse {
    private List<SearchResult> items;
    private boolean hasMore;
    private String nextPage;
    private int totalCount;

    public SearchResponse() {}

    public SearchResponse(List<SearchResult> items, boolean hasMore, String nextPage, int totalCount) {
        this.items = items;
        this.hasMore = hasMore;
        this.nextPage = nextPage;
        this.totalCount = totalCount;
    }

    public List<SearchResult> getItems() {
        return items;
    }

    public void setItems(List<SearchResult> items) {
        this.items = items;
    }

    public boolean isHasMore() {
        return hasMore;
    }

    public void setHasMore(boolean hasMore) {
        this.hasMore = hasMore;
    }

    public String getNextPage() {
        return nextPage;
    }

    public void setNextPage(String nextPage) {
        this.nextPage = nextPage;
    }

    public int getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(int totalCount) {
        this.totalCount = totalCount;
    }
}
