import { useNavigate } from 'react-router-dom';
import { FiBriefcase } from 'react-icons/fi';
import {
  PageHeader,
  DataState,
  ConfirmModal,
} from '../../../components/dashboard/common';
import { useApplications } from '../../../hooks/seeker/useApplications';
import ApplicationSearch from '../../../components/dashboard/Applications/ApplicationSearch';
import ApplicationFilters from '../../../components/dashboard/Applications/ApplicationFilters';
import ApplicationTable from '../../../components/dashboard/Applications/ApplicationTable';

export default function Applications() {
  const navigate = useNavigate();
  const {
    filteredApplications,
    applications,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    uniqueStatuses,
    isLoading,
    isError,
    isSubmitting,
    showWithdrawModal,
    handleWithdraw,
    confirmWithdraw,
    cancelWithdraw,
    handleRetry,
    formatDate,
    getJobStatusDisplay,
    canWithdraw,
  } = useApplications();

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  return (
    <>
      <PageHeader 
        title="My Applications" 
        subtitle="Track and manage all your job applications in one place"
      />

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <ApplicationSearch
          value={searchTerm}
          onChange={setSearchTerm}
          onClear={handleClearSearch}
        />
        <ApplicationFilters
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          getStatusCount={(status) => {
            if (status === 'all') return applications.length;
            return applications.filter(app => app.status === status).length;
          }}
          showFilters={false}
          onToggleFilters={() => {}}
          totalCount={applications.length}
        />
      </div>

      <DataState
        isLoading={isLoading}
        isError={isError}
        isEmpty={!isLoading && !isError && filteredApplications.length === 0}
        onRetry={handleRetry}
        loadingVariant="table"
        loadingRows={5}
        empty={{
          icon: FiBriefcase,
          title: "You haven't applied to any jobs yet",
          description: "Start browsing jobs and submit your applications!",
          actionLabel: 'Browse Jobs',
          onAction: () => navigate('/browse')
        }}
      >
        <ApplicationTable
          applications={filteredApplications}
          canWithdraw={canWithdraw}
          onWithdraw={handleWithdraw}
          formatDate={formatDate}
          getJobStatusDisplay={getJobStatusDisplay}
        />
      </DataState>

      {!isLoading && !isError && filteredApplications.length > 0 && (
        <div className="mt-4 text-sm text-slate-500">
          Showing {filteredApplications.length} of {applications.length} applications
        </div>
      )}

      <ConfirmModal
        isOpen={!!showWithdrawModal}
        title="Withdraw application?"
        description="You can't undo this. You'll need to re-apply if you change your mind."
        confirmLabel="Yes, Withdraw"
        danger={true}
        isSubmitting={isSubmitting}
        onConfirm={confirmWithdraw}
        onClose={cancelWithdraw}
      />
    </>
  );
}