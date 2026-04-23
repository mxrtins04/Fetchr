// Format file size from bytes to human readable format
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Format download progress percentage
export const formatProgress = (downloaded: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((downloaded / total) * 100);
};

// Format download speed
export const formatSpeed = (bytesPerSecond: number): string => {
  return `${formatFileSize(bytesPerSecond)}/s`;
};

// Format duration from seconds to human readable format
export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  } else {
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
};

// Pad numbers with leading zero
export const pad2 = (num: number): string => {
  return num.toString().padStart(2, '0');
};

// Generate episode filename
export const generateEpisodeFilename = (title: string, season: number, episode: number): string => {
  const sanitizedTitle = title.replace(/[\\/:*?"<>|]/g, '').trim();
  
  if (season === 0) {
    // Movie format: Title (Year).mp4
    return `${sanitizedTitle}.mp4`;
  } else {
    // Series format: Title S01E01.mp4
    return `${sanitizedTitle} S${pad2(season)}E${pad2(episode)}.mp4`;
  }
};

// Generate subtitle filename
export const generateSubtitleFilename = (videoFilename: string): string => {
  return videoFilename.replace('.mp4', '.srt');
};

// Format resolution number to readable string
export const formatResolution = (resolution: number): string => {
  return `${resolution}P`;
};

// Format IMDB rating
export const formatImdbRating = (rating: string): string => {
  return `IMDB: ${rating}`;
};

// Truncate text with ellipsis
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

// Get status color for download jobs
export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'PENDING':
      return 'text-gray-500';
    case 'IN_PROGRESS':
      return 'text-blue-500';
    case 'DONE':
      return 'text-green-500';
    case 'FAILED':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
};

// Get status background color
export const getStatusBgColor = (status: string): string => {
  switch (status) {
    case 'PENDING':
      return 'bg-gray-100';
    case 'IN_PROGRESS':
      return 'bg-blue-100';
    case 'DONE':
      return 'bg-green-100';
    case 'FAILED':
      return 'bg-red-100';
    default:
      return 'bg-gray-100';
  }
};
