import type { Store } from "@/types/store";
import CapacityBadge from "./CapacityBadge";

type StoreListProps = {
  stores: Store[];
  selectedStore: Store | null;
  onSelectStore: (store: Store) => void;
};

export default function StoreList({ stores, selectedStore, onSelectStore }: StoreListProps) {
  return (
    <div
      className="bg-white/95 backdrop-blur-sm rounded-lg shadow-md border border-gray-200 overflow-hidden"
      role="list"
      aria-label="Nearby grocery stores"
    >
      <div className="px-3 py-2 border-b border-gray-100">
        <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
          Nearby Stores ({stores.length})
        </h3>
      </div>
      <div className="max-h-64 overflow-y-auto divide-y divide-gray-50">
        {stores.map((store) => (
          <button
            key={store.id}
            onClick={() => onSelectStore(store)}
            className={`w-full text-left px-3 py-2.5 hover:bg-gray-50 transition-colors flex items-center justify-between gap-2 ${
              selectedStore?.id === store.id ? "bg-blue-50" : ""
            }`}
            role="listitem"
            aria-label={`${store.name}, capacity ${store.capacityPercent}%`}
          >
            <div className="min-w-0">
              <div className="text-sm font-medium text-gray-800 truncate">
                {store.name}
              </div>
              <div className="text-xs text-gray-500 truncate">{store.address}</div>
            </div>
            <CapacityBadge percent={store.capacityPercent} />
          </button>
        ))}
        {stores.length === 0 && (
          <div className="px-3 py-6 text-center text-sm text-gray-500">
            No stores found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
