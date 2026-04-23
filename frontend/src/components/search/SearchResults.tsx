import { SearchResult } from '../../types/api';
import { formatImdbRating, truncateText } from '../../utils/format';
import { Eye, Calendar, Star, Film } from 'lucide-react';

interface SearchResultsProps {
  results: SearchResult[];
  totalCount: number;
  hasMore: boolean;
  onViewDetails: (detailPath: string) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  totalCount,
  hasMore,
  onViewDetails,
}) => {
  const getContentTypeIcon = (subjectType: number) => {
    return subjectType === 1 ? Film : Calendar;
  };

  const getContentTypeText = (subjectType: number) => {
    return subjectType === 1 ? 'Movie' : 'Series';
  };

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">
          Search Results
          <span className="ml-2 text-lg text-gray-600">
            ({totalCount} found)
          </span>
        </h2>
        {hasMore && (
          <p className="text-sm text-gray-600">
            More results available on next page
          </p>
        )}
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {results.map((result) => {
          const ContentTypeIcon = getContentTypeIcon(result.subjectType);
          
          return (
            <div
              key={result.subjectId}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              {/* Cover Image */}
              <div className="relative aspect-[3/4] bg-gray-200">
                {result.coverUrl ? (
                  <img
                    src={result.coverUrl}
                    alt={result.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to placeholder on error
                      e.currentTarget.src = 'https://via.placeholder.com/300x450/374151/ffffff?text=No+Image';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-300">
                    <Film className="w-12 h-12 text-gray-500" />
                  </div>
                )}
                
                {/* Content Type Badge */}
                <div className="absolute top-2 left-2">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-black bg-opacity-70 text-white text-xs rounded-md">
                    <ContentTypeIcon className="w-3 h-3" />
                    {getContentTypeText(result.subjectType)}
                  </span>
                </div>

                {/* Resource Available Badge */}
                {result.hasResource && (
                  <div className="absolute top-2 right-2">
                    <span className="inline-flex items-center px-2 py-1 bg-green-600 bg-opacity-90 text-white text-xs rounded-md">
                      Available
                    </span>
                  </div>
                )}
              </div>

              {/* Content Info */}
              <div className="p-4 space-y-3">
                {/* Title */}
                <h3 className="font-semibold text-gray-900 line-clamp-2" title={result.title}>
                  {truncateText(result.title, 40)}
                </h3>

                {/* Metadata */}
                <div className="space-y-2 text-sm text-gray-600">
                  {/* Genre */}
                  {result.genre && (
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Genre:</span>
                      <span>{result.genre}</span>
                    </div>
                  )}

                  {/* Release Date */}
                  {result.releaseDate && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{result.releaseDate}</span>
                    </div>
                  )}

                  {/* IMDB Rating */}
                  {result.imdbRating && (
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>{formatImdbRating(result.imdbRating)}</span>
                    </div>
                  )}

                  {/* Subtitles */}
                  {result.subtitles && (
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Subtitles:</span>
                      <span>{result.subtitles}</span>
                    </div>
                  )}
                </div>

                {/* View Details Button */}
                <button
                  onClick={() => onViewDetails(result.detailPath)}
                  className="w-full btn btn-primary flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Load More Indicator */}
      {hasMore && (
        <div className="text-center py-6">
          <p className="text-gray-600">
            Showing {results.length} of {totalCount} results
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Use the search form to load more results
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
