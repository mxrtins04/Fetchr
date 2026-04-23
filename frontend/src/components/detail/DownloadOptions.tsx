import { useState } from 'react';
import { DownloadOptionsResponse, BatchDownloadRequest } from '../../types/api';
import { useBatchDownload, useBatchProgress } from '../../hooks/useApi';
import toast from 'react-hot-toast';
import { Download, FileVideo, Subtitles, Settings, X, Check } from 'lucide-react';
import LoadingSpinner from '../ui/LoadingSpinner';
import { formatFileSize, formatResolution } from '../../utils/format';

interface DownloadOptionsProps {
  downloadData: DownloadOptionsResponse;
  subjectId: string;
  detailPath: string;
  title: string;
  season: number;
  episode: number;
  isLoading: boolean;
}

const DownloadOptions: React.FC<DownloadOptionsProps> = ({
  downloadData,
  subjectId,
  detailPath,
  title,
  season,
  episode,
  isLoading,
}) => {
  const [showBatchModal, setShowBatchModal] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState('720P');
  const [downloadSubtitles, setDownloadSubtitles] = useState(true);
  const [subtitleLanguage, setSubtitleLanguage] = useState('en');
  const [batchEpisodes, setBatchEpisodes] = useState<number[]>([episode]);

  const batchDownloadMutation = useBatchDownload();

  // Sort video options by resolution (highest first)
  const sortedVideos = [...downloadData.downloads].sort((a, b) => b.resolution - a.resolution);

  const handleSingleDownload = (videoId: string) => {
    const video = downloadData.downloads.find(v => v.id === videoId);
    if (!video) return;

    // For single download, we'll create a batch with just one episode
    const request: BatchDownloadRequest = {
      detailPath,
      subjectId,
      title,
      season,
      episodes: [episode],
      preferredQuality: formatResolution(video.resolution),
      downloadSubtitles,
      subtitleLanguage,
    };

    batchDownloadMutation.mutate(request, {
      onSuccess: (response) => {
        toast.success(`Download started for ${title} S${season.toString().padStart(2, '0')}E${episode.toString().padStart(2, '0')}`);
        setShowBatchModal(false);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  const handleBatchDownload = () => {
    const request: BatchDownloadRequest = {
      detailPath,
      subjectId,
      title,
      season,
      episodes: batchEpisodes,
      preferredQuality: selectedQuality,
      downloadSubtitles,
      subtitleLanguage,
    };

    batchDownloadMutation.mutate(request, {
      onSuccess: (response) => {
        toast.success(`Batch download started for ${batchEpisodes.length} episodes`);
        setShowBatchModal(false);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  const toggleEpisodeSelection = (ep: number) => {
    setBatchEpisodes(prev => 
      prev.includes(ep) 
        ? prev.filter(e => e !== ep)
        : [...prev, ep]
    );
  };

  const selectAllEpisodes = () => {
    // For now, let's assume max 24 episodes per season
    const allEpisodes = Array.from({ length: 24 }, (_, i) => i + 1);
    setBatchEpisodes(allEpisodes);
  };

  const clearSelection = () => {
    setBatchEpisodes([]);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-center items-center py-8">
          <LoadingSpinner size="large" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Download Options */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <Download className="w-5 h-5" />
          Download Options
        </h2>

        {/* Video Quality Options */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Video Quality</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedVideos.map((video) => (
              <div
                key={video.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <FileVideo className="w-4 h-4 text-blue-600" />
                    <span className="font-medium">{formatResolution(video.resolution)}</span>
                  </div>
                  <span className="text-sm text-gray-500">{formatFileSize(video.sizeBytes)}</span>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div>Format: {video.format}</div>
                  <div>Duration: {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}</div>
                  <div>Codec: {video.codecName}</div>
                </div>

                <button
                  onClick={() => handleSingleDownload(video.id)}
                  disabled={batchDownloadMutation.isPending}
                  className="w-full mt-3 btn btn-primary disabled:opacity-50"
                >
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Subtitle Options */}
        {downloadData.captions.length > 0 && (
          <div className="mt-6 pt-6 border-t">
            <h3 className="font-medium text-gray-900 mb-3">Available Subtitles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {downloadData.captions.map((caption) => (
                <div
                  key={caption.id}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-md"
                >
                  <div className="flex items-center gap-2">
                    <Subtitles className="w-4 h-4 text-green-600" />
                    <span className="text-sm">{caption.lanName}</span>
                  </div>
                  <span className="text-xs text-gray-500">{caption.size}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Batch Download Button */}
        <div className="mt-6 pt-6 border-t">
          <button
            onClick={() => setShowBatchModal(true)}
            className="btn btn-secondary flex items-center gap-2"
          >
            <Settings className="w-4 h-4" />
            Batch Download Options
          </button>
        </div>
      </div>

      {/* Batch Download Modal */}
      {showBatchModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Batch Download Settings
                </h3>
                <button
                  onClick={() => setShowBatchModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Episode Selection */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">Select Episodes</h4>
                  <div className="flex gap-2">
                    <button
                      onClick={selectAllEpisodes}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      Select All
                    </button>
                    <button
                      onClick={clearSelection}
                      className="text-sm text-gray-600 hover:text-gray-700"
                    >
                      Clear
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 max-h-40 overflow-y-auto p-2 border border-gray-200 rounded-md">
                  {Array.from({ length: 24 }, (_, i) => i + 1).map((ep) => (
                    <button
                      key={ep}
                      onClick={() => toggleEpisodeSelection(ep)}
                      className={`p-2 rounded text-sm transition-colors ${
                        batchEpisodes.includes(ep)
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      E{ep}
                    </button>
                  ))}
                </div>
                
                <div className="text-sm text-gray-600">
                  {batchEpisodes.length} episodes selected
                </div>
              </div>

              {/* Quality Selection */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-2">Video Quality</h4>
                <select
                  value={selectedQuality}
                  onChange={(e) => setSelectedQuality(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  {sortedVideos.map((video) => (
                    <option key={video.id} value={formatResolution(video.resolution)}>
                      {formatResolution(video.resolution)} - {formatFileSize(video.sizeBytes)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subtitle Options */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <input
                    type="checkbox"
                    id="downloadSubtitles"
                    checked={downloadSubtitles}
                    onChange={(e) => setDownloadSubtitles(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="downloadSubtitles" className="font-medium text-gray-900">
                    Download Subtitles
                  </label>
                </div>
                
                {downloadSubtitles && downloadData.captions.length > 0 && (
                  <select
                    value={subtitleLanguage}
                    onChange={(e) => setSubtitleLanguage(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    {downloadData.captions.map((caption) => (
                      <option key={caption.id} value={caption.lan}>
                        {caption.lanName}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Modal Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowBatchModal(false)}
                  className="btn btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBatchDownload}
                  disabled={batchDownloadMutation.isPending || batchEpisodes.length === 0}
                  className="btn btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {batchDownloadMutation.isPending ? (
                    <>
                      <LoadingSpinner size="small" />
                      Starting...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      Download {batchEpisodes.length} Episodes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DownloadOptions;
