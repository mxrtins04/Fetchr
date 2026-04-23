import type { Season } from '../../types/api';
import { Play, List } from 'lucide-react';

interface EpisodeSelectorProps {
  seasons: Season[];
  selectedSeason: number;
  selectedEpisode: number;
  onSeasonChange: (season: number) => void;
  onEpisodeChange: (episode: number) => void;
  disabled?: boolean;
}

const EpisodeSelector: React.FC<EpisodeSelectorProps> = ({
  seasons,
  selectedSeason,
  selectedEpisode,
  onSeasonChange,
  onEpisodeChange,
  disabled = false,
}) => {
  const currentSeason = seasons.find(s => s.seasonNumber === selectedSeason) || seasons[0];
  const maxEpisodes = currentSeason?.maxEpisodes || 1;

  const handleSeasonChange = (seasonNumber: number) => {
    onSeasonChange(seasonNumber);
    onEpisodeChange(1); // Reset to first episode when season changes
  };

  const generateEpisodeRange = () => {
    const episodes = [];
    for (let i = 1; i <= maxEpisodes; i++) {
      episodes.push(i);
    }
    return episodes;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <List className="w-5 h-5" />
        Episode Selection
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Season Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Season
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {seasons.map((season) => (
              <button
                key={season.seasonNumber}
                onClick={() => handleSeasonChange(season.seasonNumber)}
                disabled={disabled}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedSeason === season.seasonNumber
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                Season {season.seasonNumber}
                <div className="text-xs opacity-75">
                  {season.maxEpisodes} episodes
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Episode Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Episode
          </label>
          <div className="space-y-2">
            {/* Episode Dropdown for large episode counts */}
            {maxEpisodes > 20 ? (
              <select
                value={selectedEpisode}
                onChange={(e) => onEpisodeChange(Number(e.target.value))}
                disabled={disabled}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none disabled:opacity-50"
              >
                {generateEpisodeRange().map((episode) => (
                  <option key={episode} value={episode}>
                    Episode {episode}
                  </option>
                ))}
              </select>
            ) : (
              /* Episode Grid for smaller episode counts */
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 max-h-48 overflow-y-auto p-2 border border-gray-200 rounded-md">
                {generateEpisodeRange().map((episode) => (
                  <button
                    key={episode}
                    onClick={() => onEpisodeChange(episode)}
                    disabled={disabled}
                    className={`px-2 py-2 rounded-md text-sm font-medium transition-colors ${
                      selectedEpisode === episode
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <div className="flex flex-col items-center">
                      <Play className="w-3 h-3 mb-1" />
                      <span>E{episode}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Current Selection Display */}
      <div className="mt-6 p-4 bg-gray-50 rounded-md">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Currently Selected:
          </div>
          <div className="font-medium text-gray-900">
            Season {selectedSeason}, Episode {selectedEpisode}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpisodeSelector;
