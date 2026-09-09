"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import SearchBar from "@/components/search/SearchBar";
import StoreDetailSheet from "@/components/stores/StoreDetailSheet";
import StoreList from "@/components/stores/StoreList";
import StoreFilters from "@/components/filters/StoreFilters";
import CapacityLegend from "@/components/map/CapacityLegend";
import { mockStores } from "@/data/mockStores";
import { filterStores, sortByCapacity } from "@/lib/capacity";
import type { Store } from "@/types/store";

const GroceryMap = dynamic(() => import("@/components/map/GroceryMap"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
      <div className="text-gray-500 text-sm">Loading map...</div>
    </div>
  ),
});

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("grocery stores");
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [leastBusy, setLeastBusy] = useState(false);
  const [showList, setShowList] = useState(false);

  const filteredStores = useMemo(() => {
    let results = filterStores(mockStores, searchQuery, false);
    if (leastBusy) {
      results = sortByCapacity(results);
    }
    return results;
  }, [searchQuery, leastBusy]);

  const handleSelectStore = (store: Store) => {
    setSelectedStore(store);
  };

  const handleCloseDetail = () => {
    setSelectedStore(null);
  };

  return (
    <div className="relative h-full w-full overflow-hidden bg-gray-100">
      <GroceryMap
        stores={filteredStores}
        selectedStore={selectedStore}
        onSelectStore={handleSelectStore}
      />

      <div className="absolute top-4 left-4 right-4 z-10 flex flex-col sm:flex-row items-start gap-3">
        <SearchBar onSearch={setSearchQuery} />
        <div className="flex gap-2">
          <button
            onClick={() => setShowList(!showList)}
            className="flex items-center gap-1.5 bg-white/95 backdrop-blur-sm rounded-lg shadow-md border border-gray-200 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap"
            aria-label={showList ? "Hide store list" : "Show store list"}
            aria-pressed={showList}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            {showList ? "Hide List" : "Store List"}
          </button>
        </div>
      </div>

      <div className="absolute top-20 left-4 z-10 flex flex-col gap-3">
        <CapacityLegend />
        <StoreFilters leastBusy={leastBusy} onToggleLeastBusy={setLeastBusy} />
      </div>

      {showList && (
        <div className="absolute top-20 right-4 z-10 w-80 max-w-[calc(100vw-2rem)]">
          <StoreList
            stores={filteredStores}
            selectedStore={selectedStore}
            onSelectStore={handleSelectStore}
          />
        </div>
      )}

      {selectedStore && (
        <StoreDetailSheet store={selectedStore} onClose={handleCloseDetail} />
      )}
    </div>
  );
}
