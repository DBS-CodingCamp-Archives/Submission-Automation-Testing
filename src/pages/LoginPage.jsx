import { MessageCircle } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import LoginInput from '../components/auth/LoginInput';
import { setAuthUser } from '../states/authUser/slice';
import { hideLoading, showLoading } from '../states/loading/slice';
import api from '../utils/api';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogin({ email, password }) {
    dispatch(showLoading());
    try {
      const token = await api.login({ email, password });
      api.putAccessToken(token);
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUser(authUser));
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-62px)] p-6 `bg-[radial-gradient(ellipse_at_top_left,rgba(124,58,237,0.15)_0%,transparent_60%),radial-gradient(ellipse_at_bottom_right,rgba(88,166,255,0.08)_0%,transparent_60%)]`">
      <div className="w-full max-w-105 rounded-3xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-xl p-8 md:p-10 shadow-xl">
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 bg-linear-to-br from-violet-500 to-violet-700 rounded-2xl flex items-center justify-center text-white shadow-[0_8px_24px_rgba(124,58,237,0.3)]">
            <MessageCircle size={28} />
          </div>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white text-center mb-2">
          Selamat Datang
        </h1>
        <p className="text-zinc-400 text-sm text-center mb-8">
          Masuk ke akun ForumApp Anda
        </p>

        <LoginInput onLogin={handleLogin} />

        <p className="mt-6 text-center text-sm text-zinc-400">
          Belum punya akun?{' '}
          <Link
            to="/register"
            className="text-violet-500 hover:text-violet-400 font-semibold transition-colors"
          >
            Daftar sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
