import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import LoadingBar from './components/Loading/LoadingBar';
import Navigation from './components/Navigation/Navigation';
import AddThreadPage from './pages/AddThreadPage';
import DetailPage from './pages/DetailPage';
import HomePage from './pages/HomePage';
import LeaderboardPage from './pages/LeaderboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { asyncPreloadProcess } from './states/isPreload/slice';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch();
  const isPreload = useSelector((state) => state.isPreload);

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreload) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-zinc-400 text-sm">Memuat aplikasi...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-white">
      <LoadingBar />
      <ToastContainer theme="dark" position="bottom-right" />

      <Navigation />

      <main className="flex-1 pt-15.5">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/threads/:id" element={<DetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/new" element={<AddThreadPage />} />
          <Route path="/leaderboards" element={<LeaderboardPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
