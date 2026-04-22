package com.fetchr.integration;

import com.fetchr.model.request.SearchRequest;
import com.fetchr.model.response.SearchResponse;
import com.fetchr.service.AoneroomApiService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource(properties = {
    "siphon.download-dir=./test-downloads",
    "siphon.max-concurrent-downloads=1"
})
class AoneroomApiIntegrationTest {

    @Autowired
    private AoneroomApiService apiService;

    @Test
    void testSearchApi() throws Exception {
        SearchRequest request = new SearchRequest("Naruto", 1, 10, 0);
        SearchResponse response = apiService.search(request);
        
        assertNotNull(response);
        assertNotNull(response.getItems());
        assertTrue(response.getItems().size() > 0);
        assertTrue(response.getTotalCount() > 0);
        
        // Verify first item has required fields
        var firstItem = response.getItems().get(0);
        assertNotNull(firstItem.getTitle());
        assertNotNull(firstItem.getDetailPath());
        assertNotNull(firstItem.getCoverUrl());
    }

    @Test
    void testDetailApi() throws Exception {
        // First search to get a valid detailPath
        SearchRequest searchRequest = new SearchRequest("Gachiakuta", 1, 5, 0);
        SearchResponse searchResponse = apiService.search(searchRequest);
        
        if (!searchResponse.getItems().isEmpty()) {
            String detailPath = searchResponse.getItems().get(0).getDetailPath();
            
            var response = apiService.getDetail(detailPath);
            
            assertNotNull(response);
            assertNotNull(response.getSubject());
            assertNotNull(response.getSubject().getTitle());
            assertNotNull(response.getSeasons());
        }
    }
}
