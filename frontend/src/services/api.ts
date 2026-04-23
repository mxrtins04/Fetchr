import axios from 'axios';
import {
  SearchRequest,
  SearchResponse,
  ContentDetailResponse,
  DownloadOptionsRequest,
  DownloadOptionsResponse,
  BatchDownloadRequest,
  BatchStartResponse,
  BatchProgressResponse,
} from '../types/api';

const API_BASE_URL = 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message);
    
    if (error.response?.status === 400) {
      throw new Error('Bad request. Please check your input.');
    } else if (error.response?.status === 404) {
      throw new Error('Resource not found.');
    } else if (error.response?.status === 500) {
      throw new Error('Server error. Please try again later.');
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please try again.');
    } else {
      throw new Error(error.message || 'An unexpected error occurred.');
    }
  }
);

export const api = {
  // Search API
  search: async (request: SearchRequest): Promise<SearchResponse> => {
    const response = await apiClient.post<SearchResponse>('/search', request);
    return response.data;
  },

  // Detail API
  getDetail: async (detailPath: string): Promise<ContentDetailResponse> => {
    const response = await apiClient.get<ContentDetailResponse>(`/detail?detailPath=${encodeURIComponent(detailPath)}`);
    return response.data;
  },

  // Download Options API
  getDownloadOptions: async (request: DownloadOptionsRequest): Promise<DownloadOptionsResponse> => {
    const params = new URLSearchParams({
      subjectId: request.subjectId,
      se: request.se.toString(),
      ep: request.ep.toString(),
      detailPath: request.detailPath,
    });
    const response = await apiClient.get<DownloadOptionsResponse>(`/download-options?${params}`);
    return response.data;
  },

  // Batch Download API
  startBatchDownload: async (request: BatchDownloadRequest): Promise<BatchStartResponse> => {
    const response = await apiClient.post<BatchStartResponse>('/batch/start', request);
    return response.data;
  },

  // Batch Progress API
  getBatchProgress: async (batchId: string): Promise<BatchProgressResponse> => {
    const response = await apiClient.get<BatchProgressResponse>(`/batch/progress/${batchId}`);
    return response.data;
  },

  // Downloads List API
  getDownloadsList: async (): Promise<string[]> => {
    const response = await apiClient.get<string[]>('/downloads/list');
    return response.data;
  },
};
