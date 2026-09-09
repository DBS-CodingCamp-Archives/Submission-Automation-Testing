import { ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CommentList from '../components/comment/CommentList';
import ThreadDetail from '../components/thread/ThreadDetail';
import ThreadReplyInput from '../components/thread/ThreadReplyInput';
import {
  asyncAddComment,
  asyncNeutralizeCommentVote,
  asyncNeutralizeThreadDetailVote,
  asyncReceiveThreadDetail,
  asyncToggleDownvoteComment,
  asyncToggleDownvoteThreadDetail,
  asyncToggleUpvoteComment,
  asyncToggleUpvoteThreadDetail,
} from '../states/threadDetail/action';
import { clearThreadDetail } from '../states/threadDetail/slice';

function DetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { threadDetail, authUser } = useSelector((state) => ({
    threadDetail: state.threadDetail,
    authUser: state.authUser,
  }));

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
    return () => {
      dispatch(clearThreadDetail());
    };
  }, [dispatch, id]);

  function handleComment(content) {
    if (!authUser) {
      navigate('/login');
      return;
    }
    dispatch(asyncAddComment({ threadId: id, content }));
  }

  if (!threadDetail) {
    return (
      <div className="max-w-4xl mx-auto px-4 w-full pt-8">
        <div className="flex flex-col gap-4">
          <div className="skeleton h-6 w-3/5" />
          <div className="skeleton h-10 w-11/12" />
          <div className="skeleton h-48" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 w-full pt-7">
      <Link
        to="/"
        className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-transparent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 mb-5"
      >
        <ArrowLeft size={16} />
        Kembali
      </Link>

      <ThreadDetail
        thread={threadDetail}
        authUserId={authUser ? authUser.id : null}
        onUpvote={() => dispatch(asyncToggleUpvoteThreadDetail())}
        onDownvote={() => dispatch(asyncToggleDownvoteThreadDetail())}
        onNeutralizeVote={() => dispatch(asyncNeutralizeThreadDetailVote())}
      />

      {authUser ? (
        <ThreadReplyInput onSubmit={handleComment} />
      ) : (
        <div className="mt-8 p-6 text-center rounded-2xl border border-zinc-800 bg-zinc-900">
          <p className="text-zinc-400 text-sm mb-4">
            Anda perlu masuk untuk menulis komentar.
          </p>

          <Link
            to="/login"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-700"
          >
            Masuk untuk Berkomentar
          </Link>
        </div>
      )}

      <CommentList
        comments={threadDetail.comments}
        authUserId={authUser ? authUser.id : null}
        onUpvote={(commentId) => dispatch(asyncToggleUpvoteComment(commentId))}
        onDownvote={(commentId) =>
          dispatch(asyncToggleDownvoteComment(commentId))
        }
        onNeutralizeVote={(commentId) =>
          dispatch(asyncNeutralizeCommentVote(commentId))
        }
      />
    </div>
  );
}

export default DetailPage;
