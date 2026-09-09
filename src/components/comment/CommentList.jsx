import { MessageSquare } from 'lucide-react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

function CommentList({
  comments,
  authUserId,
  onUpvote,
  onDownvote,
  onNeutralizeVote,
}) {
  return (
    <div className="mt-10 mb-20">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <MessageSquare size={20} />
        {comments.length} Komentar
      </h2>
      {comments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center border-t border-zinc-800">
          <p className="text-zinc-400 text-sm">
            Belum ada komentar. Jadilah yang pertama!
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              authUserId={authUserId}
              onUpvote={onUpvote}
              onDownvote={onDownvote}
              onNeutralizeVote={onNeutralizeVote}
            />
          ))}
        </div>
      )}
    </div>
  );
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  authUserId: PropTypes.string,
  onUpvote: PropTypes.func.isRequired,
  onDownvote: PropTypes.func.isRequired,
  onNeutralizeVote: PropTypes.func.isRequired,
};

CommentList.defaultProps = {
  authUserId: null,
};

export default CommentList;
