import { useSelector } from 'react-redux';
import { selectIsLoading } from '../../states/loading/slice';

function LoadingBar() {
  const isLoading = useSelector(selectIsLoading);

  if (!isLoading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-9999 h-0.75 overflow-hidden">
      <div
        className="h-full bg-linear-to-r from-violet-500/50 to-violet-500 shadow-[0_0_10px_rgba(139,92,246,1)]"
        style={{
          animation: 'loadingSlide 1.2s ease-in-out infinite',
        }}
      />
      <style>{`
        @keyframes loadingSlide {
          0% { width: 0%; margin-left: 0%; }
          50% { width: 70%; margin-left: 15%; }
          100% { width: 0%; margin-left: 100%; }
        }
      `}</style>
    </div>
  );
}

export default LoadingBar;
