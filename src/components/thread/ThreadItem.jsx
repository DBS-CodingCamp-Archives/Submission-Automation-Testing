import { formatDistanceToNow } from 'date-fns';
import { id as localeId } from 'date-fns/locale';
import { Clock, MessageSquare, ThumbsDown, ThumbsUp } from 'lucide-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ThreadItem({
  thread,
  owner,
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

  function handleUpvote(e) {
    e.preventDefault();
    if (!authUserId) return;
    if (isUpvoted) {
      onNeutralizeVote(thread.id);
    } else {
      onUpvote(thread.id);
    }
  }

  function handleDownvote(e) {
    e.preventDefault();
    if (!authUserId) return;
    if (isDownvoted) {
      onNeutralizeVote(thread.id);
    } else {
      onDownvote(thread.id);
    }
  }

  const bodyText = thread.body ? thread.body.replace(/<[^>]+>/g, '') : '';

  return (
    <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-all hover:border-zinc-700 hover:shadow-lg hover:shadow-black/20 max-w-3xl">
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <div className="flex items-center gap-2">
          {owner && (
            <img
              className="w-8 h-8 rounded-full object-cover bg-zinc-800"
              src={owner.avatar}
              alt={owner.name}
            />
          )}
          <span className="font-medium text-sm text-zinc-200">
            {owner ? owner.name : 'Unknown'}
          </span>
        </div>
        <span className="flex items-center gap-1.5 text-xs text-zinc-500">
          <Clock size={12} />
          {timeAgo}
        </span>
        {thread.category && (
          <span className="ml-auto px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide uppercase border border-violet-500/30 bg-violet-500/10 text-violet-400">
            #{thread.category}
          </span>
        )}
      </div>

      <Link to={`/threads/${thread.id}`} className="block group mb-5">
        <h2 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-violet-400 transition-colors">
          {thread.title}
        </h2>
        {bodyText && (
          <p className="text-zinc-400 text-sm line-clamp-2">{bodyText}</p>
        )}
      </Link>

      <div className="flex items-center gap-4 pt-4 border-t border-zinc-800/50">
        <button
          type="button"
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border ${
            isUpvoted
              ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
              : 'text-zinc-400 bg-zinc-950/50 border-zinc-800 hover:bg-zinc-800 hover:text-zinc-200'
          }`}
          onClick={handleUpvote}
          title={authUserId ? 'Upvote' : 'Login untuk vote'}
        >
          <ThumbsUp size={14} />
          {thread.upVotesBy.length}
        </button>

        <button
          type="button"
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border ${
            isDownvoted
              ? 'text-rose-400 bg-rose-500/10 border-rose-500/30'
              : 'text-zinc-400 bg-zinc-950/50 border-zinc-800 hover:bg-zinc-800 hover:text-zinc-200'
          }`}
          onClick={handleDownvote}
          title={authUserId ? 'Downvote' : 'Login untuk vote'}
        >
          <ThumbsDown size={14} />
          {thread.downVotesBy.length}
        </button>

        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 ml-auto">
          <MessageSquare size={14} />
          {thread.totalComments} komentar
        </span>
      </div>
    </article>
  );
}

ThreadItem.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string,
    category: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    totalComments: PropTypes.number.isRequired,
  }).isRequired,
  owner: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }),
  authUserId: PropTypes.string,
  onUpvote: PropTypes.func.isRequired,
  onDownvote: PropTypes.func.isRequired,
  onNeutralizeVote: PropTypes.func.isRequired,
};

ThreadItem.defaultProps = {
  owner: null,
  authUserId: null,
};

export default ThreadItem;
