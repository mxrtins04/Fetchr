package com.fetchr.service;

import com.fetchr.exception.DownloadException;
import com.fetchr.model.entity.DownloadJob;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class DownloadService {

    @Autowired
    private OkHttpClient okHttpClient;

    public void downloadFile(String url, Path destination, DownloadJob job) throws DownloadException {
        try {
            Request request = new Request.Builder()
                    .url(url)
                    .build();

            try (Response response = okHttpClient.newCall(request).execute()) {
                if (!response.isSuccessful()) {
                    throw new DownloadException("HTTP error: " + response.code());
                }

                long contentLength = response.body().contentLength();
                job.setTotalBytes(contentLength);

                // Create parent directories if they don't exist
                Files.createDirectories(destination.getParent());

                try (InputStream inputStream = response.body().byteStream();
                     FileOutputStream outputStream = new FileOutputStream(destination.toFile())) {

                    byte[] buffer = new byte[8192];
                    int bytesRead;
                    long totalBytesRead = 0;

                    while ((bytesRead = inputStream.read(buffer)) != -1) {
                        outputStream.write(buffer, 0, bytesRead);
                        totalBytesRead += bytesRead;
                        job.setDownloadedBytes(totalBytesRead);
                    }

                    outputStream.flush();
                }
            }
        } catch (IOException e) {
            throw new DownloadException("Failed to download file from " + url, e);
        }
    }

    public String sanitizeFilename(String filename) {
        return filename.replaceAll("[\\\\/:*?\"<>|]", "").trim();
    }

    public String pad2(int number) {
        return String.format("%02d", number);
    }

    public String buildVideoFilename(String title, int season, int episode) {
        String sanitizedTitle = sanitizeFilename(title);
        if (season == 0) {
            // Movie format: Title (Year).mp4
            return sanitizedTitle + ".mp4";
        } else {
            // Series format: Title S01E01.mp4
            return sanitizedTitle + " S" + pad2(season) + "E" + pad2(episode) + ".mp4";
        }
    }

    public String buildSubtitleFilename(String videoFilename) {
        return videoFilename.replace(".mp4", ".srt");
    }
}
