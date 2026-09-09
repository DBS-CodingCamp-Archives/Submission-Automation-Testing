import { Trophy } from 'lucide-react';
import PropTypes from 'prop-types';

function LeaderboardItem({ item, rank }) {
  const rankIcons = { 1: '🥇', 2: '🥈', 3: '🥉' };
  const isTop = rank <= 3;

  return (
    <div className="flex items-center p-4 md:p-5 rounded-2xl border border-zinc-800/80 bg-zinc-900 hover:bg-zinc-800/50 transition-colors">
      <span className={`w-12 text-center font-bold text-zinc-500 ${isTop ? 'text-2xl' : 'text-lg'}`}>
        {isTop ? rankIcons[rank] : `#${rank}`}
      </span>
      <div className="flex flex-1 items-center gap-3 md:gap-4 ml-2 min-w-0">
        <img
          className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover shrink-0 bg-zinc-800"
          src={item.user.avatar}
          alt={item.user.name}
        />
        <div className="min-w-0 flex-1">
          <p className="font-bold text-sm md:text-base text-zinc-100 truncate">{item.user.name}</p>
          <p className="text-xs md:text-sm text-zinc-400 truncate">
            @{item.user.name.toLowerCase().replace(/\s/g, '')}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1.5 px-3 md:px-4 py-1.5 md:py-2 rounded-xl bg-violet-500/10 text-violet-400 font-bold text-sm md:text-base ml-4 shrink-0">
        <Trophy size={16} />
        {item.score}
      </div>
    </div>
  );
}

LeaderboardItem.propTypes = {
  item: PropTypes.shape({
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }).isRequired,
    score: PropTypes.number.isRequired,
  }).isRequired,
  rank: PropTypes.number.isRequired,
};

export default LeaderboardItem;
