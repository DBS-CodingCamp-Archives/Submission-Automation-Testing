import { Trophy } from 'lucide-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LeaderboardItem from '../components/leaderboard/LeaderboardItem';
import { asyncPopulateLeaderboards } from '../states/leaderboards/action';

function LeaderboardPage() {
  const dispatch = useDispatch();
  const leaderboards = useSelector((state) => state.leaderboards);

  useEffect(() => {
    dispatch(asyncPopulateLeaderboards());
  }, [dispatch]);

  return (
    <div className="max-w-4xl mx-auto px-4 w-full">
      <div className="pt-7 pb-12">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white flex items-center justify-center gap-3">
            <Trophy size={32} className="text-yellow-500" />
            Leaderboard
          </h1>
          <p className="text-zinc-400 text-lg mt-3">
            Pengguna paling aktif dan berkontribusi di komunitas ForumApp
          </p>
        </div>

        {leaderboards.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="text-5xl opacity-50 mb-4">🏆</div>
            <p className="text-xl font-semibold text-zinc-300">
              Memuat leaderboard...
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {leaderboards.map((item, index) => (
              <LeaderboardItem
                key={item.user.id}
                item={item}
                rank={index + 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default LeaderboardPage;
