import { FiSearch, FiX } from 'react-icons/fi';

export default function ApplicationSearch({ value, onChange, onClear }) {
  return (
    <div className="flex-1 relative">
      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
      <input
        type="text"
        placeholder="Search by job title or company..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent bg-white text-sm"
      />
      {value && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
        >
          <FiX className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}