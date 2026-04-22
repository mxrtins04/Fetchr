package com.fetchr.model.response;

import com.fetchr.model.entity.DownloadJob;
import java.util.List;

public class BatchProgressResponse {
    private List<DownloadJob> jobs;

    public BatchProgressResponse() {}

    public BatchProgressResponse(List<DownloadJob> jobs) {
        this.jobs = jobs;
    }

    public List<DownloadJob> getJobs() {
        return jobs;
    }

    public void setJobs(List<DownloadJob> jobs) {
        this.jobs = jobs;
    }
}
