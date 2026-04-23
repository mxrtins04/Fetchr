import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Play, Calendar, Star, Globe } from 'lucide-react';
import toast from 'react-hot-toast';
import { useContentDetail, useDownloadOptions } from '../hooks/useApi';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import EpisodeSelector from '../components/detail/EpisodeSelector';
import DownloadOptions from '../components/detail/DownloadOptions';
import { formatImdbRating, formatDuration } from '../utils/format';

const DetailPage = () => {
  const { detailPath } = useParams<{ detailPath: string }>();
  const navigate = useNavigate();

  if (!detailPath) {
    navigate('/');
    return null;
  }

  const decodedDetailPath = decodeURIComponent(detailPath);
  
  const { 
    data: contentData, 
    isLoading: contentLoading, 
    error: contentError 
  } = useContentDetail(decodedDetailPath);

  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);

  const {
    data: downloadData,
    isLoading: downloadLoading,
    error: downloadError
  } = useDownloadOptions(
    contentData?.subject.subjectId || '',
    selectedSeason,
    selectedEpisode,
    decodedDetailPath,
    !!contentData
  );

  if (contentError) {
    toast.error(contentError.message);
  }

  if (downloadError) {
    toast.error(downloadError.message);
  }

  const isLoading = contentLoading || downloadLoading;

  if (isLoading && !contentData) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!contentData) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Content not found
        </h2>
        <p className="text-gray-600 mb-4">
          The requested content could not be found.
        </p>
        <button
          onClick={() => navigate('/')}
          className="btn btn-primary"
        >
          Back to Search
        </button>
      </div>
    );
  }

  const { subject, seasons, dubs } = contentData;
  const currentSeason = seasons.find(s => s.seasonNumber === selectedSeason) || seasons[0];

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Search
      </button>

      {/* Content Header */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          {/* Cover Image */}
          <div className="md:w-1/3 lg:w-1/4">
            <div className="aspect-[3/4] bg-gray-200">
              {subject.coverUrl ? (
                <img
                  src={subject.coverUrl}
                  alt={subject.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/300x450/374151/ffffff?text=No+Image';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-300">
                  <Play className="w-12 h-12 text-gray-500" />
                </div>
              )}
            </div>
          </div>

          {/* Content Info */}
          <div className="md:w-2/3 lg:w-3/4 p-6 space-y-4">
            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900">{subject.title}</h1>

            {/* Metadata */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              {subject.releaseDate && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{subject.releaseDate}</span>
                </div>
              )}
              
              {subject.imdbRating && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>{formatImdbRating(subject.imdbRating)}</span>
                </div>
              )}

              {subject.genre && (
                <span className="px-2 py-1 bg-gray-100 rounded-md">
                  {subject.genre}
                </span>
              )}
            </div>

            {/* Description */}
            {subject.description && (
              <div className="text-gray-700">
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="line-clamp-4">{subject.description}</p>
              </div>
            )}

            {/* Dub Languages */}
            {dubs.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Available Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {dubs.map((dub) => (
                    <span
                      key={dub.lanCode}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-sm"
                    >
                      <Globe className="w-3 h-3" />
                      {dub.lanName}
                      {dub.original && (
                        <span className="text-xs bg-blue-200 px-1 rounded">Original</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Episode Selection (for series) */}
      {seasons.length > 0 && (
        <EpisodeSelector
          seasons={seasons}
          selectedSeason={selectedSeason}
          selectedEpisode={selectedEpisode}
          onSeasonChange={setSelectedSeason}
          onEpisodeChange={setSelectedEpisode}
          disabled={downloadLoading}
        />
      )}

      {/* Download Options */}
      {downloadData && (
        <DownloadOptions
          downloadData={downloadData}
          subjectId={subject.subjectId}
          detailPath={decodedDetailPath}
          title={subject.title}
          season={selectedSeason}
          episode={selectedEpisode}
          isLoading={downloadLoading}
        />
      )}
    </div>
  );
};

export default DetailPage;
