"use client";

import { useRef, useEffect, useCallback } from "react";
import { Map, Marker, NavigationControl } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { Store } from "@/types/store";
import { getCapacityLevel } from "@/lib/capacity";

type GroceryMapProps = {
  stores: Store[];
  selectedStore: Store | null;
  onSelectStore: (store: Store) => void;
};

const MAP_STYLE =
  process.env.NEXT_PUBLIC_MAP_STYLE_URL ||
  "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

export default function GroceryMap({
  stores,
  selectedStore,
  onSelectStore,
}: GroceryMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const markersRef = useRef<Marker[]>([]);
  const selectRef = useRef(onSelectStore);
  selectRef.current = onSelectStore;

  const createMarkerElement = useCallback(
    (store: Store, isSelected: boolean) => {
      const level = getCapacityLevel(store.capacityPercent);
      const colors: Record<string, { bg: string; border: string; text: string }> = {
        green: { bg: "#dcfce7", border: "#16a34a", text: "#166534" },
        yellow: { bg: "#fef9c3", border: "#ca8a04", text: "#854d0e" },
        orange: { bg: "#ffedd5", border: "#ea580c", text: "#9a3412" },
        red: { bg: "#fee2e2", border: "#dc2626", text: "#991b1b" },
      };
      const c = colors[level];
      const scale = isSelected ? 1.2 : 1;
      const shadow = isSelected
        ? "0 0 0 3px rgba(59,130,246,0.5), 0 4px 12px rgba(0,0,0,0.3)"
        : "0 2px 6px rgba(0,0,0,0.25)";

      const el = document.createElement("div");
      el.style.cssText = `
        cursor: pointer;
        transform: scale(${scale});
        transition: transform 0.15s ease;
      `;
      el.innerHTML = `
        <div style="
          background: ${c.bg};
          border: 2.5px solid ${c.border};
          border-radius: 50%;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: ${shadow};
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          font-weight: 700;
          font-size: 13px;
          color: ${c.text};
          user-select: none;
          position: relative;
        ">
          ${store.capacityPercent}%
          <div style="
            position: absolute;
            top: -1px;
            right: -1px;
            width: 10px;
            height: 10px;
            background: ${c.border};
            border-radius: 50%;
            border: 1.5px solid white;
          "></div>
        </div>
      `;

      el.addEventListener("mouseenter", () => {
        el.style.transform = "scale(1.15)";
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = `scale(${scale})`;
      });

      return el;
    },
    []
  );

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    const map = new Map({
      container: mapContainer.current,
      style: MAP_STYLE,
      center: [-73.9855, 40.7580],
      zoom: 14,
    });

    map.addControl(new NavigationControl(), "bottom-right");

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    stores.forEach((store) => {
      const isSelected = selectedStore?.id === store.id;
      const el = createMarkerElement(store, isSelected);
      const marker = new Marker({ element: el })
        .setLngLat([store.longitude, store.latitude])
        .addTo(map);

      el.addEventListener("click", () => {
        selectRef.current(store);
        map.flyTo({
          center: [store.longitude, store.latitude],
          zoom: 16,
          essential: true,
        });
      });

      markersRef.current.push(marker);
    });
  }, [stores, selectedStore, createMarkerElement]);

  return (
    <div className="absolute inset-0" role="application" aria-label="Grocery store map">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
}
