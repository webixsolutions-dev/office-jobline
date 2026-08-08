import { FiSearch } from 'react-icons/fi';

export default function SavedJobFilters({
  searchTerm,
  onSearchChange,
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1 relative">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search by job title or company..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent bg-white text-sm"
        />
      </div>
    </div>
  );
}