import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { SearchRequest } from '../../types/api';

interface SearchFormProps {
  searchRequest: SearchRequest;
  onSearch: (request: SearchRequest) => void;
  isLoading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ searchRequest, onSearch, isLoading }) => {
  const [keyword, setKeyword] = useState(searchRequest.keyword);
  const [showFilters, setShowFilters] = useState(false);
  const [subjectType, setSubjectType] = useState(searchRequest.subjectType);
  const [perPage, setPerPage] = useState(searchRequest.perPage);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      onSearch({
        keyword: keyword.trim(),
        page: 1,
        perPage,
        subjectType,
      });
    }
  };

  const handleReset = () => {
    setKeyword('');
    setSubjectType(0);
    setPerPage(20);
    setShowFilters(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Main Search Input */}
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search for movies, series, or keywords..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={!keyword.trim() || isLoading}
            className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {/* Filters Toggle */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Filter className="w-4 h-4" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
          
          {(keyword || subjectType !== 0 || perPage !== 20) && (
            <button
              type="button"
              onClick={handleReset}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="border-t pt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Subject Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content Type
                </label>
                <select
                  value={subjectType}
                  onChange={(e) => setSubjectType(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value={0}>All Content</option>
                  <option value={1}>Movies</option>
                  <option value={2}>Series</option>
                </select>
              </div>

              {/* Results Per Page */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Results Per Page
                </label>
                <select
                  value={perPage}
                  onChange={(e) => setPerPage(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value={10}>10 results</option>
                  <option value={20}>20 results</option>
                  <option value={50}>50 results</option>
                  <option value={100}>100 results</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchForm;
