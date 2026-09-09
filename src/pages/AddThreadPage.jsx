import { ArrowLeft, PenLine } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { asyncAddThread } from '../states/threads/action';

function AddThreadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.authUser);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    await dispatch(asyncAddThread({ title, body, category }));
    navigate('/');
  }

  return (
    <div className="max-w-4xl mx-auto px-4 w-full">
      <div className="pt-7 pb-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-transparent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 mb-5"
        >
          <ArrowLeft size={16} />
          Kembali
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <PenLine size={28} className="text-violet-500" />
            Buat Thread Baru
          </h1>

          <p className="text-zinc-400 text-lg mt-2">
            Bagikan ide, pertanyaan, atau diskusi Anda
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-sm">
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                className="block mb-2 text-sm font-semibold uppercase tracking-wide text-zinc-400"
                htmlFor="thread-title"
              >
                Judul Thread *
              </label>

              <input
                id="thread-title"
                type="text"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors"
                placeholder="Tuliskan judul thread yang menarik..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="mb-5">
              <label
                className="block mb-2 text-sm font-semibold uppercase tracking-wide text-zinc-400"
                htmlFor="thread-category"
              >
                Kategori
              </label>

              <input
                id="thread-category"
                type="text"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors"
                placeholder="cth: javascript, react, general (opsional)"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label
                className="block mb-2 text-sm font-semibold uppercase tracking-wide text-zinc-400"
                htmlFor="thread-body"
              >
                Isi Thread *
              </label>

              <textarea
                id="thread-body"
                className="w-full min-h-30 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors resize-y"
                placeholder="Tuliskan isi thread Anda di sini. HTML dasar diperbolehkan."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={10}
                required
              />
            </div>

            <div className="flex gap-3 justify-end">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-transparent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
                onClick={() => navigate('/')}
              >
                Batal
              </button>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!title.trim() || !body.trim()}
              >
                <PenLine size={16} />
                Publikasikan Thread
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddThreadPage;
