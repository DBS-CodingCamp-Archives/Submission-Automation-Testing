import { formatDistanceToNow } from 'date-fns';
import { id as localeId } from 'date-fns/locale';
import parse from 'html-react-parser';
import { Clock, ThumbsDown, ThumbsUp } from 'lucide-react';
import PropTypes from 'prop-types';

function ThreadDetail({
  thread,
  authUserId,
  onUpvote,
  onDownvote,
  onNeutralizeVote,
}) {
  const createdAt = new Date(thread.createdAt);
  const timeAgo = formatDistanceToNow(createdAt, {
    addSuffix: true,
    locale: localeId,
  });

  const isUpvoted = thread.upVotesBy.includes(authUserId);
  const isDownvoted = thread.downVotesBy.includes(authUserId);

  function handleUpvote() {
    if (!authUserId) return;
    if (isUpvoted) onNeutralizeVote();
    else onUpvote();
  }

  function handleDownvote() {
    if (!authUserId) return;
    if (isDownvoted) onNeutralizeVote();
    else onDownvote();
  }

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 md:p-8 mb-8">
      {thread.category && (
        <span className="inline-block px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide uppercase border border-violet-500/30 bg-violet-500/10 text-violet-400 mb-4">
          #{thread.category}
        </span>
      )}
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
        {thread.title}
      </h1>

      <div className="flex items-center gap-3 mb-8 pb-6 border-b border-zinc-800/50">
        <img
          className="w-10 h-10 rounded-full object-cover bg-zinc-800"
          src={thread.owner.avatar}
          alt={thread.owner.name}
        />
        <div>
          <p className="font-semibold text-[0.95rem] text-zinc-100">
            {thread.owner.name}
          </p>
          <p className="text-[0.8rem] text-zinc-500 flex items-center gap-1 mt-0.5">
            <Clock size={12} />
            {timeAgo}
          </p>
        </div>
      </div>

      <div className="text-zinc-300 leading-relaxed mb-8 wrap-break-word [&>p]:mb-4 last:[&>p]:mb-0">
        {parse(thread.body)}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors border ${
            isUpvoted
              ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
              : 'text-zinc-400 bg-zinc-950/50 border-zinc-800 hover:bg-zinc-800 hover:text-zinc-200'
          }`}
          onClick={handleUpvote}
          title={authUserId ? 'Upvote thread' : 'Login untuk vote'}
        >
          <ThumbsUp size={16} />
          {thread.upVotesBy.length} Upvote
        </button>

        <button
          type="button"
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors border ${
            isDownvoted
              ? 'text-rose-400 bg-rose-500/10 border-rose-500/30'
              : 'text-zinc-400 bg-zinc-950/50 border-zinc-800 hover:bg-zinc-800 hover:text-zinc-200'
          }`}
          onClick={handleDownvote}
          title={authUserId ? 'Downvote thread' : 'Login untuk vote'}
        >
          <ThumbsDown size={16} />
          {thread.downVotesBy.length} Downvote
        </button>
      </div>
    </div>
  );
}

ThreadDetail.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    owner: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  authUserId: PropTypes.string,
  onUpvote: PropTypes.func.isRequired,
  onDownvote: PropTypes.func.isRequired,
  onNeutralizeVote: PropTypes.func.isRequired,
};

ThreadDetail.defaultProps = {
  authUserId: null,
};

export default ThreadDetail;
