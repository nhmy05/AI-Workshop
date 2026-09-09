import type { CapacityLevel, CrowdStatus, Store } from "@/types/store";

export function getCapacityLevel(percent: number): CapacityLevel {
  if (percent <= 35) return "green";
  if (percent <= 60) return "yellow";
  if (percent <= 80) return "orange";
  return "red";
}

export function getCrowdStatus(percent: number): CrowdStatus {
  if (percent <= 35) return "Low crowd";
  if (percent <= 60) return "Moderate";
  if (percent <= 80) return "Busy";
  return "Very busy";
}

export function getCapacityColor(level: CapacityLevel): string {
  const colors: Record<CapacityLevel, string> = {
    green: "#22c55e",
    yellow: "#eab308",
    orange: "#f97316",
    red: "#ef4444",
  };
  return colors[level];
}

export function getMarkerBgColor(level: CapacityLevel): string {
  const colors: Record<CapacityLevel, string> = {
    green: "#dcfce7",
    yellow: "#fef9c3",
    orange: "#ffedd5",
    red: "#fee2e2",
  };
  return colors[level];
}

export function getMarkerBorderColor(level: CapacityLevel): string {
  const colors: Record<CapacityLevel, string> = {
    green: "#16a34a",
    yellow: "#ca8a04",
    orange: "#ea580c",
    red: "#dc2626",
  };
  return colors[level];
}

export function getMarkerTextColor(level: CapacityLevel): string {
  const colors: Record<CapacityLevel, string> = {
    green: "#166534",
    yellow: "#854d0e",
    orange: "#9a3412",
    red: "#991b1b",
  };
  return colors[level];
}

export function sortByCapacity(stores: Store[]): Store[] {
  return [...stores].sort((a, b) => a.capacityPercent - b.capacityPercent);
}

export function filterStores(
  stores: Store[],
  query: string,
  leastBusy: boolean
): Store[] {
  let result = stores;

  if (query.trim()) {
    const q = query.toLowerCase();
    result = result.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.address.toLowerCase().includes(q) ||
        "grocery".includes(q)
    );
  }

  if (leastBusy) {
    result = sortByCapacity(result);
  }

  return result;
}
