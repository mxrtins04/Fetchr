import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';
import { SearchRequest, BatchDownloadRequest } from '../types/api';

// Search hook
export const useSearch = (request: SearchRequest, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['search', request],
    queryFn: () => api.search(request),
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Content detail hook
export const useContentDetail = (detailPath: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['detail', detailPath],
    queryFn: () => api.getDetail(detailPath),
    enabled,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Download options hook
export const useDownloadOptions = (
  subjectId: string,
  season: number,
  episode: number,
  detailPath: string,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: ['download-options', subjectId, season, episode, detailPath],
    queryFn: () => api.getDownloadOptions({ subjectId, se: season, ep: episode, detailPath }),
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Downloads list hook
export const useDownloadsList = () => {
  return useQuery({
    queryKey: ['downloads-list'],
    queryFn: () => api.getDownloadsList(),
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 30 * 1000, // Refresh every 30 seconds
  });
};

// Batch download mutation
export const useBatchDownload = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (request: BatchDownloadRequest) => api.startBatchDownload(request),
    onSuccess: (data) => {
      // Invalidate and refetch downloads list
      queryClient.invalidateQueries({ queryKey: ['downloads-list'] });
      
      // Set up polling for batch progress
      const batchId = data.batchId;
      const interval = setInterval(() => {
        queryClient.invalidateQueries({ queryKey: ['batch-progress', batchId] });
      }, 2000); // Poll every 2 seconds
      
      // Stop polling after 5 minutes
      setTimeout(() => {
        clearInterval(interval);
      }, 5 * 60 * 1000);
    },
  });
};

// Batch progress hook
export const useBatchProgress = (batchId: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['batch-progress', batchId],
    queryFn: () => api.getBatchProgress(batchId),
    enabled,
    refetchInterval: enabled ? 2000 : false, // Poll every 2 seconds when enabled
  });
};
