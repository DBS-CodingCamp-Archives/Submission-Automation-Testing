import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ThreadList from '../components/thread/ThreadList';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import {
  asyncNeutralizeThreadVote,
  asyncToggleDownvoteThread,
  asyncToggleUpvoteThread,
} from '../states/threads/action';

function HomePage() {
  const dispatch = useDispatch();
  const { threads, users, authUser } = useSelector((state) => ({
    threads: state.threads,
    users: state.users,
    authUser: state.authUser,
  }));

  const [activeCategory, setActiveCategory] = useState('');

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const categories = [
    ...new Set(threads.map((t) => t.category).filter(Boolean)),
  ];

  const filteredThreads = activeCategory
    ? threads.filter((t) => t.category === activeCategory)
    : threads;

  function handleUpvote(threadId) {
    dispatch(asyncToggleUpvoteThread(threadId));
  }

  function handleDownvote(threadId) {
    dispatch(asyncToggleDownvoteThread(threadId));
  }

  function handleNeutralize(threadId) {
    dispatch(asyncNeutralizeThreadVote(threadId));
  }

  return (
    <div className="max-w-6xl mx-auto px-4 w-full">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8 py-8 md:py-12">
        {/* Main Thread Column */}
        <main>
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">
              Forum Diskusi
            </h1>
            <p className="text-zinc-400 text-lg">
              Temukan dan ikuti diskusi menarik bersama komunitas
            </p>
          </div>

          {/* Filter Bar */}
          {categories.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-8">
              <span className="text-zinc-500 font-semibold text-sm uppercase tracking-wider mr-1">
                Kategori:
              </span>
              <button
                type="button"
                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  activeCategory === ''
                    ? 'border-violet-500/50 bg-violet-500/10 text-violet-500'
                    : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white'
                }`}
                onClick={() => setActiveCategory('')}
              >
                Semua
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                    activeCategory === cat
                      ? 'border-violet-500/50 bg-violet-500/10 text-violet-500'
                      : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white'
                  }`}
                  onClick={() =>
                    setActiveCategory(cat === activeCategory ? '' : cat)
                  }
                >
                  #{cat}
                </button>
              ))}
            </div>
          )}

          <ThreadList
            threads={filteredThreads}
            users={users}
            authUserId={authUser ? authUser.id : null}
            onUpvote={handleUpvote}
            onDownvote={handleDownvote}
            onNeutralizeVote={handleNeutralize}
          />
        </main>

        {/* Sidebar */}
        <aside>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 mb-6">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-4">
              Mulai Diskusi
            </p>
            {authUser ? (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <img
                    className="w-10 h-10 rounded-full object-cover bg-zinc-800"
                    src={authUser.avatar}
                    alt={authUser.name}
                  />
                  <div>
                    <p className="font-semibold text-sm text-white">
                      {authUser.name}
                    </p>
                    <p className="text-xs text-zinc-400">Member aktif</p>
                  </div>
                </div>
                <Link
                  to="/new"
                  className="inline-flex items-center justify-center gap-2 w-full rounded-lg bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-700"
                >
                  <Plus size={15} />
                  Buat Thread Baru
                </Link>
              </div>
            ) : (
              <div>
                <p className="text-sm text-zinc-400 mb-4">
                  Masuk untuk membuat thread dan berinteraksi dengan komunitas.
                </p>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center w-full rounded-lg bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-700"
                >
                  Masuk Sekarang
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center w-full rounded-lg border border-zinc-700 bg-transparent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 mt-2"
                >
                  Buat Akun Baru
                </Link>
              </div>
            )}
          </div>

          {categories.length > 0 && (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-4">
                Kategori Populer
              </p>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                      activeCategory === cat
                        ? 'border-violet-500/50 bg-violet-500/10 text-violet-500'
                        : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white'
                    }`}
                    onClick={() =>
                      setActiveCategory(cat === activeCategory ? '' : cat)
                    }
                  >
                    #{cat}
                  </button>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

export default HomePage;
