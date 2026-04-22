package com.fetchr.controller;

import com.fetchr.exception.AoneroomApiException;
import com.fetchr.model.request.DownloadOptionsRequest;
import com.fetchr.model.response.DownloadOptionsResponse;
import com.fetchr.service.AoneroomApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class DownloadOptionsController {

    @Autowired
    private AoneroomApiService apiService;

    @GetMapping("/download-options")
    public ResponseEntity<DownloadOptionsResponse> getDownloadOptions(
            @RequestParam String subjectId,
            @RequestParam int se,
            @RequestParam int ep,
            @RequestParam String detailPath) {
        
        try {
            DownloadOptionsRequest request = new DownloadOptionsRequest(subjectId, se, ep, detailPath);
            DownloadOptionsResponse response = apiService.getDownloadOptions(request);
            return ResponseEntity.ok(response);
        } catch (AoneroomApiException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Failed to get download options", e);
        }
    }
}
