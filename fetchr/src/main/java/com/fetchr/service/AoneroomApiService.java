package com.fetchr.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fetchr.exception.AoneroomApiException;
import com.fetchr.model.entity.*;
import com.fetchr.model.request.DownloadOptionsRequest;
import com.fetchr.model.request.SearchRequest;
import com.fetchr.model.response.*;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class AoneroomApiService {

    private static final String BASE_URL = "https://h5-api.aoneroom.com/wefeed-h5api-bff";

    @Autowired
    private OkHttpClient okHttpClient;

    @Autowired
    private ObjectMapper objectMapper;

    public SearchResponse search(SearchRequest request) throws AoneroomApiException {
        try {
            String jsonBody = objectMapper.writeValueAsString(request);
            RequestBody body = RequestBody.create(jsonBody, MediaType.get("application/json"));
            
            Request httpRequest = new Request.Builder()
                    .url(BASE_URL + "/subject/search")
                    .post(body)
                    .build();

            try (Response response = okHttpClient.newCall(httpRequest).execute()) {
                if (!response.isSuccessful()) {
                    throw new AoneroomApiException("HTTP error: " + response.code());
                }

                String responseBody = response.body().string();
                JsonNode jsonNode = objectMapper.readTree(responseBody);
                
                if (jsonNode.has("data") && jsonNode.get("data").has("code")) {
                    int code = jsonNode.get("data").get("code").asInt();
                    if (code != 0) {
                        String message = jsonNode.get("data").has("message") ? 
                                jsonNode.get("data").get("message").asText() : "Unknown error";
                        throw new AoneroomApiException(message);
                    }
                }

                JsonNode data = jsonNode.get("data");
                JsonNode pager = data.get("pager");
                JsonNode items = data.get("items");

                List<SearchResult> searchResults = new ArrayList<>();
                if (items != null && items.isArray()) {
                    for (JsonNode item : items) {
                        SearchResult result = new SearchResult();
                        result.setSubjectId(item.get("subjectId").asText());
                        result.setSubjectType(item.get("subjectType").asInt());
                        result.setTitle(item.get("title").asText());
                        result.setGenre(item.get("genre").asText());
                        result.setReleaseDate(item.get("releaseDate").asText());
                        result.setImdbRating(item.get("imdbRatingValue").asText() + " (" + 
                                item.get("imdbRatingCount").asText() + ")");
                        result.setCoverUrl(item.get("cover").get("url").asText());
                        result.setDetailPath(item.get("detailPath").asText());
                        result.setSubtitles(item.get("subtitles").asText());
                        result.setHasResource(item.get("hasResource").asBoolean());
                        searchResults.add(result);
                    }
                }

                SearchResponse searchResponse = new SearchResponse();
                searchResponse.setItems(searchResults);
                searchResponse.setHasMore(pager.get("hasMore").asBoolean());
                searchResponse.setNextPage(pager.get("nextPage").asText());
                searchResponse.setTotalCount(pager.get("totalCount").asInt());

                return searchResponse;
            }
        } catch (IOException e) {
            throw new AoneroomApiException("Failed to call search API", e);
        }
    }

    public ContentDetailResponse getDetail(String detailPath) throws AoneroomApiException {
        try {
            Request httpRequest = new Request.Builder()
                    .url(BASE_URL + "/detail?detailPath=" + detailPath)
                    .get()
                    .build();

            try (Response response = okHttpClient.newCall(httpRequest).execute()) {
                if (!response.isSuccessful()) {
                    throw new AoneroomApiException("HTTP error: " + response.code());
                }

                String responseBody = response.body().string();
                JsonNode jsonNode = objectMapper.readTree(responseBody);
                
                if (jsonNode.has("data") && jsonNode.get("data").has("code")) {
                    int code = jsonNode.get("data").get("code").asInt();
                    if (code != 0) {
                        String message = jsonNode.get("data").has("message") ? 
                                jsonNode.get("data").get("message").asText() : "Unknown error";
                        throw new AoneroomApiException(message);
                    }
                }

                JsonNode data = jsonNode.get("data");
                JsonNode subjectNode = data.get("subject");

                ContentDetail subject = new ContentDetail();
                subject.setSubjectId(subjectNode.get("subjectId").asText());
                subject.setSubjectType(subjectNode.get("subjectType").asInt());
                subject.setTitle(subjectNode.get("title").asText());
                subject.setDescription(subjectNode.get("description").asText());
                subject.setGenre(subjectNode.get("genre").asText());
                subject.setCoverUrl(subjectNode.get("cover").get("url").asText());
                subject.setDetailPath(subjectNode.get("detailPath").asText());
                subject.setReleaseDate(subjectNode.get("releaseDate").asText());
                subject.setImdbRating(subjectNode.get("imdbRatingValue").asText());

                List<Season> seasons = new ArrayList<>();
                JsonNode seasonsNode = data.get("resource").get("seasons");
                if (seasonsNode != null && seasonsNode.isArray()) {
                    for (JsonNode seasonNode : seasonsNode) {
                        Season season = new Season();
                        season.setSeasonNumber(seasonNode.get("se").asInt());
                        season.setMaxEpisodes(seasonNode.get("maxEp").asInt());

                        List<ResolutionInfo> resolutions = new ArrayList<>();
                        JsonNode resolutionsNode = seasonNode.get("resolutions");
                        if (resolutionsNode != null && resolutionsNode.isArray()) {
                            for (JsonNode resNode : resolutionsNode) {
                                ResolutionInfo resolution = new ResolutionInfo();
                                resolution.setResolution(resNode.get("resolution").asInt());
                                resolution.setEpisodeCount(resNode.get("epNum").asInt());
                                resolutions.add(resolution);
                            }
                        }
                        season.setResolutions(resolutions);
                        seasons.add(season);
                    }
                }

                List<Dub> dubs = new ArrayList<>();
                JsonNode dubsNode = subjectNode.get("dubs");
                if (dubsNode != null && dubsNode.isArray()) {
                    for (JsonNode dubNode : dubsNode) {
                        Dub dub = new Dub();
                        dub.setSubjectId(dubNode.get("subjectId").asText());
                        dub.setLanName(dubNode.get("lanName").asText());
                        dub.setLanCode(dubNode.get("lanCode").asText());
                        dub.setType(dubNode.get("type").asInt());
                        dub.setOriginal(dubNode.get("original").asBoolean());
                        dub.setDetailPath(dubNode.get("detailPath").asText());
                        dubs.add(dub);
                    }
                }

                return new ContentDetailResponse(subject, seasons, dubs);
            }
        } catch (IOException e) {
            throw new AoneroomApiException("Failed to call detail API", e);
        }
    }

    public DownloadOptionsResponse getDownloadOptions(DownloadOptionsRequest request) throws AoneroomApiException {
        try {
            String url = String.format("%s/subject/download?subjectId=%s&se=%d&ep=%d&detailPath=%s",
                    BASE_URL, request.getSubjectId(), request.getSeason(), request.getEpisode(), request.getDetailPath());
            
            Request httpRequest = new Request.Builder()
                    .url(url)
                    .get()
                    .build();

            try (Response response = okHttpClient.newCall(httpRequest).execute()) {
                if (!response.isSuccessful()) {
                    throw new AoneroomApiException("HTTP error: " + response.code());
                }

                String responseBody = response.body().string();
                JsonNode jsonNode = objectMapper.readTree(responseBody);
                
                if (jsonNode.has("data") && jsonNode.get("data").has("code")) {
                    int code = jsonNode.get("data").get("code").asInt();
                    if (code != 0) {
                        String message = jsonNode.get("data").has("message") ? 
                                jsonNode.get("data").get("message").asText() : "Unknown error";
                        throw new AoneroomApiException(message);
                    }
                }

                JsonNode data = jsonNode.get("data");

                List<VideoLink> downloads = new ArrayList<>();
                JsonNode downloadsNode = data.get("downloads");
                if (downloadsNode != null && downloadsNode.isArray()) {
                    for (JsonNode downloadNode : downloadsNode) {
                        VideoLink videoLink = new VideoLink();
                        videoLink.setId(downloadNode.get("id").asText());
                        videoLink.setUrl(downloadNode.get("url").asText());
                        videoLink.setResolution(downloadNode.get("resolution").asInt());
                        videoLink.setSizeBytes(Long.parseLong(downloadNode.get("size").asText()));
                        videoLink.setDuration(downloadNode.get("duration").asInt());
                        videoLink.setFormat(downloadNode.get("format").asText());
                        videoLink.setCodecName(downloadNode.get("codecName").asText());
                        downloads.add(videoLink);
                    }
                }

                List<Caption> captions = new ArrayList<>();
                JsonNode captionsNode = data.get("captions");
                if (captionsNode != null && captionsNode.isArray()) {
                    for (JsonNode captionNode : captionsNode) {
                        Caption caption = new Caption();
                        caption.setId(captionNode.get("id").asText());
                        caption.setLan(captionNode.get("lan").asText());
                        caption.setLanName(captionNode.get("lanName").asText());
                        caption.setUrl(captionNode.get("url").asText());
                        caption.setSize(captionNode.get("size").asText());
                        captions.add(caption);
                    }
                }

                return new DownloadOptionsResponse(downloads, captions);
            }
        } catch (IOException e) {
            throw new AoneroomApiException("Failed to call download options API", e);
        }
    }
}
