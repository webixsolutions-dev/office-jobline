import ApplicationRow from './ApplicationRow';

export default function ApplicationTable({
  applications,
  canWithdraw,
  onWithdraw,
  formatDate,
  getJobStatusDisplay,
}) {
  if (!applications || applications.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
        <p className="text-slate-500">No applications found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50/80">
            <tr>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Job Details
              </th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Site
              </th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Applied Date
              </th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3.5 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100">
            {applications.map((app) => (
              <ApplicationRow
                key={app.id}
                application={app}
                canWithdraw={canWithdraw}
                onWithdraw={onWithdraw}
                formatDate={formatDate}
                getJobStatusDisplay={getJobStatusDisplay}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}