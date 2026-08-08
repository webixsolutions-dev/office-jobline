import SavedJobCard from './SavedJobCard';

export default function SavedJobGrid({
  jobs,
  onRemove,
  formatDate,
  getJobStatusDisplay,
}) {
  if (!jobs || jobs.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
        <p className="text-slate-500">No saved jobs found</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job) => (
        <SavedJobCard
          key={job.id}
          job={job}
          onRemove={onRemove}
          formatDate={formatDate}
          getJobStatusDisplay={getJobStatusDisplay}
        />
      ))}
    </div>
  );
}