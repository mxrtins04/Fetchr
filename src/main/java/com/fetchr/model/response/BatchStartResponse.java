package com.fetchr.model.response;

public class BatchStartResponse {
    private String batchId;
    private int jobCount;

    public BatchStartResponse() {}

    public BatchStartResponse(String batchId, int jobCount) {
        this.batchId = batchId;
        this.jobCount = jobCount;
    }

    public String getBatchId() {
        return batchId;
    }

    public void setBatchId(String batchId) {
        this.batchId = batchId;
    }

    public int getJobCount() {
        return jobCount;
    }

    public void setJobCount(int jobCount) {
        this.jobCount = jobCount;
    }
}
