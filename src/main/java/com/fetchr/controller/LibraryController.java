package com.fetchr.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class LibraryController {

    @Value("${siphon.download-dir}")
    private String downloadDir;

    @GetMapping("/downloads/list")
    public ResponseEntity<List<String>> listDownloads() {
        try {
            Path path = Paths.get(downloadDir);
            if (!Files.exists(path)) {
                Files.createDirectories(path);
                return ResponseEntity.ok(new ArrayList<>());
            }

            File directory = path.toFile();
            File[] files = directory.listFiles();
            
            if (files == null) {
                return ResponseEntity.ok(new ArrayList<>());
            }

            List<String> fileNames = Arrays.stream(files)
                    .filter(file -> !file.isDirectory())
                    .map(File::getName)
                    .sorted()
                    .collect(Collectors.toList());

            return ResponseEntity.ok(fileNames);
        } catch (IOException e) {
            throw new RuntimeException("Failed to list downloads", e);
        }
    }
}
