import { useState, useEffect } from 'react';
import { useDownloadsList } from '../hooks/useApi';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { Download, FileVideo, Calendar, Trash2, ExternalLink } from 'lucide-react';
import { formatFileSize } from '../utils/format';
import toast from 'react-hot-toast';

const DownloadsPage = () => {
  const { data: downloads, isLoading, error, refetch } = useDownloadsList();
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  const handleFileSelect = (filename: string) => {
    setSelectedFiles(prev =>
      prev.includes(filename)
        ? prev.filter(f => f !== filename)
        : [...prev, filename]
    );
  };

  const handleSelectAll = () => {
    if (downloads && selectedFiles.length === downloads.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(downloads || []);
    }
  };

  const getFileIcon = (filename: string) => {
    if (filename.includes('.mp4') || filename.includes('.mkv') || filename.includes('.avi')) {
      return <FileVideo className="w-5 h-5 text-blue-600" />;
    } else if (filename.includes('.srt') || filename.includes('.vtt')) {
      return <Download className="w-5 h-5 text-green-600" />;
    }
    return <FileVideo className="w-5 h-5 text-gray-600" />;
  };

  const getFileType = (filename: string) => {
    if (filename.includes('.mp4') || filename.includes('.mkv') || filename.includes('.avi')) {
      return 'Video';
    } else if (filename.includes('.srt') || filename.includes('.vtt')) {
      return 'Subtitle';
    }
    return 'File';
  };

  const extractTitleFromFilename = (filename: string) => {
    // Remove extension and common patterns
    const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
    
    // Extract title (before S01E01 pattern)
    const seasonEpisodeMatch = nameWithoutExt.match(/(.+?)\s+S\d{2}E\d{2}/);
    if (seasonEpisodeMatch) {
      return seasonEpisodeMatch[1];
    }
    
    // For movies, just return the name without year
    const movieMatch = nameWithoutExt.match(/(.+?)\s*\(\d{4}\)/);
    if (movieMatch) {
      return movieMatch[1];
    }
    
    return nameWithoutExt;
  };

  const extractEpisodeInfo = (filename: string) => {
    const seasonEpisodeMatch = filename.match(/S(\d{2})E(\d{2})/);
    if (seasonEpisodeMatch) {
      return {
        season: parseInt(seasonEpisodeMatch[1]),
        episode: parseInt(seasonEpisodeMatch[2]),
      };
    }
    return null;
  };

  if (isLoading && !downloads) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Downloads</h1>
          <p className="text-gray-600 mt-1">
            Manage your downloaded videos and subtitles
          </p>
        </div>
        
        {downloads && downloads.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleSelectAll}
              className="btn btn-secondary"
            >
              {selectedFiles.length === downloads.length ? 'Deselect All' : 'Select All'}
            </button>
            <button
              onClick={() => refetch()}
              className="btn btn-secondary"
            >
              Refresh
            </button>
          </div>
        )}
      </div>

      {/* Downloads List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {downloads && downloads.length > 0 ? (
          <>
            {/* Selection Info */}
            {selectedFiles.length > 0 && (
              <div className="px-6 py-3 bg-blue-50 border-b">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-800">
                    {selectedFiles.length} file{selectedFiles.length !== 1 ? 's' : ''} selected
                  </span>
                  <button
                    onClick={() => setSelectedFiles([])}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Clear Selection
                  </button>
                </div>
              </div>
            )}

            {/* Files Grid */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {downloads.map((filename) => {
                  const title = extractTitleFromFilename(filename);
                  const episodeInfo = extractEpisodeInfo(filename);
                  const fileType = getFileType(filename);
                  const isSelected = selectedFiles.includes(filename);

                  return (
                    <div
                      key={filename}
                      className={`border rounded-lg p-4 transition-all cursor-pointer hover:shadow-md ${
                        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                      onClick={() => handleFileSelect(filename)}
                    >
                      {/* File Icon and Type */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {getFileIcon(filename)}
                          <span className="text-xs font-medium text-gray-500 uppercase">
                            {fileType}
                          </span>
                        </div>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleFileSelect(filename)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>

                      {/* File Info */}
                      <div className="space-y-2">
                        {/* Title */}
                        <h3 className="font-medium text-gray-900 line-clamp-2" title={title}>
                          {title}
                        </h3>

                        {/* Episode Info (for series) */}
                        {episodeInfo && (
                          <div className="text-sm text-gray-600">
                            Season {episodeInfo.season}, Episode {episodeInfo.episode}
                          </div>
                        )}

                        {/* Filename */}
                        <div className="text-xs text-gray-500 truncate" title={filename}>
                          {filename}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                        <span className="text-xs text-gray-500">
                          {/* File size would need to be fetched from backend */}
                        </span>
                        <div className="flex gap-1">
                          <button
                            className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                            title="Open file"
                            onClick={(e) => {
                              e.stopPropagation();
                              toast.info('File opening would be implemented with backend file serving');
                            }}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </button>
                          <button
                            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                            title="Delete file"
                            onClick={(e) => {
                              e.stopPropagation();
                              toast.info('File deletion would be implemented with backend API');
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <Download className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No downloads yet
            </h3>
            <p className="text-gray-600 mb-4">
              Start searching and downloading videos to see them here
            </p>
            <a
              href="/"
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/';
              }}
            >
              Start Searching
            </a>
          </div>
        )}
      </div>

      {/* Refresh Info */}
      {downloads && downloads.length > 0 && (
        <div className="text-center text-sm text-gray-500">
          Downloads list refreshes automatically every 30 seconds
        </div>
      )}
    </div>
  );
};

export default DownloadsPage;
