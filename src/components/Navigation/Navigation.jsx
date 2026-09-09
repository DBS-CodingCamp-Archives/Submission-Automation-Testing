import {
  LogOut,
  MessageCircle,
  MessageSquare,
  Plus,
  Trophy,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { asyncUnsetAuthUser } from '../../states/authUser/slice';

function Navigation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authUser);

  function handleLogout() {
    dispatch(asyncUnsetAuthUser());
    navigate('/login');
  }

  return (
    <nav className="fixed top-0 left-0 right-0 h-15.5 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md z-50">
      <div className="max-w-6xl mx-auto px-4 w-full h-full flex items-center justify-between">
        <NavLink
          to="/"
          className="flex items-center gap-2 text-lg font-bold text-white hover:opacity-80 transition-opacity"
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-violet-600 text-white">
            <MessageCircle size={18} />
          </span>
          ForumApp
        </NavLink>

        <div className="hidden md:flex items-center gap-2 mx-8 flex-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'text-white bg-zinc-800'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
              }`
            }
            end
          >
            <span className="flex items-center gap-2">
              <MessageSquare size={16} />
              Threads
            </span>
          </NavLink>
          <NavLink
            to="/leaderboards"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'text-white bg-zinc-800'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
              }`
            }
          >
            <span className="flex items-center gap-2">
              <Trophy size={16} />
              Leaderboard
            </span>
          </NavLink>
        </div>

        <div className="flex items-center gap-3">
          {authUser ? (
            <>
              <button
                type="button"
                className="items-center justify-center gap-2 rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-violet-700 hidden md:inline-flex"
                onClick={() => navigate('/new')}
              >
                <Plus size={14} />
                Buat Thread
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-violet-600 text-white transition-colors hover:bg-violet-700 md:hidden"
                onClick={() => navigate('/new')}
              >
                <Plus size={16} />
              </button>
              <img
                className="w-8 h-8 rounded-full border border-zinc-700 object-cover bg-zinc-800"
                src={authUser.avatar}
                alt={authUser.name}
                title={authUser.name}
              />
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg border border-zinc-700 bg-transparent p-1.5 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
                onClick={handleLogout}
                title="Logout"
              >
                <LogOut size={16} />
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="inline-flex items-center justify-center rounded-lg border border-zinc-700 bg-transparent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
              >
                Masuk
              </NavLink>
              <NavLink
                to="/register"
                className="inline-flex items-center justify-center rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-violet-700"
              >
                Daftar
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
