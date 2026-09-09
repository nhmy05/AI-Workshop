import { getCrowdStatus } from "@/lib/capacity";
import type { Store } from "@/types/store";
import CapacityBadge from "./CapacityBadge";

type StoreDetailSheetProps = {
  store: Store;
  onClose: () => void;
};

export default function StoreDetailSheet({ store, onClose }: StoreDetailSheetProps) {
  const crowdStatus = getCrowdStatus(store.capacityPercent);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 md:left-auto md:right-0 md:top-0 md:bottom-0 md:w-96 bg-white shadow-2xl z-50 flex flex-col animate-slide-up md:animate-slide-in"
      role="dialog"
      aria-label={`Store details: ${store.name}`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 truncate pr-2">{store.name}</h2>
        <button
          onClick={onClose}
          className="flex-shrink-0 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close store details"
        >
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="flex items-center gap-3">
          <CapacityBadge percent={store.capacityPercent} size="md" />
          <span className="text-sm font-medium text-gray-600">{crowdStatus}</span>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-sm text-gray-500 mb-1">Estimated Occupancy</div>
          <div className="text-2xl font-bold text-gray-900">
            {store.currentOccupancy} / {store.maxCapacity}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: `${store.capacityPercent}%`,
                backgroundColor:
                  store.capacityPercent <= 35
                    ? "#22c55e"
                    : store.capacityPercent <= 60
                    ? "#eab308"
                    : store.capacityPercent <= 80
                    ? "#f97316"
                    : "#ef4444",
              }}
              role="progressbar"
              aria-valuenow={store.capacityPercent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Capacity ${store.capacityPercent}%`}
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <svg className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm text-gray-600">{store.address}</span>
          </div>

          <div className="flex items-start gap-2">
            <svg className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm text-gray-600">Updated just now</span>
          </div>

          {store.typicalBusyPeriod && (
            <div className="flex items-start gap-2">
              <svg className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span className="text-sm text-gray-600">{store.typicalBusyPeriod}</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 border-t border-gray-100">
        <button
          onClick={() => {
            alert("Directions feature coming soon! This is a prototype.");
          }}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label={`Get directions to ${store.name}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          Get Directions
        </button>
      </div>
    </div>
  );
}
