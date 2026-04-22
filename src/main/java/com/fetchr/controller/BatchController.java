package com.fetchr.controller;

import com.fetchr.model.request.BatchDownloadRequest;
import com.fetchr.model.response.BatchStartResponse;
import com.fetchr.model.response.BatchProgressResponse;
import com.fetchr.service.BatchDownloadManager;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/batch")
@CrossOrigin(origins = "http://localhost:5173")
public class BatchController {

    @Autowired
    private BatchDownloadManager batchManager;

    @PostMapping("/start")
    public ResponseEntity<BatchStartResponse> startBatch(@Valid @RequestBody BatchDownloadRequest request) {
        try {
            BatchStartResponse response = batchManager.startBatch(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            throw new RuntimeException("Failed to start batch download", e);
        }
    }

    @GetMapping("/progress/{batchId}")
    public ResponseEntity<BatchProgressResponse> getBatchProgress(@PathVariable String batchId) {
        try {
            BatchProgressResponse response = new BatchProgressResponse(batchManager.getBatchProgress(batchId));
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            throw new RuntimeException("Failed to get batch progress", e);
        }
    }
}
