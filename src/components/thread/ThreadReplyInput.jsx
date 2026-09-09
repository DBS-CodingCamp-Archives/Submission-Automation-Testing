import { Send } from 'lucide-react';
import PropTypes from 'prop-types';
import { useState } from 'react';

function ThreadReplyInput({ onSubmit, disabled }) {
  const [content, setContent] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmit(content);
    setContent('');
  }

  return (
    <div className="mt-8 p-6 md:p-8 rounded-3xl border border-zinc-800 bg-zinc-900 shadow-lg shadow-black/20">
      <p className="text-lg font-bold text-white mb-4">Tulis Komentar</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <textarea
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-5 py-4 text-sm text-white placeholder-zinc-600 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors resize-y min-h-24"
            placeholder="Bagikan pendapat atau pertanyaan Anda..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={disabled}
            rows={4}
            required
          />
        </div>
        <div className="mt-3 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={disabled || !content.trim()}
          >
            <Send size={16} />
            Kirim Komentar
          </button>
        </div>
      </form>
    </div>
  );
}

ThreadReplyInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

ThreadReplyInput.defaultProps = {
  disabled: false,
};

export default ThreadReplyInput;
