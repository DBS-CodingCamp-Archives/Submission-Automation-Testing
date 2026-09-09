import PropTypes from 'prop-types';
import ThreadItem from './ThreadItem';

function ThreadList({
  threads,
  users,
  authUserId,
  onUpvote,
  onDownvote,
  onNeutralizeVote,
}) {
  if (threads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-5xl opacity-50 mb-4">💬</div>
        <p className="text-xl font-semibold text-zinc-300">Belum ada thread di sini</p>
        <p className="text-sm text-zinc-400 mt-2">
          Jadilah yang pertama membuat thread!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {threads.map((thread) => {
        const owner = users.find((u) => u.id === thread.ownerId);
        return (
          <ThreadItem
            key={thread.id}
            thread={thread}
            owner={owner}
            authUserId={authUserId}
            onUpvote={onUpvote}
            onDownvote={onDownvote}
            onNeutralizeVote={onNeutralizeVote}
          />
        );
      })}
    </div>
  );
}

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.object).isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  authUserId: PropTypes.string,
  onUpvote: PropTypes.func.isRequired,
  onDownvote: PropTypes.func.isRequired,
  onNeutralizeVote: PropTypes.func.isRequired,
};

ThreadList.defaultProps = {
  authUserId: null,
};

export default ThreadList;
