type StoreFiltersProps = {
  leastBusy: boolean;
  onToggleLeastBusy: (value: boolean) => void;
};

export default function StoreFilters({ leastBusy, onToggleLeastBusy }: StoreFiltersProps) {
  return (
    <div
      className="bg-white/95 backdrop-blur-sm rounded-lg shadow-md border border-gray-200 p-3"
      role="group"
      aria-label="Store filters"
    >
      <h3 className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
        Filters
      </h3>
      <label className="flex items-center gap-2 cursor-pointer group">
        <input
          type="checkbox"
          checked={leastBusy}
          onChange={(e) => onToggleLeastBusy(e.target.checked)}
          className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-offset-0 cursor-pointer"
          aria-label="Show least busy stores first"
        />
        <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
          Least busy first
        </span>
      </label>
    </div>
  );
}
