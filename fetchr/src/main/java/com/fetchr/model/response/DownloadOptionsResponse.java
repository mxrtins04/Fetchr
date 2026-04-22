package com.fetchr.model.response;

import com.fetchr.model.entity.VideoLink;
import com.fetchr.model.entity.Caption;
import java.util.List;

public class DownloadOptionsResponse {
    private List<VideoLink> downloads;
    private List<Caption> captions;

    public DownloadOptionsResponse() {}

    public DownloadOptionsResponse(List<VideoLink> downloads, List<Caption> captions) {
        this.downloads = downloads;
        this.captions = captions;
    }

    public List<VideoLink> getDownloads() {
        return downloads;
    }

    public void setDownloads(List<VideoLink> downloads) {
        this.downloads = downloads;
    }

    public List<Caption> getCaptions() {
        return captions;
    }

    public void setCaptions(List<Caption> captions) {
        this.captions = captions;
    }
}
