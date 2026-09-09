import { formatDistanceToNow } from 'date-fns';
import { id as localeId } from 'date-fns/locale';
import parse from 'html-react-parser';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import PropTypes from 'prop-types';

function CommentItem({
  comment,
  authUserId,
  onUpvote,
  onDownvote,
  onNeutralizeVote,
}) {
  const createdAt = new Date(comment.createdAt);
  const timeAgo = formatDistanceToNow(createdAt, {
    addSuffix: true,
    locale: localeId,
  });

  const isUpvoted = comment.upVotesBy.includes(authUserId);
  const isDownvoted = comment.downVotesBy.includes(authUserId);

  function handleUpvote() {
    if (!authUserId) return;
    if (isUpvoted) onNeutralizeVote(comment.id);
    else onUpvote(comment.id);
  }

  function handleDownvote() {
    if (!authUserId) return;
    if (isDownvoted) onNeutralizeVote(comment.id);
    else onDownvote(comment.id);
  }

  return (
    <div className="flex gap-4 p-5 md:p-6 mb-4 rounded-2xl border border-zinc-800/80 bg-zinc-900/30 hover:bg-zinc-900/60 transition-colors">
      <img
        className="w-10 h-10 rounded-full object-cover shrink-0 bg-zinc-800"
        src={comment.owner.avatar}
        alt={comment.owner.name}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="font-bold text-sm text-zinc-100">{comment.owner.name}</span>
          <span className="text-xs text-zinc-500">{timeAgo}</span>
        </div>
        <div className="text-sm text-zinc-300 leading-relaxed wrap-break-word mb-4 [&>p]:mb-2 last:[&>p]:mb-0">{parse(comment.content)}</div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border ${
              isUpvoted
                ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
                : 'text-zinc-400 bg-zinc-950/50 border-zinc-800 hover:bg-zinc-800 hover:text-zinc-200'
            }`}
            onClick={handleUpvote}
            title={authUserId ? 'Upvote komentar' : 'Login untuk vote'}
          >
            <ThumbsUp size={14} />
            {comment.upVotesBy.length}
          </button>
          <button
            type="button"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border ${
              isDownvoted
                ? 'text-rose-400 bg-rose-500/10 border-rose-500/30'
                : 'text-zinc-400 bg-zinc-950/50 border-zinc-800 hover:bg-zinc-800 hover:text-zinc-200'
            }`}
            onClick={handleDownvote}
            title={authUserId ? 'Downvote komentar' : 'Login untuk vote'}
          >
            <ThumbsDown size={14} />
            {comment.downVotesBy.length}
          </button>
        </div>
      </div>
    </div>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
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

CommentItem.defaultProps = {
  authUserId: null,
};

export default CommentItem;
