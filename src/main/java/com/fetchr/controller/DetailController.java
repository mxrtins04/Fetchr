package com.fetchr.controller;

import com.fetchr.exception.AoneroomApiException;
import com.fetchr.model.response.ContentDetailResponse;
import com.fetchr.service.AoneroomApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class DetailController {

    @Autowired
    private AoneroomApiService apiService;

    @GetMapping("/detail")
    public ResponseEntity<ContentDetailResponse> getDetail(@RequestParam String detailPath) {
        try {
            ContentDetailResponse response = apiService.getDetail(detailPath);
            return ResponseEntity.ok(response);
        } catch (AoneroomApiException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Failed to get content details", e);
        }
    }
}
