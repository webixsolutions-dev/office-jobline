import EmptyState from './EmptyState';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';

export default function DataState({
  isLoading,
  isError,
  isEmpty,
  onRetry,
  loadingVariant = 'table',
  loadingRows = 4,
  error = {},
  empty = {},
  children,
}) {
  if (isLoading) {
    return <LoadingState variant={loadingVariant} rows={loadingRows} />;
  }
  
  if (isError) {
    return <ErrorState onRetry={onRetry} {...error} />;
  }
  
  if (isEmpty) {
    return <EmptyState {...empty} />;
  }
  
  return children;
}