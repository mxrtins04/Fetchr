package com.fetchr.controller;

import com.fetchr.exception.AoneroomApiException;
import com.fetchr.model.request.SearchRequest;
import com.fetchr.model.response.SearchResponse;
import com.fetchr.service.AoneroomApiService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class SearchController {

    @Autowired
    private AoneroomApiService apiService;

    @PostMapping("/search")
    public ResponseEntity<SearchResponse> search(@Valid @RequestBody SearchRequest request) {
        try {
            SearchResponse response = apiService.search(request);
            return ResponseEntity.ok(response);
        } catch (AoneroomApiException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Failed to process search request", e);
        }
    }
}
