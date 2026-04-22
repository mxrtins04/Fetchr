package com.fetchr.service;

import com.fetchr.exception.DownloadException;
import com.fetchr.exception.AoneroomApiException;
import com.fetchr.config.AppProperties;
import com.fetchr.model.entity.*;
import com.fetchr.model.request.BatchDownloadRequest;
import com.fetchr.model.request.DownloadOptionsRequest;
import com.fetchr.model.response.BatchStartResponse;
import com.fetchr.model.response.DownloadOptionsResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.stereotype.Service;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class BatchDownloadManager {

    private final ConcurrentHashMap<String, DownloadJob> allJobs = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<String, List<String>> batchJobs = new ConcurrentHashMap<>();

    @Autowired
    private AoneroomApiService apiService;

    @Autowired
    private DownloadService downloadService;

    @Autowired
    private AppProperties appProperties;

    @Autowired
    private ThreadPoolTaskExecutor downloadExecutor;

    public BatchStartResponse startBatch(BatchDownloadRequest request) {
        String batchId = UUID.randomUUID().toString();
        List<String> jobIds = new ArrayList<>();

        for (Integer episode : request.getEpisodes()) {
            String jobId = UUID.randomUUID().toString();
            DownloadJob job = new DownloadJob(jobId, batchId, request.getTitle(), 
                    request.getSeason(), episode, request.getPreferredQuality());
            
            allJobs.put(jobId, job);
            jobIds.add(jobId);
        }

        batchJobs.put(batchId, jobIds);

        // Submit each job for execution
        for (Integer episode : request.getEpisodes()) {
            downloadExecutor.execute(() -> {
                String jobId = jobIds.get(request.getEpisodes().indexOf(episode));
                DownloadJob job = allJobs.get(jobId);
                
                try {
                    executeDownloadJob(job, request);
                } catch (Exception e) {
                    job.setStatus(JobStatus.FAILED);
                    job.setErrorMessage(e.getMessage());
                }
            });
        }

        return new BatchStartResponse(batchId, request.getEpisodes().size());
    }

    private void executeDownloadJob(DownloadJob job, BatchDownloadRequest request) {
        job.setStatus(JobStatus.IN_PROGRESS);
        
        try {
            // Get download options
            DownloadOptionsRequest optReq = new DownloadOptionsRequest(
                    request.getSubjectId(), 
                    request.getSeason(), 
                    job.getEpisode(), 
                    request.getDetailPath()
            );
            
            DownloadOptionsResponse opts = apiService.getDownloadOptions(optReq);
            
            // Find best video quality
            VideoLink videoLink = findBestVideoLink(opts.getDownloads(), request.getPreferredQuality());
            if (videoLink == null) {
                throw new DownloadException("No video links available for episode " + job.getEpisode());
            }
            
            job.setTotalBytes(videoLink.getSizeBytes());
            
            // Build file path
            String filename = downloadService.buildVideoFilename(request.getTitle(), 
                    request.getSeason(), job.getEpisode());
            Path destination = Paths.get(appProperties.getDownloadDir(), filename);
            
            // Download video
            downloadService.downloadFile(videoLink.getUrl(), destination, job);
            job.setVideoFile(filename);
            
            // Download subtitle if requested
            if (request.isDownloadSubtitles() && !opts.getCaptions().isEmpty()) {
                Caption caption = findCaption(opts.getCaptions(), request.getSubtitleLanguage());
                if (caption != null) {
                    String srtFilename = downloadService.buildSubtitleFilename(filename);
                    Path srtDestination = Paths.get(appProperties.getDownloadDir(), srtFilename);
                    downloadService.downloadFile(caption.getUrl(), srtDestination, job);
                    job.setSubtitleFile(srtFilename);
                }
            }
            
            job.setStatus(JobStatus.DONE);
            
        } catch (AoneroomApiException | DownloadException e) {
            job.setStatus(JobStatus.FAILED);
            job.setErrorMessage(e.getMessage());
        }
    }

    private VideoLink findBestVideoLink(List<VideoLink> downloads, String preferredQuality) {
        if (downloads == null || downloads.isEmpty()) {
            return null;
        }

        // Try to find exact match for preferred quality
        int preferredResolution = Integer.parseInt(preferredQuality.replace("P", ""));
        for (VideoLink link : downloads) {
            if (link.getResolution() == preferredResolution) {
                return link;
            }
        }

        // Fallback to highest resolution available
        VideoLink best = downloads.get(0);
        for (VideoLink link : downloads) {
            if (link.getResolution() > best.getResolution()) {
                best = link;
            }
        }
        return best;
    }

    private Caption findCaption(List<Caption> captions, String preferredLanguage) {
        if (captions == null || captions.isEmpty()) {
            return null;
        }

        // Try to find exact match for preferred language
        for (Caption caption : captions) {
            if (preferredLanguage.equals(caption.getLan())) {
                return caption;
            }
        }

        // Fallback to first available caption
        return captions.get(0);
    }

    public List<DownloadJob> getBatchProgress(String batchId) {
        List<String> jobIds = batchJobs.get(batchId);
        if (jobIds == null) {
            return new ArrayList<>();
        }

        List<DownloadJob> jobs = new ArrayList<>();
        for (String jobId : jobIds) {
            DownloadJob job = allJobs.get(jobId);
            if (job != null) {
                jobs.add(job);
            }
        }
        return jobs;
    }

    public DownloadJob getJob(String jobId) {
        return allJobs.get(jobId);
    }
}
