import { useNavigate } from 'react-router-dom';
import { FiBookmark } from 'react-icons/fi';
import {
  PageHeader,
  DataState,
  ConfirmModal,
} from '../../../components/dashboard/common';
import { useSavedJobs } from '../../../hooks/seeker/useSavedJobs';
import { SavedJobFilters, SavedJobGrid } from '../../../components/dashboard/SavedJob';

export default function SavedJobs() {
  const navigate = useNavigate();
  const {
    filteredJobs,
    savedJobs,
    searchTerm,
    setSearchTerm,
    isLoading,
    isError,
    isSubmitting,
    showRemoveModal,
    handleRemove,
    confirmRemove,
    cancelRemove,
    handleRetry,
    formatDate,
    getJobStatusDisplay,
  } = useSavedJobs();

  return (
    <>
      <PageHeader 
        title="Saved Jobs" 
        subtitle="Jobs you've saved for later — they'll stay here even after they expire."
      />

      <SavedJobFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <DataState
        isLoading={isLoading}
        isError={isError}
        isEmpty={!isLoading && !isError && filteredJobs.length === 0}
        onRetry={handleRetry}
        loadingVariant="cards"
        loadingRows={3}
        empty={{
          icon: FiBookmark,
          title: "No saved jobs yet",
          description: "Start saving jobs you're interested in!",
          actionLabel: 'Browse Jobs',
          onAction: () => navigate('/browse')
        }}
      >
        <SavedJobGrid
          jobs={filteredJobs}
          onRemove={handleRemove}
          formatDate={formatDate}
          getJobStatusDisplay={getJobStatusDisplay}
        />
      </DataState>

      {!isLoading && !isError && filteredJobs.length > 0 && (
        <div className="mt-4 text-sm text-slate-500">
          Showing {filteredJobs.length} of {savedJobs.length} saved jobs
        </div>
      )}

      <ConfirmModal
        isOpen={!!showRemoveModal}
        title="Remove saved job?"
        description="This job will be removed from your saved list. You can always save it again later."
        confirmLabel="Remove"
        danger={true}
        isSubmitting={isSubmitting}
        onConfirm={confirmRemove}
        onClose={cancelRemove}
      />
    </>
  );
}