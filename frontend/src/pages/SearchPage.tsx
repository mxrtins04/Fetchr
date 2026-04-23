import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import toast from 'react-hot-toast';
import { useSearch } from '../hooks/useApi';
import SearchForm from '../components/search/SearchForm';
import SearchResults from '../components/search/SearchResults';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { SearchRequest } from '../types/api';

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchRequest, setSearchRequest] = useState<SearchRequest>({
    keyword: '',
    page: 1,
    perPage: 20,
    subjectType: 0,
  });

  const { data, isLoading, error, refetch } = useSearch(searchRequest, !!searchRequest.keyword);

  const handleSearch = (newRequest: SearchRequest) => {
    setSearchRequest(newRequest);
  };

  const handleViewDetails = (detailPath: string) => {
    navigate(`/detail/${encodeURIComponent(detailPath)}`);
  };

  if (error) {
    toast.error(error.message);
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Fetchr Video Downloader
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Search and download your favorite videos with ease. Find movies, series, and more from our extensive library.
        </p>
      </div>

      {/* Search Form */}
      <div className="max-w-2xl mx-auto">
        <SearchForm
          searchRequest={searchRequest}
          onSearch={handleSearch}
          isLoading={isLoading}
        />
      </div>

      {/* Search Results */}
      <div className="min-h-[400px]">
        {isLoading && !data && (
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner size="large" />
          </div>
        )}

        {data && data.items.length > 0 && (
          <SearchResults
            results={data.items}
            totalCount={data.totalCount}
            hasMore={data.hasMore}
            onViewDetails={handleViewDetails}
          />
        )}

        {data && data.items.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No results found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search terms or filters
            </p>
          </div>
        )}

        {!searchRequest.keyword && !isLoading && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Start searching
            </h3>
            <p className="text-gray-600">
              Enter a keyword above to find videos
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
