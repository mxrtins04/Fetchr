// API Response Types
export interface SearchResult {
  subjectId: string;
  subjectType: number;
  title: string;
  genre: string;
  releaseDate: string;
  imdbRating: string;
  coverUrl: string;
  detailPath: string;
  subtitles: string;
  hasResource: boolean;
}

export interface SearchResponse {
  items: SearchResult[];
  hasMore: boolean;
  nextPage: string;
  totalCount: number;
}

export interface Season {
  seasonNumber: number;
  maxEpisodes: number;
  resolutions: ResolutionInfo[];
}

export interface ResolutionInfo {
  resolution: number;
  episodeCount: number;
}

export interface Dub {
  subjectId: string;
  lanName: string;
  lanCode: string;
  type: number;
  original: boolean;
  detailPath: string;
}

export interface ContentDetail {
  subjectId: string;
  subjectType: number;
  title: string;
  description: string;
  genre: string;
  coverUrl: string;
  detailPath: string;
  releaseDate: string;
  imdbRating: string;
}

export interface ContentDetailResponse {
  subject: ContentDetail;
  seasons: Season[];
  dubs: Dub[];
}

export interface VideoLink {
  id: string;
  url: string;
  resolution: number;
  sizeBytes: number;
  duration: number;
  format: string;
  codecName: string;
}

export interface Caption {
  id: string;
  lan: string;
  lanName: string;
  url: string;
  size: string;
}

export interface DownloadOptionsResponse {
  downloads: VideoLink[];
  captions: Caption[];
}

export interface DownloadJob {
  id: string;
  batchId: string;
  title: string;
  season: number;
  episode: number;
  preferredQuality: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'DONE' | 'FAILED';
  totalBytes: number;
  downloadedBytes: number;
  videoFile: string;
  subtitleFile: string;
  errorMessage?: string;
}

export interface BatchStartResponse {
  batchId: string;
  jobCount: number;
}

export interface BatchProgressResponse {
  jobs: DownloadJob[];
}

// API Request Types
export interface SearchRequest {
  keyword: string;
  page: number;
  perPage: number;
  subjectType: number;
}

export interface DownloadOptionsRequest {
  subjectId: string;
  se: number;
  ep: number;
  detailPath: string;
}

export interface BatchDownloadRequest {
  detailPath: string;
  subjectId: string;
  title: string;
  season: number;
  episodes: number[];
  preferredQuality: string;
  downloadSubtitles: boolean;
  subtitleLanguage: string;
}
