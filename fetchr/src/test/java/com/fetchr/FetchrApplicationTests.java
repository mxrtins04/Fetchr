package com.fetchr;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource(properties = {
    "siphon.download-dir=./test-downloads",
    "siphon.max-concurrent-downloads=1"
})
class FetchrApplicationTests {

    @Test
    void contextLoads() {
        // Test that Spring context loads successfully
    }
}
